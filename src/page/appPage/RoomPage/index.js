import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, FlexBox, Heading, Button } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <View>
          <FlexBox
            flexWrap
            alignItems="center"
            justifyContent="center"
          >
            <Heading size="xsmall" align="center">member</Heading>
            <Button size="small" type="info" onPress={() => undefined} outline>?</Button>
          </FlexBox>
        </View>

        <View>
          
        </View>
      </Page>
    );
  }
}
