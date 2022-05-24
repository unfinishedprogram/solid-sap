import { Component, createMemo} from 'solid-js';
import IMinion from '../../types/minion';
import style from "../../style/Match.module.css";
import { BuildState } from './BuildMenu';
import Minion from './Minion';

interface ITeamMinionProps {
  data:IMinion|null
  buildState:BuildState
  index:number
}

const TeamMinion: Component<ITeamMinionProps> = (props) => {

  const classes = createMemo(() => {
    return `${style.item} ${props.buildState.selectedTeamMinion() == props.index ? style.selected : ""}`
  })
  
  const click = () => {
    props.buildState.setSelectedTeamMinion((prev) => {
      if(prev == props.index){
        return null;
      } else {
        return props.index
      }
    })
  }

  return (
    <div class={classes()} onclick={click}>
      <Minion data={props.data} buildState={props.buildState} />
    </div>
  )
}

export default TeamMinion;