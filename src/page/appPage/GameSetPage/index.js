import React from "react"
import { Text, View, ImageBackground } from "react-native"
import gameSetImage from "Neutronium/assets/images/gameset.png"
import { Actions } from "react-native-router-flux"
import { Page, Button, Image, FlexBox } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <ImageBackground
        source={gameSetImage}
        style={{width: "100%", height: "100%"}}
      >
        <FlexBox
          alignItems="center"
          justifyContent="center"
        >
          <View
            style={styles.view}
          >

            {/* のちのち消すよ */}
            <Button
              type="dark" 
              onPress={() => Actions.resultPage()}
            >
              (仮)resultに遷移
            </Button>
          </View>
        </FlexBox>
      </ImageBackground>
    );
  }
}
