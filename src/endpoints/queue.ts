import IBuild from "../types/build"
import { createEndpoint } from "./endpoints"

export type QueueParams = {
  SamePack: boolean
}

export type QueueResults = {
  MatchId: string
  ParticipationId: string
  Build: IBuild
  BattleId: null
  BattleWatchedOn: null
  MatchState: number
  Ready: false
  Players: number
  PlayersMax: number
  Private: boolean
  Version: number
  Kicked: null
  CreatorUserId: null
  Mode: number
  Arena: unknown
  Versus: null
} 

const Queue = createEndpoint<QueueParams, QueueResults>("api/arena/queue", params => params);

export default Queue
