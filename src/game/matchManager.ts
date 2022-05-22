import IMatchState from "./matchState";
import { Signal, Accessor, Setter, createEffect } from "solid-js";
import RequestHandler from "../requester";

export default class MatchManager {

  private getState:Accessor<IMatchState>;
  private setState:Setter<IMatchState>;

  constructor(private handler:RequestHandler, private state:Signal<IMatchState>) {
    [this.getState, this.setState] = state;
  }
}
