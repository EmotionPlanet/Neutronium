import React from "react"
import { Text, View, ImageBackground } from "react-native"
import resultImage from "Neutronium/assets/images/result.png"
import { Actions } from "react-native-router-flux"
import { FlexBox, Button, Image, Heading } from "Neutronium/src/components"
import * as firebase from 'firebase';

import styles from "./styles"

export default class extends React.Component {


  render() {

    const room = this.props.room
    return (
      <ImageBackground
        source={resultImage}
        style={{width: "100%", height: "100%", backgroundColor: "#fff500"}}
      >
        <FlexBox
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Heading 
            size="medium" 
            align="center"
            style={styles.label}
          >
            {room.users.find(x => x.id == room.loser).name}
          </Heading>
          <Button
            type="primary" 
            japanese="ture"
            style={styles.submit}
            onPress={() => Actions.roomPage({
              roomName: this.props.roomName,
              myId: this.props.myId
            })}
          >
            ROOMへ戻る
          </Button>
        </FlexBox>
      </ImageBackground>
    );
  }
}