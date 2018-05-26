import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Button, Heading, Page, FlexBox } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <FlexBox
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          style={styles.host}
      >
        <View>
          <Button type="primary" size="large" style={styles.submit} onPress={() => undefined}>HOST</Button>
          <Button type="primary" size="large" style={styles.submit} onPress={() => undefined}>GUEST</Button>
        </View>
      </FlexBox>
    );
  }
}
