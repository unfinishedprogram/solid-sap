import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import createGameState, { GameState } from './gameState';
import LoginMenu from './menus/LoginMenu';
import MainMenu from './menus/MainMenu';


export type MenuProps = {
  state:GameState
  setMenu(menu:Component<MenuProps>):void
}

const App: Component = () => {
  const [state, setState] = createSignal(createGameState());
  const [currentMenu, setCurrentMenu] = createSignal<Component<MenuProps>>(LoginMenu);


  const setMenu = menu => setCurrentMenu(() => menu)

  const renderedMenu = createMemo(() => currentMenu()({state:state(), setMenu:setMenu}));

  return (
    <>
      { renderedMenu() }
    </>
  );
};

export default App;
