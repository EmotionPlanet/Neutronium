import React from "react"
import { Text, View } from "react-native"
import { Image, Button, Alert, Heading, Page, FlexBox } from "Neutronium/src/components"
import { Accelerometer } from 'expo'

import styles from "./styles"

// https://docs.expo.io/versions/v27.0.0/sdk/camera

export default class extends React.Component {

  componentWillMount() {
    this.setState({
      count: 0,
      prevAccelerometerData: {},
      accelerometerData: {},
    })
  }

  componentDidMount() {
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

      this.setState({
        prevAccelerometerData: this.state.accelerometerData,
        accelerometerData,
        count,
      });

    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    Accelerometer.setUpdateInterval(300);
    const distanse = calculationDistance(this.state.prevAccelerometerData, this.state.accelerometerData);
    distanse > 1.5
      ?isDistanse = true
      :isDistanse = false;
    
    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <Heading>Sensor States</Heading>
        <View style={styles.sensor}>
          <Text>Accelerometer:</Text>
          <Text>x: {round(this.state.prevAccelerometerData.x)} y: {round(this.state.prevAccelerometerData.y)} z: {round(this.state.prevAccelerometerData.z)}</Text>
          <Text>Initial Accelerometer:</Text>
          <Text>
            x: {round(this.state.accelerometerData.x)} y: {round(this.state.accelerometerData.y)} z: {round(this.state.accelerometerData.z)}
          </Text>
          <Text>Distance:</Text>
          <Text>{distanse}</Text>
          <Text>Count</Text>
          <Text>{this.state.count}</Text>
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

function calculationDistance(prevData, nowData) {
  const x = Math.pow(prevData.x - nowData.x, 2);
  const y = Math.pow(prevData.y - nowData.y, 2);
  const z = Math.pow(prevData.z - nowData.z, 2);
  return Math.sqrt(x+y+z);
}