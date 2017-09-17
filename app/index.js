import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux';
import {configureStore} from './store';
import App from './components/App';
// import PreferenceOne from './components/preference/preference_one.js';
// import PreferenceTwo from './components/preference/preference_two.js';
// import PreferenceThree from './components/preference/preference_three.js';

let store = configureStore();
export default () => {
  Navigation.registerComponent('App', ()=> App, store, Provider);
  // Navigation.registerComponent('PreferenceOne', ()=> PreferenceOne);
  // Navigation.registerComponent('PreferenceTwo', ()=> PreferenceTwo);
  // Navigation.registerComponent('PreferenceThree', ()=> PreferenceThree);

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'App',
        screen: 'App',
        title: 'Home',
        icon: require("./images/icon_home.png")
      }
      // {
      //   label: 'PreferenceOne',
      //   screen: 'PreferenceOne',
      //   title: 'PreferenceOne'
      // },
      // {
      //   label: 'PreferenceTwo',
      //   screen: 'PreferenceTwo',
      //   title: 'PreferenceTwo'
      // },
      // {
      //   label: 'PreferenceThree',
      //   screen: 'PreferenceThree',
      //   title: 'PreferenceThree'
      // }
    ]
  })
}
