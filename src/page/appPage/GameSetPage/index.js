import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, Button, Image, FlexBox } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <FlexBox
        alignItems="center"
        justifyContent="center"
      >
        <View
          style={styles.view}
        >
          {/* 「GAMESET」という画像がきます */}
          <Image
            uri="http://placehold.jp/300x300.png?text=xlarge"
            style={styles.image}
          />

          {/* のちのち消すよ */}
          <Button
            type="dark" 
            onPress={() => Actions.resultPage()}
          >
            (仮)resultに遷移
          </Button>
        </View>
      </FlexBox>
    );
  }
}
