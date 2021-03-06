/**
 * Auth0Sample 00-Login
 * https://github.com/auth0/react-native-auth0
 * @flow
 */
import {connect} from 'react-redux';
import { loginUser, logoutUser, altLogoutUser,
        requestPreferences, updatePreferences, setRating } from '../actions/userActions';
import React, { Component } from 'react';
import SlidingComponent from './preference/slider';
import {
  Alert,
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this._onLogin = this._onLogin.bind(this);
    this._onLogout = this._onLogout.bind(this);
    this.navigation = this.navigation.bind(this);
    this.displayPreferences = this.displayPreferences.bind(this);
    this.parseResult = this.parseResult.bind(this);
    // this.state = { accessToken: null };
  }

  componentDidMount() {
    if ( this.props.accessToken && this.props.user_id && this.props.idToken)
    {
      this.props.requestPreferences(this.props.idToken, this.props.user_id)
    }
  }

  componentDidUpdate(prevProps, prevState){
    //If not logged in, just return.
    if ( !this.props.accessToken )
    {
      return;
    }
    //Once logged in, request preferences
    if (prevProps.accessToken !== this.props.accessToken)
    {
      this.props.requestPreferences(this.props.idToken, this.props.user_id);
    }
    //after logging in, see if the user needs to be taken to preferences or home page.
    else if (this.props.accessToken){
      this.navigation();
    }
  }

  //If there are no preferences, then go to preferences screens
  //Else remain on this screen and see your preferences
  navigation(){
    let {preferences} = this.props;
    let prefKeys = Object.keys(preferences)
    for (let i = 0; i < prefKeys.length; i++)
    {
      //Checking if any preferences are available in the preferences object
      //User either has all preferences set or no preferences set.
      if (preferences[prefKeys[i]]){
        return;
      }
    }
    //Pass Props of the User Id later to light up the preferences already selected - Extra
    //Navigate to the preferences screen if there are no preferences set
    this.props.navigator.push({
      screen: 'PreferenceOne',
      title: 'Preferences 1',
      animated: true,
      animationType: 'fade',
      backButtonHidden: true,
    });
  }

  _onLogin = () => {
    this.props.loginUser();
  }

  _onLogout = () => {
    if ( Platform.OS === 'android' )
    {
      this.props.altLogoutUser()
    }
    else {
      this.props.logoutUser();
    }
  }
  parseResult(key, val){
    switch(key){
      case "distance":
        return `Willing to Drive ${val} minutes`;
      case "passengerRating":
        return `Willing to pick up passengers with > ${parseFloat(val).toFixed(1)} rating`;
      case "application":
        return `${val} will always be active`;
      case "otherOnLine":
        return `Other application will come online ${val}`;
      case "carPool":
        return `${val === 'Yes' ? 'Does' : 'Doesnt'} want rides from carpool services`;
    }
  }
  displayPreferences(){
    let display = Object.keys(this.props.preferences).map((pref, idx)=>{
      return (
        <View style={styles.prefs} key={idx}>
          <Text style={styles.pref}>{this.parseResult(pref, this.props.preferences[pref])}</Text>
        </View>
      )
    })
    return (
      <View style={styles.prefContainer}>
        <Text style={styles.prefText}>Preferences:</Text>
        {display}
      </View>
    )
  }

  ratingBar(loggedIn){
    if ( loggedIn )
    {
      let {passengerRating} = this.props.preferences;
      return (
        <SlidingComponent
          userId={this.props.user_id}
          idToken={this.props.idToken}
          setRating={this.props.setRating}
          rating={passengerRating}/>
      )
    }
    else {
      return null;
    }
  }

  render() {
    let loggedIn = this.props.accessToken ? true : false;
    let disp;
    let ratingBar = this.ratingBar(loggedIn);
    if ( loggedIn )
    {
      disp = this.displayPreferences();
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Mystro</Text>
        {disp}
        {ratingBar}
        <Button
          style={styles.press}
          onPress={loggedIn ? this._onLogout : this._onLogin}
          title={loggedIn ? 'Log Out' : 'Log In'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  prefContainer: {
    marginBottom: 35
  },
  prefText: {
    fontSize: 18,
    marginLeft: 16
  },
  pref: {
    fontSize: 15
  },
  prefs: {
      paddingLeft: 15,
      paddingTop: 15,
      borderBottomWidth: 1,
      borderColor: '#d3d3d3',
      backgroundColor: 'white',
      width: 345,
      marginLeft: 15
    },
});

let mapStateToProps = (state) => {
  return {
    user_id: state.user.user_id,
    accessToken: state.user.accessToken,
    idToken: state.user.idToken,
    preferences: state.user.preferences
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(loginUser()),
    logoutUser: () => dispatch(logoutUser()),
    altLogoutUser: () => dispatch(altLogoutUser()),
    requestPreferences: (idToken, user_id) => dispatch(requestPreferences(idToken, user_id)),
    updatePreferences: (idToken, user_id, prefs) => dispatch(updatePreferences(idToken, user_id, prefs)),
    setRating: (idToken, user_id, rating) => dispatch(setRating(idToken, user_id, rating))
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);
