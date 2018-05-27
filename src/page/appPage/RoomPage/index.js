import React from "react"
import { Text, View, ImageBackground, AppState, Image } from "react-native"
import background from "Neutronium/assets/images/background.png"
import bombgame from "Neutronium/assets/images/bombgame.png"
import ruleBackground from "Neutronium/assets/images/rule.png"
import member from "Neutronium/assets/images/member.png"
import { Actions } from "react-native-router-flux"
import { Page, FlexBox, Heading, Button, TextInput, Modal } from "Neutronium/src/components"
import { ListGroup, ListGroupItem } from "Neutronium/src/components/listGroup"
import * as firebase from 'firebase';

import styles from "./styles"

export default class extends React.Component {

  componentWillMount() {
    this.setState({
      subscriber: undefined,
      ref: undefined,
      room: undefined,
      modalRule: false,
    })
    AppState.addEventListener('change', this._handleAppStateChange);
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

            if (room.is_start) {
              Actions.gameScreenPage({
                roomName,
                myId,
              })
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
    const {
      roomName,
      myId,
    } = this.props

    return (
      <ImageBackground
        source={background}
        style={{width: "100%", height: "100%", backgroundColor: "#fff500"}}
      >
        <View style={styles.slider}>
          <Image
            source={bombgame}
            style={{
              width: '100%',
              resizeMode: 'contain'
            }}
          />
        </View>
        <FlexBox
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="column"
          style={styles.box}
        >
          <Button
            size="large"
            type="primary"
            onPress={() => this.setState({modalRule: !this.state.modalRule})}
            style={styles.rule}
            >
            RULE
            </Button>
          <View
            style={styles.timeWrap}
          >
            <TextInput
              onChangeText={async gameTime => {
                if (isNaN(parseInt(gameTime))) {
                  alert("秒数を入力してください。")
                  return
                }
                await firebase.database().ref('rooms/' + roomName ).update({game_time: parseInt(gameTime)})
              }}
              value={this.state.room && this.state.room.game_time && this.state.room.game_time.toString() || ""}
              placeholder={'time'}
            />
          </View>
          <FlexBox
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="column"
            flexWrap
            style={styles.box}
          >
            <View
              style={{
                width: '60%',
                marginTop: -10
              }}
            >
              <Image
                source={member}
                resizeMode='contain'
                style={{
                  width: '100%',
                }}
              />
            </View>
            <ListGroup style={styles.list}>
              {this.state.room && this.state.room.users.map(user =>
                <ListGroupItem
                  key={user.id}
                  badgeText={user.is_ready ? "準備完了!" : "準備中"}
                  style={{
                    margin: 8,
                    minHeight: 46,
                    ...styles.label
                  }}
                >
                  {user.name}
                </ListGroupItem>
              )}
            </ListGroup>
          </FlexBox>
          <Button
            size="large"
            type={"primary"}
            onPress={async () => {
              await firebase.database().ref('rooms/' + roomName + "/users/" + myId ).update({
                is_ready: !( (this.state.room && this.state.room.users.find(x => x.id == myId) || {} ).is_ready )
              })
            }}
            style={styles.start}
          >
            GAME START
          </Button>
        </FlexBox>
        <Modal
            visible={this.state.modalRule}
            type="none"
          > 
            <ImageBackground
              source={ruleBackground}
              style={{width: "100%", height: "100%", backgroundColor: "#fff500"}}
            >
            <FlexBox
              alignItems="flex-end"
              justifyContent="center"
              style={styles.box}
            >
              <Button style={{width: "80%", height: 50, backgroundColor: "#a0a0a0", marginBottom: 30}} onPress={() => this.setState({modalRule: false})}>BACK</Button>
              </FlexBox>
            </ImageBackground>
          </Modal>
      </ImageBackground>
    );
  }
}
