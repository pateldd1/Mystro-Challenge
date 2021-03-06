import React from 'react';
import {connect} from 'react-redux';
import {updatePreferences, requestPreferences} from '../../actions/userActions';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Button
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

  navNextPreference() {
    if ( !this.props.user_id )
    {
      this.props.navigator.switchToTab({
        tabIndex: 0
      });
    }
    else {
      this.props.navigator.push({
        screen: 'PreferenceTwo',
        title: 'Preferences 2',
        animated: true,
        animationType: 'fade',
        passProps: {prefs: this.state, user_id: this.props.user_id, idToken: this.props.idToken, updatePreferences: this.props.updatePreferences}
      });
    }
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>How far will you drive for a pickup?</Text>
          <View style={styles.options}>
            <Text style={this.state.distance === "5" ? styles.selections : styles.nonselections}
              onPress={()=> this.updateDistance("5")}>5 min</Text>
            <Text style={this.state.distance === "10" ? styles.selections : styles.nonselections}
              onPress={()=> this.updateDistance("10")}>10 min</Text>
            <Text style={this.state.distance === "20" ? styles.selections : styles.nonselections}
              onPress={()=> this.updateDistance("20")}>20 min</Text>
            <Text style={this.state.distance === "Any" ? styles.selections : styles.nonselections}
              onPress={()=> this.updateDistance("Any")}>Any</Text>
          </View>
        <Text style={styles.title}>Lowest passenger rating?</Text>
        <View style={styles.options}>
          <Text style={this.state.passengerRating === "4.5" ? styles.selections : styles.nonselections}
            onPress={()=> this.updatePassengerRating("4.5")}>4.5</Text>
          <Text style={this.state.passengerRating === "4" ? styles.selections : styles.nonselections}
            onPress={()=> this.updatePassengerRating("4")}>4</Text>
          <Text style={this.state.passengerRating === "3.5" ? styles.selections : styles.nonselections}
            onPress={()=> this.updatePassengerRating("3.5")}>3.5</Text>
          <Text style={this.state.passengerRating === "Any" ? styles.selections : styles.nonselections}
            onPress={()=> this.updatePassengerRating("Any")}>Any</Text>
        </View>
        <Button
          style={styles.nextbutton}
          onPress={this.checkState() ? this.navNextPreference.bind(this) : ()=> null}
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
    textAlign: "center",
    fontSize: 20,
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderColor: "green",
    height: 100,
    width: 80,
    marginLeft: 10,
    paddingTop: 35
  },
  nonselections: {
    textAlign: "center",
    fontSize: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    height: 100,
    width: 80,
    marginLeft: 10,
    paddingTop: 35
  },
  nextbutton: {
    marginTop: 10
  },
  options: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20
  }
});

let mapStateToProps = (state) => {
  return {
    user_id: state.user.user_id,
    idToken: state.user.idToken,
    preferences: state.user.preferences
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    requestPreferences: (idToken, user_id) => dispatch(requestPreferences(idToken, user_id)),
    updatePreferences: (idToken, user_id, prefs) => dispatch(updatePreferences(idToken, user_id, prefs))
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(PreferenceOne);
