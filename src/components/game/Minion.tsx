import { Component, Show} from 'solid-js';
import IMinion from '../../types/minion';
import minions from '../../data/minions'
import style from "../../style/Match.module.scss";
import { BuildState } from './BuildMenu';

interface IMinionProps {
  data:IMinion|null
  buildState:BuildState
}

const Minion: Component<IMinionProps> = (props) => {
  const petName = minions[props.data?.Enum] || "None";
  const imgSrc = `images/${petName[0].toUpperCase() + petName.substring(1)}.png`

  if(props.data) {
    return <>


      <span class={`${style.item} ${style.minion}`}>
        <div class={style.level}>
          LVL:{props.data.Level}
          EXP:{props.data.Exp}
        </div>
        
        <img class={style.pic} alt={petName} src={imgSrc}/>
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
  } else {
    return <>Empty</>
  }
}

export default Minion;