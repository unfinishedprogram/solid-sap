import IBoardHashData from "../../types/boardHashData";
import IMoveData from "../../types/moveData";
import { createEndpoint } from "../endpoints"

interface IArenaReadyParams {
  ParticipationId:string,
}

interface IArenaReadyReturns {
  Data:IBoardHashData,
	NewBoardState:number,
  BattleId:string,
};

const ArenaReady = createEndpoint<IArenaReadyParams,  IArenaReadyReturns>("api/arena/ready", params => params, "POST");

export default ArenaReady
