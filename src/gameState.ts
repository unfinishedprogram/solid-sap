import { Accessor, createSignal } from "solid-js";
import IAccountInfo from "./types/accountInfo";


export default function createGameState() {
  const [accountInfo, setAccountInfo] = createSignal<IAccountInfo>();

  return {
    accountInfo, setAccountInfo
  }
}


export type GameState = ReturnType<typeof createGameState>;