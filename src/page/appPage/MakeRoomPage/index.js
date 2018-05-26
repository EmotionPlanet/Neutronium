import React from "react"
import { Text, View, AlertIOS, AsyncStorage } from "react-native"
import { Actions } from "react-native-router-flux"
import { Avatar, Button, Page, FlexBox, TextInput } from "Neutronium/src/components"
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
      <Page
        style={styles.host}
        {...this.props}
      >
        <FlexBox
          alignItems="center"
          justifyContent="space-around"
        >
          <View>
            <Avatar
              size="xlarge"
              rounded={false}
              uri="http://placehold.jp/300x300.png?text=xlarge"
            />
          </View>
        </FlexBox>

        <View>
          <TextInput
            type="primary"
            onChangeText={roomName => this.setState({roomName})}
          />
          <Button
            type="primary"
            size="large"
            style={styles.submit}
            onPress={async () => {
              const room = (
                await firebase.database().ref('rooms/' + this.state.roomName).once('value')
              ).val()

              if (room == null) {
                alert("ルームが存在しません！");
                return
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
                      user_name: name
                    })
                  )

                  Actions.roomPage({roomName: newRoomName})
                }
              );
            }}
          >
            Stab
          </Button>
        </View>
      </Page>
    );
  }
}
