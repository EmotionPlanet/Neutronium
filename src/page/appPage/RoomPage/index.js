import React from "react"
import { Text, View, ImageBackground } from "react-native"
import background from "Neutronium/assets/images/background.png"
import { Actions } from "react-native-router-flux"
import { Page, FlexBox, Heading, Button, TextInput } from "Neutronium/src/components"
import { ListGroup, ListGroupItem } from "Neutronium/src/components/listGroup"
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
        style={{width: "100%", height: "100%"}}
      >
        <View style={styles.slider}>
          <Text>スライダー</Text>
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
            onPress={() => Actions.rulePage()}
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
            <Heading
              size="xlarge"
              align="center"
              style={{backgroundColor: '#000',}}
            >
              member
            </Heading>
            <ListGroup style={styles.list}>
              {this.state.room && this.state.room.users.map(user =>
                <ListGroupItem
                  key={user.id}
                  badgeText={user.is_ready ? "準備完了!" : "準備中"}
                  style={{
                    margin: 8,
                    minHeight: 50,
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
      </ImageBackground>
    );
  }
}
