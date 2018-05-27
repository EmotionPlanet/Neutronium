import React from "react"
import {Text, View, AlertIOS, AsyncStorage, Dimensions, ImageBackground} from "react-native"
import { Actions } from "react-native-router-flux"
import background from "Neutronium/assets/images/background.png"
import appearance from "Neutronium/assets/images/appearance.png"
import { Image, Button, Page, FlexBox, TextInput } from "Neutronium/src/components"
import * as firebase from 'firebase';

import styles from "./styles"

export default class extends React.Component {
  componentWillMount() {
    this.setState({
      roomName: "",
      deviceWidth: Dimensions.get('window').width
    })
  }

  render() {
    const { deviceWidth } = this.state;
    
    return (
      <ImageBackground
        source={background}
        style={{width: "100%", height: "100%", backgroundColor: "#fff500"}}
      >
        <FlexBox
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          style={{
            width: deviceWidth,
            ...styles.host
          }}
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
                source={appearance}
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
              placeholder="ここに部屋の名前を入力！！"
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

                } else if (room.is_start) {
                  alert("ゲーム中です。お待ちください。")
                } else {
                  const name = await AsyncStorage.getItem("name");

                  const x = await firebase.database().ref('rooms/' + this.state.roomName + "/users" ).push({
                    name: name
                  })

                  firebase
                    .database()
                    .ref('rooms/' + this.state.roomName + "/users/" + x.key)
                    .onDisconnect()
                    .remove()
                  Actions.roomPage({roomName: this.state.roomName, myId: x.key})
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
                  "ルーム名",
                  null,
                  async newRoomName => {

                    const room = (
                      await firebase.database().ref('rooms/' + newRoomName).once('value')
                    ).val();

                    if (room == null) {

                      const name = await AsyncStorage.getItem("name");
                      const snapshot = await firebase.database().ref('rooms/' + newRoomName + "/users" ).push({
                        name: name
                      })

                      firebase
                        .database()
                        .ref('rooms/' + newRoomName + "/users/" + snapshot.key)
                        .onDisconnect()
                        .remove()

                      firebase.database().ref('rooms/' + newRoomName ).update({
                        game_time: 15
                      })

                      Actions.roomPage({
                        roomName: newRoomName,
                        myId: snapshot.key
                      })
                    } else {
                      alert("すでに同じ名前のルームが存在します。")
                    }
                  }
                );
              }}
            >
              Stab
            </Button>
          </FlexBox>
        </FlexBox>
      </ImageBackground>
    );
  }
}
