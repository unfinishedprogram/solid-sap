import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import { requestHandler } from '.';
import Message from './components/Message';
import createGameState, { GameState } from './gameState';
import LoginMenu from './menus/LoginMenu';

export type MenuProps = {
  state:GameState
  setMenu(menu:Component<MenuProps>):void
}

const App: Component = () => {
  const [state, setState] = createSignal(createGameState());
  const [currentMenu, setCurrentMenu] = createSignal<Component<MenuProps>>(LoginMenu);
  const setMenu = menu => setCurrentMenu(() => menu)


  // Update the session token when we add it to the state
  createEffect(() => {
    requestHandler.authToken = state().sessionToken();
  });

  const renderedMenu = createMemo(() => {
    return currentMenu() ({ state:state(), setMenu:setMenu })
  });

  return (
    <>
      { <Message type='warning' body="Warning!" ></Message> }
      { renderedMenu() }  
    </>
  );
};

export default App;
