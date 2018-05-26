import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Avatar, Button, Page, FlexBox, TextInput } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <FlexBox
          alignItems="center"
          justifyContent="space-around"
        >
          <View>
            <Avatar
              size="xlarge"
              rounded={false}
              uri="http://placehold.jp/300x300.png?text=xlarge"
            />
          </View>
        </FlexBox>

        <View>
          <TextInput type="primary" />
          <Button type="primary" size="large" style={styles.submit} onPress={() => Actions.roomPage()}>OK</Button>
        </View>
      </Page>
    );
  }
}
