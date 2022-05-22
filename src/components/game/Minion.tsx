import { Component} from 'solid-js';
import IMinion from '../../types/minion';
import minions from '../../data/minions'
interface IMinionProps {
  data:IMinion|null
}

const Minion: Component<IMinionProps> = (props) => {

  return (
    <div>
      <h2>{minions[props.data?.Enum] || "None"}</h2>
    </div>
  )
}

export default Minion;