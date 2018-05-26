import React from "react"
import { Text, View, Dimensions, TouchableOpacity } from "react-native"
import { Image, Button, Alert, Heading, Page, FlexBox } from "Neutronium/src/components"
import { Accelerometer } from 'expo'

import styles from "./styles"

// https://docs.expo.io/versions/v27.0.0/sdk/camera

export default class extends React.Component {

  componentWillMount() {
    this.setState({
      count: 0,
      accelerometerData: {},
    })
  }

  componentDidMount() {
    Accelerometer.setUpdateInterval(0.1);
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
    (async () => {
      this.setState({
        distance: this.props.accelerometerData
      })
    })();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      const {x:prevX, y:prevY, z:prevZ} = this.state.accelerometerData;
      const {x, y, z} = accelerometerData;
      
      let count = this.state.count + 1;
      

      this.setState(
        { 
          accelerometerData,
          count,
        }
      );

    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {

    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <Heading>Sensor States</Heading>
        <View style={styles.sensor}>
          <Text>Accelerometer:</Text>
          <Text>x: {round(this.state.prevX)} y: {round(this.state.prevY)} z: {round(this.state.prevZ)}</Text>
          <Text>Initial Accelerometer:</Text>
          <Text>
            x: {round(this.state.x)} y: {round(this.state.y)} z: {round(this.state.z)}
          </Text>
          <Text>Distance:</Text>
          <Text>Count</Text>
          <Text>{this.state.count}}</Text>
        </View>
      </Page>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}