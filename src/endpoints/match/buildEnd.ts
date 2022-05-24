import IBoardHashData from "../../types/boardHashData";
import IMoveData from "../../types/moveData";
import { createEndpoint } from "../endpoints"

interface IBuildEndParams {
  Data:IMoveData
}

interface IBuildEndReturns {
  Data:IBoardHashData,
	NewBoardState:number,
};

const BuildEnd = createEndpoint<IBuildEndParams,  IBuildEndReturns>("api/build/end", params => params, "POST");

export default BuildEnd
