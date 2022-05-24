import IBoardHashData from "../../types/boardHashData";
import { IMoveData } from "../../types/moveData";
import { createEndpoint } from "../endpoints"

interface IChoseNameParams {
  Data:IMoveData,
  Adjective:string,
  Noun:string,
}

interface IChoseNameReturns {};

const ChoseName = createEndpoint<IChoseNameParams,  {}>("api/build/name", params => params, "POST");

export default ChoseName
