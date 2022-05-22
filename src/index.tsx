/* @refresh reload */
import { render } from 'solid-js/web';

import './style/App.scss';

import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);