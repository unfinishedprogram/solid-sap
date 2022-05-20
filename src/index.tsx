/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';
import RequestHandler from './requester';


export const requestHandler = new RequestHandler();
requestHandler.gameVersion = 18;

render(() => <App />, document.getElementById('root') as HTMLElement);