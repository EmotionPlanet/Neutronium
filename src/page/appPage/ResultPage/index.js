import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, Button, Image, Heading } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <View>
          {/* 「LOSE」or「WIN」という画像がきます */}
          <Image
            uri="http://placehold.jp/300x300.png?text=xlarge"
          />
          <Heading size="medium" align="center">member</Heading>
          <Button
            type="primary" 
            onPress={() => Actions.roomPage()}
          >
            roomへ戻る
          </Button>
        </View>
      </Page>
    );
  }
}