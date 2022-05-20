import { Component, createEffect, createSignal } from "solid-js"
import { MenuProps } from "../App";
import RegisterMenu from "./RegisterMenu";
import { requestHandler } from "..";
import Login from "../endpoints/login";
import RegisterGuest from "../endpoints/registerGuest";
import Spinner from "../components/Spinner";
import MainMenu from "./MainMenu";

const LoginMenu:Component<MenuProps> = (props) => {
  const [loading, setLoading] = createSignal<boolean>(false) 
  let email:HTMLInputElement;
  let password:HTMLInputElement;

  const [getError, setError] = createSignal<string>();

  const handleError = err => setError(err.title);

  const login = () => {
    setError("")
    setLoading(true)
    requestHandler.executeRequest(Login, {
      Email:email.value, 
      Password:password.value
    }).then(props.state.setAccountInfo)
      .catch(handleError)
      .finally(() => setLoading(false))
  }

  const guestLogin = () => {
    setError("")
    setLoading(true)
    requestHandler.executeRequest(RegisterGuest, {})
      .then(() => {

      })
      .catch(handleError)
      .finally(() => setLoading(false))
    console.log("GuestLogin")
  }

  createEffect(() => {
    if(props.state.accountInfo()){
      props.setMenu(MainMenu)
    }
  })

  return <div>
    <h1>Login</h1>
    <input ref={email} type="email" placeholder="email..."/>
    <input ref={password} type="password" placeholder="password..."/>
    <button onclick={login}>Login</button>
    <button onclick={() => props.setMenu(RegisterMenu)}>Register</button>
    <button onclick={guestLogin}>Play as Guest</button>
      { getError() }
      { JSON.stringify(props.state.accountInfo()) }
      { loading() && <Spinner/> }
  </div>
}

export default LoginMenu