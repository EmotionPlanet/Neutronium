import React from "react"
import { Text, View } from "react-native"
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
              users: Object.entries(val.users).map(([i, v]) => ({
                id: i,
                ...v,
              }))
            }

            if (room.users.length >= 2 && room.users.every(x => x.is_ready)) {
              await firebase.database().ref('rooms/' + roomName ).update({is_start: true})
              Actions.gameScreenPage()
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
      <FlexBox
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        flexWrap
        style={styles.box}
      >
        <View style={styles.slider}>
          <Text>スライダー</Text>
        </View>
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
          style={styles.body}
        >
          <Heading size="xsmall" align="center">member</Heading>
          {/*<Button*/}
          {/*size="small"*/}
          {/*type="info"*/}
          {/*onPress={() => Actions.rulePage()}*/}
          {/*outline*/}
          {/*style={styles.info}*/}
          {/*>*/}
          {/*?*/}
          {/*</Button>*/}
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
          type={(this.state.room && this.state.room.users.find(x => x.id == myId) || {} ).is_ready ? "primary" : "success"}
          onPress={async () => {
            await firebase.database().ref('rooms/' + roomName + "/users/" + myId ).update({
              is_ready: !( (this.state.room && this.state.room.users.find(x => x.id == myId) || {} ).is_ready )
            })
          }}
          size="large"
          style={styles.ready}
        >
          Ready
        </Button>
      </FlexBox>
    );
  }
}
