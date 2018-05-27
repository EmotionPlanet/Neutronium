import React from "react"
import { Text, View, ImageBackground } from "react-native"
import resultImage from "Neutronium/assets/images/result.png"
import { Actions } from "react-native-router-flux"
import { FlexBox, Button, Image, Heading } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <ImageBackground
        source={resultImage}
        style={{width: "100%", height: "100%"}}
      >
        <FlexBox
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Heading 
            size="medium" 
            align="center"
            style={styles.label}
          >
            member
          </Heading>
          <Button
            type="primary" 
            japanese="ture"
            style={styles.submit}
            onPress={() => Actions.roomPage()}
          >
            ROOMへ戻る
          </Button>
        </FlexBox>
      </ImageBackground>
    );
  }
}