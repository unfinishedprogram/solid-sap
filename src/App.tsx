import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import BoundInput from './components/BoundInput';
import state from './createState';
import LoginMenu from './menus/LoginMenu';

export type MenuProps = {
  state: typeof state;
  setMenu(menu:Component<MenuProps>):void
}

const App: Component = () => {
  const getState = createMemo(() => state);
  const [currentMenu, setCurrentMenu] = createSignal<Component<MenuProps>>(LoginMenu);
  const setMenu = menu => setCurrentMenu(() => menu)

  // Update the session token when we add it to the state
  createEffect(() => {
    if(!getState().authState()?.loggedIn){
      setMenu(LoginMenu);
    }
  });

  return <>
    {currentMenu()({ state:getState(), setMenu:setMenu })}
    </>
};

export default App;
