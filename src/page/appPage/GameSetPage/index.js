import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, Button, Image } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <View>
          {/* 「GAMESET」という画像がきます */}
          <Image
            uri="http://placehold.jp/300x300.png?text=xlarge"
          />

          {/* のちのち消すよ */}
          <Button
            type="dark" 
            onPress={() => undefined}
          >
            (仮)resultに遷移
          </Button>
        </View>
      </Page>
    );
  }
}
