import IMatchState from "./matchState";
import { Signal, Accessor, Setter} from "solid-js";
import RequestHandler from "../requester";
import IMoveData, { IBoardFreezes, IBoardOrders } from "../types/moveData";
import BuildStart from "../endpoints/match/buildStart";
import PlayMinion from "../endpoints/match/playMinion";
import IItemId from "../types/itemId";
import CurrentUser from "../endpoints/currentUser";
import BuildRoll from "../endpoints/match/buildRoll";
import ChoseName from "../endpoints/match/choseName";
import ISpell from "../types/spell";
import IMinion from "../types/minion";

export default class MatchManager {

  private getState:Accessor<IMatchState>;
  private setState:Setter<IMatchState>;
  
  private boardHash = 0;
  private started = false;

  private get boardFreezes():IBoardFreezes {
    const spells = this.getState().Build.Board.SpellShop;
    const minions = this.getState().Build.Board.MinionShop;

    const convert = (item:ISpell | IMinion) => {
      return  {ItemId:item.Id, Freeze:item.Frozen}
    } 

    return [...spells.map(convert), ...minions.map(convert)];
  }

  private get boardOrders():IBoardOrders {
    const minions = this.getState().Build.Board.Minions.Items.filter((item) => item);

    const convert = (item:IMinion) => {
      return {
        MinionId:item.Id,
        Point:item.Point
      }
    }
    
    return minions.map(convert);
  }

  private get moveData():IMoveData {
    return {
      BoardFreezes:this.boardFreezes,
      BoardHash:this.boardHash,
      BoardOrders:this.boardOrders,
      BuildId:this.getState().Build.Id,
    }
  }

  private async update() {
    const res = await this.handler.executeRequest(CurrentUser, {});
    if(res.ArenaMatch){
      this.setState(res.ArenaMatch)
    }
  }

  constructor(private handler:RequestHandler, private state:Signal<IMatchState>) {
    [this.getState, this.setState] = state;
  }

  public async startBuild() {
    if(this.started) {
      return;
    }
    this.started = true;
    const res = await this.handler.executeRequest(BuildStart, {Data:this.moveData})
    this.boardHash = res.Data.Hash;
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

  public async rollShop() {
    const res = await this.handler.executeRequest(BuildRoll, {Data:this.moveData})
    this.boardHash = res.Data.Hash;
    this.update()
  }

  public async choseName(adjective:string, noun:string) {
    await this.handler.executeRequest(ChoseName, {
      Data:this.moveData,
      Adjective:adjective,
      Noun:noun
    })
  }

  public movePet(p1:number, p2:number) {
    console.log(p1, p2)
    const items = this.getState().Build.Board.Minions.Items;
    [items[p1], items[p2]] = [items[p2], items[p1]] 

    items.forEach((item, index) =>{
      if(item) item.Point.x = index;
    })
    
    this.setState(this.getState())
  }
}
