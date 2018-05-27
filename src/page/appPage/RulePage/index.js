import React from "react"
import { Text, View, ImageBackground } from "react-native"
import background from "Neutronium/assets/images/background.png"
import { Actions } from "react-native-router-flux"
import { Button, Page, Image } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  render() {
    return (
      <ImageBackground
        source={background}
        style={{width: "100%", height: "100%", backgroundColor: "#fff500"}}
      >
        <Page
          style={styles.host}
          {...this.props}
        >
          <View>
            <Image
              uri="https://www.nintendo.co.jp/n02/dmg/vua/rule/t_01.gif"
            />
            <Image
              uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsTXX0ymYjn3DJb0QH1vaWaTykfkJa-NxbGA7VZUFGjjiqDceq"
            />

            {/* 画像をスワイプで回すのを書くところ。三つくらい下に点 */}

            <Button
              type="primary"
              onPress={() => Actions.roomPage()}
              size="large"
              style={{
                lineHeight: 10
              }}
            >
              Back
            </Button>
          </View>
        </Page>
      </ImageBackground>
    );
  }
}
