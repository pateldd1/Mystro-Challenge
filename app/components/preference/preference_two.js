import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Button
  } from 'react-native';

class PreferenceTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      application: "",
      otherOnLine: ""
    }
    this.updateApplication = this.updateApplication.bind(this);
    this.updateOtherOnline = this.updateOtherOnline.bind(this);
    this.checkState = this.checkState.bind(this);
  }

  updateApplication(val){
    this.setState({"application": val});
  }

  updateOtherOnline(val){
    this.setState({"otherOnLine": val});
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
      screen: 'PreferenceThree',
      title: 'Preferences 3',
      animated: true,
      animationType: 'fade',
      passProps: {prefs: Object.assign({}, this.props.prefs, this.state),
                  user_id: this.props.user_id,
                  idToken: this.props.idToken, 
                  updatePreferences: this.props.updatePreferences}
    });
  }

  render()
  {
    return (
      <View>
        <View>
          <Text>What app should always be active?</Text>
          <Text style={this.state.application === "Uber" ? styles.selections : styles.nonselections}
             onPress={()=> this.updateApplication("Uber")}>Uber</Text>
          <Text style={this.state.application === "Lyft" ? styles.selections : styles.nonselections}
             onPress={()=> this.updateApplication("Lyft")}>Lyft</Text>
        </View>
        <View>
          <Text>And when should the other come on-line?</Text>
          <Text style={this.state.otherOnLine === "Always" ? styles.selections : styles.nonselections }
             onPress={()=> this.updateOtherOnline("Always")}>Always</Text>
          <Text style={this.state.otherOnLine === "If no ride for 5 minutes" ? styles.selections : styles.nonselections }
             onPress={()=> this.updateOtherOnline("If no ride for 5 minutes")}>If no ride for 5 minutes</Text>
          <Text style={this.state.otherOnLine === "If no ride for 10 minutes" ? styles.selections : styles.nonselections }
             onPress={()=> this.updateOtherOnline("If no ride for 10 minutes")}>If no ride for 10 minutes</Text>
          <Text style={this.state.otherOnLine === "If no ride for 15 minutes" ? styles.selections : styles.nonselections }
             onPress={()=> this.updateOtherOnline("If no ride for 15 minutes")}>If no ride for 15 minutes</Text>
        </View>
        <Button
          onPress={this.checkState() ? this.navNextPreference.bind(this) : ()=>null}
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

module.exports = PreferenceTwo;
