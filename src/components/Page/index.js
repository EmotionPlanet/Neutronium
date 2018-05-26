import React from "react";
import { ScrollView, ImageBackground } from "react-native";
import background from "Neutronium/assets/images/background.png"
import { commons } from "./style"

export default ({
  children,
  style = {},
  ...props
}) =>
  <ScrollView
    style={[
      commons.host,
      style
    ]}
    {...props}
  >
    <ImageBackground
      source={background}
    >
      {children}
    </ImageBackground>
  </ScrollView>
