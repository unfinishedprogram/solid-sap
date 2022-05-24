import IBuild from "../types/build"
import createReactiveBuild, { ReactiveBuild } from "./buildState";

export interface IMatch {
    "MatchId": string,
    "ParticipationId": string,
    "Build": IBuild,
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

export interface ReactiveMatch {
    "MatchId": string,
    "ParticipationId": string,
    "Build": ReactiveBuild;
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

export function createReactiveMatch(baseState:IMatch) {
    const baseBuild = baseState.Build;
    const state = (baseState as unknown as  ReactiveMatch);
    state.Build = createReactiveBuild(baseBuild);
    return state;
}

