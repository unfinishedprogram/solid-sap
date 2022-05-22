import { Component } from "solid-js";
import { MenuProps } from "../App";
import BuildMenu from "../components/game/BuildMenu";


const GameMenu:Component<MenuProps> = (props) => {
  if(!props.state.matchState()) return <>No ongoing match</>
  
  return (
    <div>
      <BuildMenu state={[props.state.matchState, props.state.setMatchState]} manager={props.state.matchManager}/>
    </div>

  )
}

export default GameMenu;