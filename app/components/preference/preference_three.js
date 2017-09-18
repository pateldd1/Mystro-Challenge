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
    this.props.navigator.popToRoot({
      animated: true,
      animationType: 'fade'
    })
    this.props.navigator.switchToTab({
      tabIndex: 0
    });
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Want rides from carpool services?</Text>
          <View style={styles.options}>
            <Text style={this.state.carPool === "Yes" ? styles.selections : styles.nonselections}
              onPress={()=> this.updateCarPool("Yes")}>Yes</Text>
            <Text style={this.state.carPool === "No" ? styles.selections : styles.nonselections}
              onPress={()=> this.updateCarPool("No")}>No</Text>
          </View>
        <Button
          style={styles.nextbutton}
          onPress={this.checkState() ? this.submit.bind(this) : ()=> null}
          title={"Submit"}
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
    width: 120,
    marginLeft: 15,
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
    width: 120,
    marginLeft: 15,
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

module.exports = PreferenceThree;
