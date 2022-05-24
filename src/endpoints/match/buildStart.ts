import IBoardHashData from "../../types/boardHashData";
import IMoveData from "../../types/moveData";
import { createEndpoint } from "../endpoints"

interface IBuildStartParams {
  Data:IMoveData
}

interface IBuildStartReturn {
  Data:IBoardHashData
};

const BuildStart = createEndpoint<IBuildStartParams,  IBuildStartReturn>("api/build/start", params => params, "POST");

export default BuildStart
