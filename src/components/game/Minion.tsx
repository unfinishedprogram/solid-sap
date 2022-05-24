import { Component} from 'solid-js';
import IMinion from '../../types/minion';
import minions from '../../data/minions'
import style from "../../style/Match.module.css";
import { BuildState } from './BuildMenu';

interface IMinionProps {
  data:IMinion|null
  buildState:BuildState
}

const Minion: Component<IMinionProps> = (props) => {
  const petName = minions[props.data?.Enum] || "None";
  const imgSrc = `images/${petName[0].toUpperCase() + petName.substring(1)}.png`

  if(props.data) {
    return (
      <span class={style.minion}>
        <img alt={petName} src={imgSrc}/>
        <div class={style.stats}>
          <span>
            {props.data.Attack.Permanent + props.data.Attack.Temporary}
          </span>
          <span>
            {props.data.Health.Permanent + props.data.Health.Temporary}
          </span>
        </div>
      </span>
    )
  } else {
    return <>Empty</>
  }

  
}

export default Minion;