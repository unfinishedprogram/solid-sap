import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import { requestHandler } from '.';
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

  createEffect(() => {
    console.log("TRIGGERED")
    requestHandler.authToken = state().sessionToken();
    console.log(requestHandler.authToken)
  });

  const renderedMenu = createMemo(() => currentMenu()({state:state(), setMenu:setMenu}));

  return (
    <>
      { renderedMenu() }
    </>
  );
};

export default App;
