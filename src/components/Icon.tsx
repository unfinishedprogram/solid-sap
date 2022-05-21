import { Component, JSXElement } from "solid-js";
import ICONS from "./icons/module"
import styles from "../style/Icon.module.css"

interface IIconProps {
  icon: "warning" | "error" | "info"
  width?: string;
  height?: string;
}

const Icon:Component<IIconProps> = (props) => {
  return (
    <div class={styles.icon}>
      {ICONS[props.icon]}
    </div>
  )
}

export default Icon;