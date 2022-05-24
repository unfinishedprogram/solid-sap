import { Component, createMemo} from 'solid-js';
import IMinion from '../../types/minion';
import style from "../../style/Match.module.css";
import { BuildState } from './BuildMenu';
import Minion from './Minion';

interface ITeamMinionProps {
  data:IMinion|null
  buildState:BuildState
  index:number
  select:(index:number) => void
}

const TeamMinion: Component<ITeamMinionProps> = (props) => {

  const classes = createMemo(() => {
    return `${style.item} ${props.buildState.selectedTeamMinion() == props.index ? style.selected : ""}`
  })

  return (
    <div class={classes()} onclick={() => props.select(props.index)}>
      <Minion data={props.data} buildState={props.buildState} />
    </div>
  )
}

export default TeamMinion;