import { Component, JSXElement } from "solid-js";
import ICONS from "./icons/module"
import styles from "../style/Icon.module.css"


interface IIconProps {
  icon: keyof typeof ICONS;
  width?: string;
  height?: string;
}

const Icon:Component<IIconProps> = (props) => {
  let IconElm = ICONS[props.icon];
  return <IconElm/>
}

export default Icon;