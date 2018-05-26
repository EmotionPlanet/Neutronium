import React from "react"
import { Text, View, AsyncStorage, Dimensions, AppState } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, Button, Heading, Avatar, FlexBox, Switch, TextInput, Modal, Image } from "Neutronium/src/components"
import { ListGroup, ListGroupItem } from "Neutronium/src/components/listGroup"
import avatarImage from "Neutronium/assets/images/avatar.jpg"
import { AccelerometerApiPage } from "Neutronium/src/page/expoApiComponents"

import styles from "./styles"

export default class extends React.Component {
  componentWillMount() {
    this.setState({
      name: "",
      deviceWidth: Dimensions.get('window').width,
      modal1Visible: false,
    })

    AppState.addEventListener('change', this._handleAppStateChange);
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
            <Button
              onPress={() => this.setState({modal1Visible: true})}
            >
             ?
            </Button>
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
        <Modal
          visible={this.state.modal1Visible}
          type="none"
        >
          <Image
              style={styles.titleImage}
              uri="http://placehold.jp/300x300.png?text=small"
          />
          <Image
              style={styles.image}
              uri="http://placehold.jp/300x300.png?text=xlarge"
          />
          <Button onPress={() => this.setState({modal1Visible: false})}>Back</Button>
        </Modal>
      </FlexBox>
    );
  }
}
