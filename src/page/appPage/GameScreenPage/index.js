import React from "react"
import { Text, View, ImageBackground, Vibration } from "react-native"
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
      room: undefined,
      vibPattern1 : [10, 10, 10],
      vibPattern2 : [100, 100, 100],
      vibPattern3 : [500, 500, 500],
      vibPattern4 : [1000, 1000, 1000],
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
              users: Object.entries(val.users || {}).map(([i, v]) => ({
                id: i,
                ...v,
              }))
            }

            {/* ゲームゾーン */}
            if (room.ball_holding_user == myId) {
              this._vibration();

              const winAction = async () => {

                const userIdList = room.users.map(x => x.id)
                  .filter(x => x != myId)

                await firebase.database().ref('rooms/' + roomName  ).update({
                  ball_holding_user: userIdList[Math.floor(Math.random() * userIdList.length)].id
                })
              }
            }

            {/* ゲームゾーン */}

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

  _vibration(){
    Vibration.vibrate(this.state.vibPattern4, true);
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
