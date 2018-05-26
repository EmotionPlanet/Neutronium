import React from "react"
import { Text, View, Dimensions, TouchableOpacity } from "react-native"
import { Image, Button, Alert, Heading, Page, FlexBox } from "Neutronium/src/components"
import { Accelerometer } from 'expo'

import styles from "./styles"

// https://docs.expo.io/versions/v27.0.0/sdk/camera

export default class extends React.Component {

  state = {
    accelerometerData: {},
  }

  componentWillMount() {}

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
      this.setState({ accelerometerData });
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;

    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <Heading>Sensor States</Heading>
        <View style={styles.sensor}>
          <Text>Accelerometer:</Text>
          <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
          <Text>Initial Accelerometer:</Text>
          <Text>
            {round(x)}:{round(y)}:{round(z)}
          </Text>
          <Text>Distance:</Text>
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