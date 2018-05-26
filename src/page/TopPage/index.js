import React from "react"
import { Text, View, AsyncStorage } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, Button, Heading, Avatar, FlexBox, Switch, TextInput } from "Neutronium/src/components"
import { ListGroup, ListGroupItem } from "Neutronium/src/components/listGroup"
import avatarImage from "Neutronium/assets/images/avatar.jpg"
import { AccelerometerApiPage, LocationApiPage } from "Neutronium/src/page/expoApiComponents"

import styles from "./styles"

export default class extends React.Component {
  componentWillMount() {
    this.setState({
      name: ""
    })
  }

  componentDidMount() {
    (async () => {
      try {
        const name = await AsyncStorage.getItem("name");
        if (name)
          this.setState({name})
      } catch (e) {
        
      }
    })()
  }

  render() {
    return (
      <FlexBox
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      > 
        <FlexBox
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          style={styles.host}
        >
          <View>
            <Heading size="xlarge" align="center" style={styles.title} >No Ball!</Heading>
          </View>
          <View style={styles.container}>
            <TextInput
              type="primary"
              defaultValue={this.state.name}
              style={styles.input}
              placeholder="ユーザー名"
              onChangeText={name => this.setState({name})}
            />
            <Button
              type="primary"
              size="large"
              style={styles.submit}
              disabled={!(this.state.name.length > 1)}
              onPress={async () => {
                if (this.state.name.length > 1) {
                  await AsyncStorage.setItem("name", this.state.name)
                  Actions.makeroomPage()
                }
              }}
            >
              START
            </Button>
          </View>
        </FlexBox>
      </FlexBox>
    );
  }
}
