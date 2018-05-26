import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, FlexBox, Heading, Button } from "Neutronium/src/components"
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

      console.log(props)

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
      <Page
        style={styles.host}
        {...this.props}
      >
        <View>

          {/* 競技選択は書いてません */}
          
          <FlexBox
            flexWrap
            alignItems="center"
            justifyContent="center"
          >
            <Heading size="xsmall" align="center">member</Heading>
            <Button
              size="small" 
              type="info" 
              onPress={() => Actions.rulePage()} 
              outline
            >
              ?
            </Button>
          </FlexBox>
          <ListGroup>
            {this.state.room && this.state.room.users.map(user => 
              <ListGroupItem
                key={user.id}
                badgeText={user.is_ready ? "準備完了!" : "準備中"}
              >
                {user.name}
              </ListGroupItem>
            )}
          </ListGroup>
          <Button
            type={(this.state.room && this.state.room.users.find(x => x.id == myId) || {} ).is_ready ? "primary" : "success"}
            onPress={async () => {
              await firebase.database().ref('rooms/' + roomName + "/users/" + myId ).update({
                is_ready: !( (this.state.room && this.state.room.users.find(x => x.id == myId) || {} ).is_ready )
              })
            }}
            size="large"
          >
            Ready
          </Button>
        </View>
      </Page>
    );
  }
}
