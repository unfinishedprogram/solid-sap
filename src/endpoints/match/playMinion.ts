import IItemId from "../../types/itemId";
import { IMoveData } from "../../types/moveData";
import { createEndpoint } from "../endpoints"
import IActionResponse from "../../types/actionResponse";

interface IPlayMinionParams {
  MinionId: IItemId;
  Point:{x:number, y:number};
  Data:IMoveData;
}

const PlayMinion = createEndpoint<IPlayMinionParams, IActionResponse >("api/build/play-minion", params => params, "POST");

export default PlayMinion
