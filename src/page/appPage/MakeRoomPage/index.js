import React from "react"
import { Text, View } from "react-native"
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
                Actions.roomPage(room)
              }
            }}
          >
            OK
          </Button>
          <Button
            type="primary"
            size="large"
            style={styles.submit}
            onPress={undefined}
          >
            Stab
          </Button>
        </View>
      </Page>
    );
  }
}
