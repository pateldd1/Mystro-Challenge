import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
  } from 'react-native';

class PreferenceOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: "",
      passengerRating: ""
    }
    this.updateDistance = this.updateDistance.bind(this);
    this.updatePassengerRating = this.updatePassengerRating.bind(this);
  }

  updateDistance(){

  }

  //Do this later to light up the preferences with CSS that are already selected
  // componentDidMount() {
  //   this.props.requestPreferences()
  // }

  // navNextPreference() {
  //   this.props.navigator.push({
  //     screen: 'PreferenceTwo',
  //     title: 'Preferences 2',
  //     animated: true,
  //     animationType: 'fade'
  //   });
  // }

// THE REGEX IS BEING USED TO TRUNCATE THE LENGTH OF THE BALANCE TO 2 DIGITS WITHOUT ROUNDING
  render()
  {
    return (
      <View>
        <View>
          <Text>How far will you drive for a pickup?</Text>
          <Text onPress={()=> updateDistance("5")}>5 min</Text>
          <Text onPress={()=> updateDistance("10")}>10 min</Text>
          <Text onPress={()=> updateDistance("20")}>20 min</Text>
          <Text onPress={()=> updateDistance("Any")}>Any</Text>
        </View>
        <View>
          <Text>How far will you drive for a pickup?</Text>
          <Text onPress={()=> updatePassengerRating("4.5")}>4.5</Text>
          <Text onPress={()=> updatePassengerRating("4")}>4</Text>
          <Text onPress={()=> updatePassengerRating("3.5")}>3.5</Text>
          <Text onPress={()=> updatePassengerRating("Any")}>Any</Text>
        </View>
      </View>
    );
  }
}


module.exports = PreferenceOne;
