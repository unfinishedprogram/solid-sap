import { Component } from "solid-js";
import { MenuProps } from "../App";
import BuildMenu from "../components/game/BuildMenu";
import MatchManager from "../game/matchManager";

const GameMenu:Component<MenuProps> = (props) => {
  if(!props.state.matchState()) return <>No ongoing match</>

  const matchManager = new MatchManager(props.state.requestHandler, props.state.matchState())

  return (
    <div>
      <BuildMenu match={props.state.matchState()} manager={matchManager}/>
    </div>
  )
}

export default GameMenu;