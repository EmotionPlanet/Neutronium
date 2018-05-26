import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Badge, Heading, Page, FlexBox } from "Neutronium/src/components"

import styles from "./styles"

export default class extends React.Component {
  render() {
    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <Heading>Badges</Heading>
        <View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Standard</Heading>
            <FlexBox
              flexWrap
              alignItems="center"
              justifyContent="center"
              style={styles.badgeList}
            >
              <Badge type="primary"  >primary</Badge>
              <Badge type="secondary">secondary</Badge>
              <Badge type="success"  >success</Badge>
              <Badge type="danger"   >danger</Badge>
              <Badge type="warning"  >warning</Badge>
              <Badge type="info"     >info</Badge>
              <Badge type="light"    >light</Badge>
              <Badge type="dark"     >dark</Badge>
            </FlexBox>
          </View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Pill Type</Heading>
            <FlexBox
              flexWrap
              alignItems="center"
              justifyContent="center"
              style={styles.badgeList}
            >
              <Badge pill type="primary"  >primary</Badge>
              <Badge pill type="secondary">secondary</Badge>
              <Badge pill type="success"  >success</Badge>
              <Badge pill type="danger"   >danger</Badge>
              <Badge pill type="warning"  >warning</Badge>
              <Badge pill type="info"     >info</Badge>
              <Badge pill type="light"    >light</Badge>
              <Badge pill type="dark"     >dark</Badge>
            </FlexBox>
          </View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Press Highlight</Heading>
            <FlexBox
              flexWrap
              alignItems="center"
              justifyContent="center"
              style={styles.badgeList}
            >
              <Badge pill type="primary"   onPress={() => undefined}>primary</Badge>
              <Badge pill type="secondary" onPress={() => undefined}>secondary</Badge>
              <Badge pill type="success"   onPress={() => undefined}>success</Badge>
              <Badge pill type="danger"    onPress={() => undefined}>danger</Badge>
              <Badge pill type="warning"   onPress={() => undefined}>warning</Badge>
              <Badge pill type="info"      onPress={() => undefined}>info</Badge>
              <Badge pill type="light"     onPress={() => undefined}>light</Badge>
              <Badge pill type="dark"      onPress={() => undefined}>dark</Badge>
            </FlexBox>
          </View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Japanese</Heading>
            <FlexBox
              flexWrap
              alignItems="center"
              justifyContent="center"
              style={styles.badgeList}
            >
              <Badge type="primary"  >石井遊佳</Badge>
              <Badge type="secondary">若竹千佐子</Badge>
              <Badge type="success"  >沼田真佑</Badge>
              <Badge type="danger"   >山下澄人</Badge>
              <Badge type="warning"  >村田沙耶香</Badge>
              <Badge type="info"     >本谷有希子</Badge>
              <Badge type="light"    >滝口悠生</Badge>
              <Badge type="dark"     >又吉直樹</Badge>
            </FlexBox>
          </View>
        </View>
      </Page>
    );
  }
}
