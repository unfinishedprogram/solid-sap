import { Component, Show} from 'solid-js';
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
    return (<>
        <Show when={props.data.Frozen}>
          <img class={style.ice} src="images/ice.png"></img>
        </Show>
        <span class={style.minion}>
        <img class={style.minion_pic} alt={petName} src={imgSrc}/>
        <div class={style.stats}>
          <span>
            {props.data.Attack.Permanent + props.data.Attack.Temporary}
          </span>
          <span>
            {props.data.Health.Permanent + props.data.Health.Temporary}
          </span>
        </div>
      </span>
    </>
      

    )
  } else {
    return <>Empty</>
  }

  
}

export default Minion;