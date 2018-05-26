import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Image, Button, Alert, Heading, Page, FlexBox } from "Neutronium/src/components"
import { Constants, Magnetometer, Permissions } from 'expo';

import styles from "./styles"

export default class MagnetometerSensor extends React.Component {

  componentWillMount() {
    this.setState({
      count: 0,
      prevMagnetometerData: {},
      magnetometerData: {},
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
        distance: this.props.magnetometerData
      })
    })();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Magnetometer.addListener(magnetometerData => {
      const {x:prevX, y:prevY, z:prevZ} = this.state.magnetometerData;
      const {x, y, z} = magnetometerData;
        
      let count = this.state.count + 1;
  
      this.setState({
        prevMagnetometerData: this.state.magnetometerData,
        magnetometerData,
        count,
      });
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    Magnetometer.setUpdateInterval(1000);
    const theta = calculationDistance(this.state.prevMagnetometerData, this.state.magnetometerData);

    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <Heading>Sensor States</Heading>
        <View style={styles.sensor}>
          <Text>Old Magnetometer:</Text>
          <Text>x: {round(this.state.prevMagnetometerData.x)} y: {round(this.state.prevMagnetometerData.y)} z: {round(this.state.prevMagnetometerData.z)}</Text>
          <Text>Now Magnetometer:</Text>
          <Text>
            x: {round(this.state.magnetometerData.x)} y: {round(this.state.magnetometerData.y)} z: {round(this.state.magnetometerData.z)}
          </Text>
          <Text>Theta:</Text>
          <Text>{theta}</Text>
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
  const x = Math.pow(nowData.x, 2);
  const y = Math.pow(nowData.y, 2);
  const z = Math.pow(nowData.z, 2);

  const radius = Math.sqrt(x + y + z);
  const theta = Math.acos(nowData.z / radius);
  const phi = Math.atan2(nowData.y, nowData.x);
  return phi;
}