import { Accessor, createSignal } from "solid-js";
import IAccountInfo from "./types/accountInfo";


export default function createGameState() {
  const [accountInfo, setAccountInfo] = createSignal<IAccountInfo>();
  const [sessionToken, setSessionToken] = createSignal<string>();

  return {
    accountInfo, setAccountInfo,
    sessionToken, setSessionToken
  }
}


export type GameState = ReturnType<typeof createGameState>;