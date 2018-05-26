import React from "react"
import {Text, View, Image, Animated, ScrollView} from "react-native"
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
          <Heading>Animated</Heading>
          <FlexBox
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            style={styles.view}
          >
            <Heading size={'small'}>Spin</Heading>
            <AnimatedSpin
              style={styles.animated}
              defaultSpinDuration = {this.state.spinDuration}
            >
              <Image
                source={{uri: 'https://cdn-images-1.medium.com/max/1600/1*qUlxDdY3T-rDtJ4LhLGkEg.png'}}
                style={styles.image}
              />
            </AnimatedSpin>
            <Heading size={'small'}>FadeIn</Heading>
            <AnimatedFade
              style={styles.animated}
              defaultFadeDuration = {this.state.fadeDuration}
            >
              <Image
                source={{uri: 'https://cdn-images-1.medium.com/max/1600/1*qUlxDdY3T-rDtJ4LhLGkEg.png'}}
                style={styles.image}
              />
            </AnimatedFade>
            <Heading size={'small'}>Move</Heading>
            <AnimatedMove
              style={styles.animated}
              defaultMoveDuration = {this.state.moveDuration}
            >
              <Image
                source={{uri: 'https://cdn-images-1.medium.com/max/1600/1*qUlxDdY3T-rDtJ4LhLGkEg.png'}}
                style={styles.image}
              />
            </AnimatedMove>
          </FlexBox>
        </ScrollView>
      </Page>
    );
  }
}
