import React from 'react';
import {connect} from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Slider
  } from 'react-native';

let left = 0;
class SlidingComponent extends React.Component {
  constructor(props){
    super(props);
    this.setRating = this.setRating.bind(this);
    this.state = {
      //Pass rating from Home component
      ratingValue: parseFloat(this.props.rating)
    }
  }

  setRating(amt){
    this.props.setRating(this.props.idToken, this.props.userId, amt);
  }

  render(){
    return (
      <View>
        <Text style={styles.title}>Passenger Rating:{"\n\n"}</Text>
        <Text style={{fontSize: 20, marginLeft: 10 + 62*this.state.ratingValue}}>{this.state.ratingValue.toFixed(1)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={0.1}
          value={this.state.ratingValue}
          onValueChange={(amt) => {
            this.setState({ratingValue: amt})
          }}
          onSlidingComplete={(amt) => this.setRating(amt)}
          />
        <Text>{"\n\n"}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slider: {
    width: 350
  },
  title: {
    fontSize: 18
  }
});

module.exports = SlidingComponent;
