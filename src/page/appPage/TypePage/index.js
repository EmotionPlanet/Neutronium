import React from "react"
import { Text, View, Image, Animated, ScrollView } from "react-native"
import { Heading, Page, AnimatedSpin, AnimatedFade, AnimatedMove, FlexBox } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {

  componentWillMount() {
    this.setState({
      spinDuration: 1000,
      fadeDuration: 2000,
      moveDuration: 1000,
    })
  }

  render() {
    return (
      <Page
        style={styles.host}
      >
        <ScrollView>
        </ScrollView>
      </Page>
    );
  }
}
