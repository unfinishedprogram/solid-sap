import { IMatch } from "../game/matchState";
import { createEndpoint } from "./endpoints"

export type QueueParams = {
  SamePack: boolean
}

const QueueArena = createEndpoint<QueueParams, IMatch>("api/arena/queue", params => params, "POST");

export default QueueArena
