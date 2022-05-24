import IBoardHashData from "../../types/boardHashData";
import IMoveData from "../../types/moveData";
import { createEndpoint } from "../endpoints"

interface IRollPerams {
  Data:IMoveData
}

interface IRollReturns {
  Data:IBoardHashData
};

const BuildRoll = createEndpoint<IRollPerams,  IRollReturns>("api/build/roll", params => params, "POST");

export default BuildRoll
