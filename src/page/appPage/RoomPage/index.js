import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Page, FlexBox, Heading, Button } from "Neutronium/src/components"
import { ListGroup, ListGroupItem } from "Neutronium/src/components/listGroup"

import styles from "./styles"

export default class extends React.Component {

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <View>

          {/* 競技選択は書いてません */}
          
          <FlexBox
            flexWrap
            alignItems="center"
            justifyContent="center"
          >
            <Heading size="xsmall" align="center">member</Heading>
            <Button
              size="small" 
              type="info" 
              onPress={() => undefined} 
              outline
            >
              ?
            </Button>
          </FlexBox>
          <ListGroup>
            <ListGroupItem>member 1</ListGroupItem>
            <ListGroupItem>member 2</ListGroupItem>
            <ListGroupItem>member 3</ListGroupItem>
            <ListGroupItem>member 4</ListGroupItem>
            <ListGroupItem>member 5</ListGroupItem>
          </ListGroup>
          <Button
            type="primary"
            onPress={() => undefined}
            size="large"
          >
            Ready
          </Button>
        </View>
      </Page>
    );
  }
}
