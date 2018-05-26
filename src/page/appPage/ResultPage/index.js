import React from "react"
import { Text, View, ImageBackground } from "react-native"
import background from "Neutronium/assets/images/background.png"
import { Actions } from "react-native-router-flux"
import { FlexBox, Button, Image, Heading } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <ImageBackground
        source={background}
        style={{width: "100%", height: "100%"}}
      >
        <FlexBox
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <FlexBox
            alignItems="center"
            justifyContent="space-around"
          >
            <View style={styles.view}>
              {/* 「LOSE」or「WIN」という画像がきます */}
              <Image
                uri="http://placehold.jp/300x300.png?text=xlarge"
                style={styles.image}
              />
            </View>
          </FlexBox>
          <FlexBox
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Heading size="medium" align="center">member</Heading>
          </FlexBox>
          <FlexBox
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            style={styles.box}
          >
            <Button
              type="primary" 
              japanese="ture"
              style={styles.submit}
              onPress={() => Actions.roomPage()}
            >
              ROOMへ戻る
            </Button>
          </FlexBox>
        </FlexBox>
      </ImageBackground>
    );
  }
}