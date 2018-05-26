import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, FlexBox, Heading, Button } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <View>
          <Heading size="medium" align="center">ボールを持っているのは</Heading>
          <Heading size="medium" align="center">北邑メンバー</Heading>

          {/* のちのち消すよ */}
          <Button
            type="dark" 
            onPress={() => undefined}
          >
            (仮)GAMESETに遷移
          </Button>
        </View>
      </Page>
    );
  }
}
