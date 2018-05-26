import React from "react"
import { Text, View, AlertIOS, AsyncStorage } from "react-native"
import { Actions } from "react-native-router-flux"
import { Image, Button, Page, FlexBox, TextInput } from "Neutronium/src/components"
import * as firebase from 'firebase';

import styles from "./styles"

export default class extends React.Component {
  componentWillMount() {
    this.setState({
      roomName: ""
    })
  }

  render() {
    return (
      <FlexBox
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={styles.host}
        {...this.props}
      >
        <FlexBox
          alignItems="center"
          justifyContent="space-around"
        >
          <View
            style={styles.view}
          >
            <Image
              size="xlarge"
              rounded={false}
              uri="http://placehold.jp/300x300.png?text=xlarge"
              style={styles.image}
            />
          </View>
        </FlexBox>

        <FlexBox
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          style={styles.box}
        >
          <TextInput
            type="primary"
            onChangeText={roomName => this.setState({roomName})}
            style={styles.input}
          />
          <Button
            type="primary"
            size="large"
            style={styles.submit}
            disabled={!this.state.roomName}
            onPress={async () => {
              const room = (
                await firebase.database().ref('rooms/' + this.state.roomName).once('value')
              ).val();

              if (room == null) {
                alert("ルームが存在しません！");

              } else {
                Actions.roomPage({roomName: this.state.roomName})
              }
            }}
          >
            OK
          </Button>
          <Button
            type="primary"
            size="large"
            style={styles.submit}
            onPress={() => {
              AlertIOS.prompt(
                'ルーム名',
                null,
                async newRoomName => {
                  const name = await AsyncStorage.getItem("name");
                  const room = (
                    await firebase.database().ref('rooms/' + newRoomName + "/users" ).push({
                      name: name
                    })
                  );

                  Actions.roomPage({roomName: newRoomName})
                }
              );
            }}
          >
            Stab
          </Button>
        </FlexBox>
      </FlexBox>
    );
  }
}
