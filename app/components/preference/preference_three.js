import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
  } from 'react-native';

class PreferenceThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carPool: ""
    }
    this.updateCarPool = this.updateCarPool.bind(this);
    this.checkState = this.checkState.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateCarPool(val){
    this.setState({"carPool": val});
  }

  checkState(){
    this.state["carPool"] === "" ? false : true
  }
  //Do this later to light up the preferences with CSS that are already selected
  // componentDidMount() {
  //   this.props.requestPreferences()
  // }

  submit() {
    { idToken, user_id } = this.props;
    let prefs = Object.assign(this.props, this.state);
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
          <Text onPress={()=> updateCarPool("Yes")}>Yes</Text>
          <Text onPress={()=> updateCarPool("No")}>No</Text>
        </View>
        <Button
          onPress={this.checkState() ? submit : null}
          title={"Submit"}
        />
      </View>
    );
  }
}


module.exports = PreferenceThree;
