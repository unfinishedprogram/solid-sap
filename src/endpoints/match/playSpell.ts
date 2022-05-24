import IItemId from "../../types/itemId";
import { createEndpoint } from "../endpoints"
import IActionResponse from "../../types/actionResponse";
import IMoveData from "../../types/moveData";

interface IPlaySpellParams {
  SpellId: IItemId;
  Point:{x:number, y:number};
  Data:IMoveData;
}

const PlaySpell = createEndpoint<IPlaySpellParams, IActionResponse >("api/build/play-spell", params => params, "POST");

export default PlaySpell
