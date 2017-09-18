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

class PreferenceThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carPool: ""
    }
    this.updateCarPool = this.updateCarPool.bind(this);
    this.checkState = this.checkState.bind(this);
  }

  updateCarPool(val){
    this.setState({"carPool": val});
  }

  checkState(){
    return this.state["carPool"] === "" ? false : true
  }
  //Do this later to light up the preferences with CSS that are already selected
  // componentDidMount() {
  //   this.props.requestPreferences()
  // }

  submit() {
    let { idToken, user_id } = this.props;
    let prefs = Object.assign({}, this.props.prefs, this.state);
    this.props.updatePreferences(idToken, user_id, prefs);
    this.props.navigator.push({
      screen: 'Home',
      title: 'Home',
      animated: true,
      animationType: 'fade',
      backButtonHidden: true
    });
  }

  render()
  {
    return (
      <View>
        <View>
          <Text>Do you want rides from carpool services?</Text>
          <Text onPress={()=> this.updateCarPool("Yes")}>Yes</Text>
          <Text onPress={()=> this.updateCarPool("No")}>No</Text>
        </View>
        <Button
          onPress={this.checkState() ? this.submit.bind(this) : null}
          title={"Submit"}
        />
      </View>
    );
  }
}


module.exports = PreferenceThree;
