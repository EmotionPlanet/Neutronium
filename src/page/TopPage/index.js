import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, Button, Heading, Avatar, FlexBox, Switch, TextInput } from "Neutronium/src/components"
import { ListGroup, ListGroupItem } from "Neutronium/src/components/listGroup"
import avatarImage from "Neutronium/assets/images/avatar.jpg"

import styles from "./styles"

export default class extends React.Component {
  componentWillMount() {
    this.setState({
      switch1Enabled: false,
      switch2Enabled: false,
    })
  }

  render() {
    return (
      <Page> 
        <FlexBox
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          style={styles.host}
        >
          <View>
            <Heading size="large" align="center" style={styles.title} >No Ball!</Heading>
          </View>
          <View>
            <TextInput type="primary" style={styles.input} placeholder="ユーザー名"/>
            <Button type="primary" size="large" style={styles.submit} onPress={() => undefined}>START</Button>     
          </View>
        </FlexBox>
      </Page>
    );
  }
}
