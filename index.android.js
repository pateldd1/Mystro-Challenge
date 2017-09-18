import registerApp from './app/index';
import { Provider } from 'react-redux';
import { configureStore } from './app/store';

const store = configureStore();
registerApp(store, Provider);
