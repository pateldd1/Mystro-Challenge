import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux';
import {configureStore} from './store';
import Home from './components/Home';
import PreferenceOne from './components/preference/preference_one.js';
import PreferenceTwo from './components/preference/preference_two.js';
import PreferenceThree from './components/preference/preference_three.js';

let store = configureStore();
export default () => {
  Navigation.registerComponent('Home', ()=> Home, store, Provider);
  Navigation.registerComponent('PreferenceOne', ()=> PreferenceOne, store, Provider);
  Navigation.registerComponent('PreferenceTwo', ()=> PreferenceTwo);
  Navigation.registerComponent('PreferenceThree', ()=> PreferenceThree);

  // Navigation.startSingleScreenApp({
  //   screen: {
  //     screen: 'App',
  //     title: 'App'
  //   }
  // })
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Home',
        screen: 'Home',
        title: 'Home',
        icon: require("./images/house.png"),
        selectedIcon: require("./images/house.png")
      },
      {
        label: 'Preferences',
        screen: 'PreferenceOne',
        title: 'Preferences 1',
        icon: require("./images/avatar.png"),
        selectedIcon: require("./images/avatar.png")
      }
    ]
  })
}
