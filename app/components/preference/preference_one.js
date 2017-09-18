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
    this.checkState = this.checkState.bind(this);
    this.navNextPreference = this.navNextPreference.bind(this);
  }

  updateDistance(val){
    this.setState({"distance": val});
  }

  updatePassengerRating(val){
    this.setState({"passengerRating": val});
  }

  checkState(){
    let stateKeys = Object.keys(this.state);
    for (let i = 0; i < stateKeys.length; i++)
    {
      if (this.state[stateKeys[i]] === "")
      {
        return false;
      };
    }
    return true;
  }
  //Do this later to light up the preferences with CSS that are already selected
  // componentDidMount() {
  //   this.props.requestPreferences()
  // }

  navNextPreference() {
    this.props.navigator.push({
      screen: 'PreferenceTwo',
      title: 'Preferences 2',
      animated: true,
      animationType: 'fade',
      passProps: this.state
    });
  }

  render()
  {
    return (
      <View>
        <View>
          <Text>How far will you drive for a pickup?</Text>
          <Text style={this.state.distance === "5" ? styles.selections : styles.nonselections} onPress={()=> updateDistance("5")}>5 min</Text>
          <Text style={this.state.distance === "10" ? styles.selections : styles.nonselections} onPress={()=> updateDistance("10")}>10 min</Text>
          <Text style={this.state.distance === "20" ? styles.selections : styles.nonselections} onPress={()=> updateDistance("20")}>20 min</Text>
          <Text style={this.state.distance === "Any" ? styles.selections : styles.nonselections} onPress={()=> updateDistance("Any")}>Any</Text>
        </View>
        <View>
          <Text>How far will you drive for a pickup?</Text>
          <Text style={this.state.passengerRating === "4.5" ? styles.selections : styles.nonselections} onPress={()=> updatePassengerRating("4.5")}>4.5</Text>
          <Text style={this.state.passengerRating === "4" ? styles.selections : styles.nonselections} onPress={()=> updatePassengerRating("4")}>4</Text>
          <Text style={this.state.passengerRating === "3.5" ? styles.selections : styles.nonselections} onPress={()=> updatePassengerRating("3.5")}>3.5</Text>
          <Text style={this.state.passengerRating === "Any" ? styles.selections : styles.nonselections} onPress={()=> updatePassengerRating("Any")}>Any</Text>
        </View>
        <Button
          onPress={this.checkState() ? navNextPreference : null}
          title={"Next Page"}
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  selections: {
    color: 'green'
  },
  nonselections: {
    color: 'black'
  }
});


module.exports = PreferenceOne;
