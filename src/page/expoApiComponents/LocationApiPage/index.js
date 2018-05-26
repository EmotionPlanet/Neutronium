import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class App extends Component {

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.setState({
        count: 0,
        location: null,
        errorMessage: null,
      });
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let count = this.state.count + 1;
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, count });
    setTimeout(this._getLocationAsync, 1000);
  };

  render() {
    let latitude = 'Waiting..';
    let longitude = 'Waiting..';

    if (this.state.errorMessage) {
      latitude = this.state.errorMessage;
    } else if (this.state.location) {
      latitude = JSON.stringify(this.state.location.coords.latitude);
      longitude = JSON.stringify(this.state.location.coords.longitude);
    }

    return (
      <View>
        <Text>latitude: {latitude}</Text>
        <Text>longitude: {longitude}</Text>
        <Text>count: {this.state.count}</Text>
      </View>
    );
  }
}