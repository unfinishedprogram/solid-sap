import RequestHandler from "../requester";
import IMoveData, { IBoardFreezes, IBoardOrders } from "../types/moveData";
import BuildStart from "../endpoints/match/buildStart";
import PlayMinion from "../endpoints/match/playMinion";
import IItemId from "../types/itemId";
import BuildRoll from "../endpoints/match/buildRoll";
import ChoseName from "../endpoints/match/choseName";
import ISpell from "../types/spell";
import IMinion from "../types/minion";
import { IMatch, ReactiveMatch } from "./matchState";
import CurrentUser from "../endpoints/currentUser";
import PlaySpell from "../endpoints/match/playSpell";
import BuildEnd from "../endpoints/match/buildEnd";
import ArenaReady from "../endpoints/match/arenaReady";
import ArenaWatch from "../endpoints/match/arenaWatch";
import StackMinion from "../endpoints/match/stackMinion";

export default class MatchManager {
  private boardHash = 0;

  constructor(private handler:RequestHandler, private match:ReactiveMatch){}

  private get boardFreezes():IBoardFreezes {
    const spells = this.match.Build.Board.SpellShop();
    const minions = this.match.Build.Board.MinionShop();

    const convert = (item:ISpell | IMinion) => {
      return  {ItemId:item.Id, Freeze:item.Frozen}
    } 

    return [...spells.map(convert), ...minions.map(convert)];
  }

  private get boardOrders():IBoardOrders {
    const minions = this.match.Build.Board.Minions().filter((item) => item);

    const convert = (item:IMinion) => {
      return {
        MinionId:item.Id,
        Point:item.Point
      }
    }
    
    return minions.map(convert);
  }

  public toggleFrozen(item:(IMinion | ISpell)) {

    let shopSpells = [...this.match.Build.Board.SpellShop()];
    let shopMinions = [...this.match.Build.Board.MinionShop()];

    let copy: (IMinion | ISpell) = {} as (IMinion | ISpell);

    Object.assign(copy, item);
    
    if(item) {
      copy.Frozen = !copy.Frozen;
    }


    if(shopMinions.includes(item as IMinion)){
      shopMinions[shopMinions.indexOf(item as IMinion)] = copy as IMinion; 
      this.match.Build.Board.setMinionShop(shopMinions)

    } else if (shopSpells.includes(item as ISpell)) {
      shopSpells[shopSpells.indexOf(item as ISpell)] = copy as ISpell; 
      this.match.Build.Board.setSpellShop(shopSpells)
    }
  }
  
  public async stackMinions(source:IMinion, target:IMinion) {
    const res = await this.handler.executeRequest(StackMinion, {
      Data:this.moveData,
      SourceMinionId:source.Id, 
      TargetMinionId:target.Id
    })
    this.boardHash = res.Data.Hash;
    this.update();
  }

  private get moveData():IMoveData {
    return {
      BoardFreezes:this.boardFreezes,
      BoardHash:this.boardHash,
      BoardOrders:this.boardOrders,
      BuildId:this.match.Build.Id(),
    }
  }

  private async update() {
    const res = await this.handler.executeRequest(CurrentUser, {});
    if(res.ArenaMatch) this.updateMatch(res.ArenaMatch);
  }

  public updateMatch(newMatch:IMatch) {
    const board = this.match.Build.Board;
    const newBoard = newMatch.Build.Board;
    
    board.setGold(newBoard.Gold);
    board.setHash(newBoard.Hash);
    board.setLosses(newBoard.Losses);
    board.setLossPoints(newBoard.LossPoints);
    board.setMinionShop(newBoard.MinionShop);
    board.setMinionShopAttackBonus(newBoard.MinionShopAttackBonus);
    board.setMinionShopHealthBonus(newBoard.MinionShopHealthBonus);
    board.setMinionShopCapacity(newBoard.MinionShopCapacity);
    board.setMinions(newBoard.Minions.Items);
    board.setSpellShop(newBoard.SpellShop);
    board.setTier(newBoard.Tier);
    board.setTurn(newBoard.Turn);
    board.setVictories(newBoard.Victories);
  }

  public async startBuild() {
    const res = await this.handler.executeRequest(BuildStart, {Data:this.moveData})
    this.boardHash = res.Data.Hash;
  }

  public async endTurn() {
    const res = await this.handler.executeRequest(BuildEnd, {Data:this.moveData});

    this.boardHash = res.Data.Hash;

    if(this.match.Build.Board.Turn() < 1){
      await this.handler.executeRequest(ChoseName, {
        Data:this.moveData,
        Adjective:this.match.Build.AvailableAdjectives()[0],
        Noun:this.match.Build.AvailableNouns()[0],
      });
    }

    await this.handler.executeRequest(ArenaReady, {ParticipationId:this.match.ParticipationId})
    await this.handler.executeRequest(ArenaWatch, {ParticipationId:this.match.ParticipationId})

    await this.startBuild();
    
    this.update();
  }

  public async playMinion(id:IItemId, position:number) {
    const res = await this.handler.executeRequest(PlayMinion, {
      Data:this.moveData,
      MinionId:id,
      Point: {
        x:position, y:0
      }
    })
    
    this.boardHash = res.Data.Hash;
    this.update()
  }

  public async playSpell(id:IItemId, position:number) {
    const [x, y] = [position, 0];
    const res = await this.handler.executeRequest(PlaySpell, {
      Data:this.moveData,
      SpellId: id,
      Point: { x, y }
    })

    this.boardHash = res.Data.Hash;
    this.update()
  }

  public async rollShop() {
    const res = await this.handler.executeRequest(BuildRoll, {Data:this.moveData})
    this.boardHash = res.Data.Hash;
    await this.update()
  }

  public async choseName(adjective:string, noun:string) {
    await this.handler.executeRequest(ChoseName, {
      Data:this.moveData,
      Adjective:adjective,
      Noun:noun
    })
  }

  public movePet(p1:number, p2:number) {
    const items = [ ...this.match.Build.Board.Minions() ];
    [items[p1], items[p2]] = [items[p2], items[p1]];

    items.forEach((item, index) => {
      if(item) item.Point.x = index;
    })

    this.match.Build.Board.setMinions(items);
  }
}
