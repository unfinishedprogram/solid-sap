import IItemId from "../../types/itemId";
import { createEndpoint } from "../endpoints"
import IActionResponse from "../../types/actionResponse";
import IMoveData from "../../types/moveData";

interface IPlayMinionParams {
  MinionId: IItemId;
  Point:{x:number, y:number};
  Data:IMoveData;
}

const PlayMinion = createEndpoint<IPlayMinionParams, IActionResponse >("api/build/play-minion", params => params, "POST");

export default PlayMinion
