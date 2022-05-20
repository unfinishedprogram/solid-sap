import { Component, createEffect, createSignal } from "solid-js"

import RequestHandler from "./requester"
import RegisterGuest from "./endpoints/registerGuest";
import IAccountInfo from "./types/accountInfo";
import { GameState } from "./gameState";

const GameWindow:Component<{state:GameState}> = () => {
  const [accountInfo, setAccountInfo] = createSignal<IAccountInfo>();

  const handler = new RequestHandler(18);

  return <div>
    <button onclick={() => handler.executeRequest(RegisterGuest, {}).then(data => setAccountInfo(data))}>Make Request</button>
    {accountInfo()?.Email}
  </div>
}

export default GameWindow