import IBuild from "../types/build"

export default interface IMatchState {
    "MatchId": string,
    "ParticipationId": string,
    "Build": IBuild;
    "BattleId": null | string,
    "BattleWatchedOn": unknown,
    "MatchState": number,
    "Ready": boolean,
    "Players": number,
    "PlayersMax": number,
    "Private": boolean,
    "Version": number,
    "Kicked": null,
    "CreatorUserId": null,
    "Mode": number,
    "Arena": {},
    "Versus": null
}

