import { createSignal } from "solid-js";
import AuthManager, { IAuthState } from "./authManager";
import MatchManager from "./game/matchManager";
import { MatchStore } from "./game/matchState";
import RequestHandler from "./requester";


function createState() {
  const requestHandler = new RequestHandler();

  const [authState, setAuthState] = createSignal<IAuthState>()
  const [matchState, setMatchState] = createSignal<MatchStore>();

  requestHandler.syncVersion();

  const authManager = new AuthManager(requestHandler, [authState, setAuthState]);
  
  const state = {
    requestHandler, 
    authManager, authState,
    matchState, setMatchState,
  }

  return state;
}

export type GameState = ReturnType<typeof createState>;

const state = createState();
export default state;
