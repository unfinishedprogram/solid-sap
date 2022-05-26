import RequestHandler from "../requester";
import IMoveData, { IBoardFreezes, IBoardOrders } from "../types/moveData";
import BuildStart from "../endpoints/match/buildStart";
import PlayMinion from "../endpoints/match/playMinion";
import IItemId from "../types/itemId";
import BuildRoll from "../endpoints/match/buildRoll";
import ChoseName from "../endpoints/match/choseName";
import ISpell from "../types/spell";
import IMinion from "../types/minion";
import { IMatch, MatchStore, ReactiveMatch } from "./matchState";
import CurrentUser from "../endpoints/currentUser";
import PlaySpell from "../endpoints/match/playSpell";
import BuildEnd from "../endpoints/match/buildEnd";
import ArenaReady from "../endpoints/match/arenaReady";
import ArenaWatch from "../endpoints/match/arenaWatch";
import StackMinion from "../endpoints/match/stackMinion";
import { DeepReadonly, Store } from "solid-js/store";

export default class MatchManager {
  private boardHash = 0;
  private match:MatchStore["match"];
  private setMatch:MatchStore["setMatch"];

  constructor(private handler:RequestHandler, match:MatchStore) {
    [this.match, this.setMatch] = [match.match, match.setMatch];
  }

  private get boardFreezes():IBoardFreezes {
    const spells = this.match.Build.Board.SpellShop;
    const minions = this.match.Build.Board.MinionShop;

    const convert = (item:{Id:IItemId, Frozen:boolean}) => {
      return {ItemId:item.Id, Freeze:item.Frozen}
    } 

    return [...spells.map(convert), ...minions.map(convert)];
  }

  private get boardOrders():IBoardOrders {
    const minions = this.match.Build.Board.Minions.Items.filter((item) => item);

    const convert = (item:IMinion) => {
      return {
        MinionId:item.Id,
        Point:item.Point
      }
    }
    
    return minions.map(convert);
  }

  public toggleFrozen(item:(IMinion | ISpell)) {

    let shopSpells = [...this.match.Build.Board.SpellShop];
    let shopMinions = [...this.match.Build.Board.MinionShop];

    let copy: (IMinion | ISpell) = {} as (IMinion | ISpell);

    Object.assign(copy, item);
    
    if(item) {
      copy.Frozen = !copy.Frozen;
    }


    if(shopMinions.includes(item as IMinion)){
      shopMinions[shopMinions.indexOf(item as IMinion)] = copy as IMinion; 
      this.setMatch("Build", "Board", "MinionShop", shopMinions);

    } else if (shopSpells.includes(item as ISpell)) {
      shopSpells[shopSpells.indexOf(item as ISpell)] = copy as ISpell; 
      this.setMatch("Build", "Board", "SpellShop", shopSpells);
    }
  }
  
  public async stackMinions(source:DeepReadonly<IMinion>, target:DeepReadonly<IMinion>) {
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
      BuildId:this.match.Build.Id,
    }
  }

  private async update() {
    const res = await this.handler.executeRequest(CurrentUser, {});
    if(res.ArenaMatch) this.updateMatch(res.ArenaMatch);
  }

  public updateMatch(newMatch:IMatch) {
    const board = this.match.Build.Board;
    const newBoard = newMatch.Build.Board;

    this.setMatch("Build", newMatch.Build);
    
    // board.setGold(newBoard.Gold);
    // board.setHash(newBoard.Hash);
    // board.setLosses(newBoard.Losses);
    // board.setLossPoints(newBoard.LossPoints);
    // board.setMinionShop(newBoard.MinionShop);
    // board.setMinionShopAttackBonus(newBoard.MinionShopAttackBonus);
    // board.setMinionShopHealthBonus(newBoard.MinionShopHealthBonus);
    // board.setMinionShopCapacity(newBoard.MinionShopCapacity);
    // board.setMinions(newBoard.Minions.Items);
    // board.setSpellShop(newBoard.SpellShop);
    // board.setTier(newBoard.Tier);
    // board.setTurn(newBoard.Turn);
    // board.setVictories(newBoard.Victories);
  }

  public async startBuild() {
    const res = await this.handler.executeRequest(BuildStart, {Data:this.moveData})
    this.boardHash = res.Data.Hash;
  }

  public async endTurn() {
    const res = await this.handler.executeRequest(BuildEnd, {Data:this.moveData});

    this.boardHash = res.Data.Hash;

    if(this.match.Build.Board.Turn < 1){
      await this.handler.executeRequest(ChoseName, {
        Data:this.moveData,
        Adjective:this.match.Build.AvailableAdjectives[0],
        Noun:this.match.Build.AvailableNouns[0],
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
    let pet1 = this.match.Build.Board.Minions.Items[p1];
    let pet2 = this.match.Build.Board.Minions.Items[p2];

    this.setMatch("Build", "Board", "Minions", "Items", p1, pet2);
    if(this.match.Build.Board.Minions.Items[p1]){
      this.setMatch("Build", "Board", "Minions", "Items", p1, "Point", {x:p1, y:0});
    }

    this.setMatch("Build", "Board", "Minions", "Items", p2, pet1);
    if(this.match.Build.Board.Minions.Items[p2]){
      this.setMatch("Build", "Board", "Minions", "Items", p2, "Point", {x:p2, y:0});
    }
  }
}
