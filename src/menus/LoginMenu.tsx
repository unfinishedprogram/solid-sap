import { Component, createEffect, createSignal } from "solid-js"
import { MenuProps } from "../App";
import RegisterMenu from "./RegisterMenu";
import Spinner from "../components/Spinner";
import MainMenu from "./MainMenu";

import styles from './LoginMenu.module.css'
import BoundInput from "../components/BoundInput";

const LoginMenu:Component<MenuProps> = (props) => {
  const [loading, setLoading] = createSignal<boolean>(false) 

  const email = createSignal<string>("")
  const password = createSignal<string>("")

  const [getError, setError] = createSignal<string>();

  const handleError = err => setError(err.title);

  const login = () => {
    setError("")
    setLoading(true)
    props.state.authManager.login(email[0](), password[0]()).then(() => {
      setLoading(false)
    })

    // props.state.requestHandler.executeRequest(Login, {
    //   Email:email[0](), 
    //   Password:password[0]()
    // }).then(props.state.setAccountInfo)
    //   .catch(handleError)
    //   .finally(() => setLoading(false))
  }

  const guestLogin = () => {
    props.state.authManager.registerGuest();
  }

  createEffect(() => {
    if(props.state.authState()?.loggedIn){
      props.setMenu(MainMenu)
    }
  })

  const submit = (e:SubmitEvent) => {
    e.preventDefault();
    login()
  }

  return <>
    <h1>Login</h1>
    <form onsubmit={ submit } class={styles.login_form}>
      <BoundInput value={email} type="email" placeholder="email..."/>
      <BoundInput value={password} type="password" placeholder="password..."/>
      <input type="button" onclick={guestLogin} value="Play as Guest"/>
      <div class={styles.buttons_container}>
        <input type="button" onclick={() => props.setMenu(RegisterMenu)} value="Register"/>
        <input type="submit" value="Login" />
      </div>
    </form>
      { getError() }
      { loading() && <Spinner/> }
  </>
}

export default LoginMenu