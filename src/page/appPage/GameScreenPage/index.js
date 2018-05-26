import React from "react"
import { Text, View, ImageBackground } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, FlexBox, Heading, Button, Image } from "Neutronium/src/components"
import background from "Neutronium/assets/images/background.png"
import * as firebase from 'firebase';

import styles from "./styles"

export default class extends React.Component {

  componentWillMount() {
    this.setState({
      subscriber: undefined,
      ref: undefined,
      room: undefined
    })
  }

  componentDidMount() {
    (async() => {
      const {
        roomName,
        myId,
        ...props
      } = this.props

      this.setState(
        {
          subscriber: async snapshot => {
            const val = snapshot.val()

            const room = {
              ...val,
              users: Object.entries(val.users).map(([i, v]) => ({
                id: i,
                ...v,
              }))
            }
            
            this.setState({
              room
            })
          },
          ref: firebase.database().ref('rooms/' + roomName )

        },
        async () => {
          await this.state.ref.on('value', this.state.subscriber);
        }
      )

    })()
  }

  componentWillUnmount() {
    (async() => {
      const {
        roomName,
        myId,
      } = this.props

      this.state.ref.off('value', this.state.subscriber)

      await firebase
        .database()
        .ref('rooms/' + roomName + '/users/' + myId)
        .remove()
    })()
  }


  render() {
    return (
      <ImageBackground
        source={background}
        style={[
          styles.host,
          {width: "100%", height: "100%"}
        ]}
        {...this.props}
      >
        <View>
          {/* 「ボールを持っているのは」という画像がきます */}
          <Image
            uri="http://placehold.jp/300x300.png?text=xlarge"
          />

          {/* 文字を重ねたい（願望） */}
          <Image
            uri="http://placehold.jp/300x300.png?text=xlarge"
          />
          <Heading size="medium" align="center">北邑メンバー</Heading>

          {/* のちのち消すよ */}
          <Button
            type="dark" 
            onPress={() => Actions.gameSetPage()}
          >
            (仮)GAMESETに遷移
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
