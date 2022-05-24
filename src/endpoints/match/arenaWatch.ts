import IBoardHashData from "../../types/boardHashData";
import { createEndpoint } from "../endpoints"

interface IArenaWatchParams {
  ParticipationId:string,
}


interface IArenaWatchReturns {
  Data:IBoardHashData,
	NewBoardState:number,
  BattleId:string,
};

const ArenaWatch = createEndpoint<IArenaWatchParams,  IArenaWatchReturns>("api/arena/watch", params => params, "POST");

export default ArenaWatch
