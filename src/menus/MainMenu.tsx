import { Component, createEffect, createSignal } from "solid-js"
import { MenuProps } from "../App";
import Icon from "../components/Icon";
import LoginMenu from "./LoginMenu";
import iconStyles from "../style/Icon.module.css"
import QueueArena from "../endpoints/queueArena";
import GameMenu from "./GameMenu";

const MainMenu:Component<MenuProps> = (props) => {
  createEffect(() => {
    if(!props.state.authState()?.loggedIn){
      props.setMenu(LoginMenu)
    }
  })

  const queueArena = () => {
    props.state.requestHandler.executeRequest(QueueArena, {SamePack:true})
      .then((res) => {
        console.log(res)
        props.state.setMatchState(res)
        props.setMenu(GameMenu)
      })
  }

  const testSig = createSignal(50);
  
  return <>
    <div>
      <button class="cancel" onclick={() => props.state.authManager.logout()}>Logout</button>
      <span>{ props.state.authState()?.accountInfo?.DisplayName || "Guest" }</span>
      <button class={iconStyles.icon_button}>
        <Icon icon="gear"/>
      </button>
    </div>
    <h1>Main Menu</h1>
    <div class="main_menu">
      <button onclick={queueArena} class="hero">Play Arena</button>
    </div>
  </>
}

export default MainMenu