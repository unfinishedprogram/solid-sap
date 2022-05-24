import { IMatch } from "../game/matchState"

export default interface IAccountInfo {
  Token: string
  Abandon: 0
  ArenaMatch: null | IMatch
  Background: 0
  Cosmetic: 0
  DeckId: null
  DisplayName: string
  EmailConfirmed: boolean
  Guest: boolean
  Id: string
  IsPublicTesting: null
  MatchesStarted: 0
  Pack: 0
  Points: 0
  Products: []
  VersusLimit: boolean
  VersusMatches: []
}