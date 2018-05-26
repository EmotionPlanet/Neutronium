import React from "react"
import { Text, View, AsyncStorage, Dimensions } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, Button, Heading, Avatar, FlexBox, Switch, TextInput } from "Neutronium/src/components"
import { ListGroup, ListGroupItem } from "Neutronium/src/components/listGroup"
import avatarImage from "Neutronium/assets/images/avatar.jpg"
import { AccelerometerApiPage } from "Neutronium/src/page/expoApiComponents"

import styles from "./styles"

export default class extends React.Component {
  componentWillMount() {
    this.setState({
      name: "",
      deviceWidth: Dimensions.get('window').width
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
    const { deviceWidth } = this.state;

    return (
      <FlexBox
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{
          width: deviceWidth,
          ...styles.host
        }}
        {...this.props}
      >
        <FlexBox
          alignItems="center"
          justifyContent="space-around"
        >
          <View style={styles.view}>
            <Heading size="xlarge" align="center" style={styles.title} >No Ball!</Heading>
          </View>
        </FlexBox>
        <FlexBox
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={styles.box}
        >
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
        </FlexBox>
      </FlexBox>
    );
  }
}
