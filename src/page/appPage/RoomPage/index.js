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
      room: undefined
    })
  }

  componentDidMount() {
    (async() => {
      const {
        roomName
      } = this.props

      await firebase.database().ref('rooms/' + roomName ).on('value', snapshot => {
        const val = snapshot.val()
        
        this.setState({
          room: {
            ...val,
            users: Object.entries(val.users).map(([i, v]) => ({
              id: i,
              ...v,
            }))
          }
        })
      });

    })()
  }

  componentWillUnmount() {
    (async() => {
      
      const {
        roomName
      } = this.props

      await firebase.database().ref('rooms/' + roomName ).off()
    })
  }

  render() {

    console.log(this.state.room)
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
              onPress={() => undefined} 
              outline
            >
              ?
            </Button>
          </FlexBox>
          <ListGroup>
            {this.state.room && this.state.room.users.map(user => 
              <ListGroupItem
                key={user.id}
              >
                {user.name}
              </ListGroupItem>
            )}
          </ListGroup>
          <Button
            type="primary"
            onPress={() => undefined}
            size="large"
          >
            Ready
          </Button>
        </View>
      </Page>
    );
  }
}
