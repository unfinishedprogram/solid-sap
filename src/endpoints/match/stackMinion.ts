import IBoardHashData from "../../types/boardHashData";
import IItemId from "../../types/itemId";
import IMoveData from "../../types/moveData";
import { createEndpoint } from "../endpoints"

interface IStackMinionParams {
  Data:IMoveData,
  SourceMinionId: IItemId,
  TargetMinionId: IItemId,
}

interface IStackMinionReturns {
  Data:IBoardHashData
};

const StackMinion = createEndpoint<IStackMinionParams,  IStackMinionReturns>("api/build/Stack-minion", params => params, "POST");

export default StackMinion
