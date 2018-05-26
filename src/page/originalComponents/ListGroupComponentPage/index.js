import React from "react"
import { Text, View } from "react-native"
import { Actions } from "react-native-router-flux"
import { Alert, Button, Heading, Page } from "Neutronium/src/components"
import { ListGroup, ListGroupItem } from "Neutronium/src/components/listGroup"

import styles from "./styles"

export default class extends React.Component {
  componentWillMount() {
    this.setState({
      selectedIndex: 0
    })
  }
  render() {
    return (
      <Page
        style={styles.host}
        {...this.props}
      >
        <Heading>ListGroup</Heading>
        <View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Standard</Heading>
            <ListGroup>
              <ListGroupItem>Ludwig van Beethoven</ListGroupItem>
              <ListGroupItem>Johann Sebastian Bach</ListGroupItem>
              <ListGroupItem>Johannes Brahms</ListGroupItem>
              <ListGroupItem>Franz Joseph Haydn</ListGroupItem>
              <ListGroupItem>Frédéric François Chopin</ListGroupItem>
              <ListGroupItem>Antonio Lucio Vivaldi</ListGroupItem>
            </ListGroup>
          </View>
        </View>
        <View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">(Active || Disabled) Item</Heading>
            <ListGroup>
              <ListGroupItem active>Ludwig van Beethoven (active)</ListGroupItem>
              <ListGroupItem>Johann Sebastian Bach</ListGroupItem>
              <ListGroupItem disabled>Johannes Brahms(disabled)</ListGroupItem>
              <ListGroupItem>Franz Joseph Haydn</ListGroupItem>
              <ListGroupItem active>Frédéric François Chopin(active)</ListGroupItem>
              <ListGroupItem disabled>Antonio Lucio Vivaldi(disabled)</ListGroupItem>
            </ListGroup>
          </View>
        </View>
        <View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Press Highlight</Heading>
            <ListGroup>
              <ListGroupItem onPress={() => undefined}>Ludwig van Beethoven</ListGroupItem>
              <ListGroupItem onPress={() => undefined}>Johann Sebastian Bach</ListGroupItem>
              <ListGroupItem onPress={() => undefined}>Johannes Brahms</ListGroupItem>
              <ListGroupItem onPress={() => undefined}>Franz Joseph Haydn</ListGroupItem>
              <ListGroupItem onPress={() => undefined}>Frédéric François Chopin</ListGroupItem>
              <ListGroupItem onPress={() => undefined}>Antonio Lucio Vivaldi</ListGroupItem>
            </ListGroup>
          </View>
        </View>
        <View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Contextual</Heading>
            <ListGroup>
              <ListGroupItem type="primary" onPress={() => undefined}>Ludwig van Beethoven</ListGroupItem>
              <ListGroupItem type="secondary" onPress={() => undefined}>Johann Sebastian Bach</ListGroupItem>
              <ListGroupItem type="success" onPress={() => undefined}>Johannes Brahms</ListGroupItem>
              <ListGroupItem type="danger" onPress={() => undefined}>Franz Joseph Haydn</ListGroupItem>
              <ListGroupItem type="warning" onPress={() => undefined}>Frédéric François Chopin</ListGroupItem>
              <ListGroupItem type="info" onPress={() => undefined}>Antonio Lucio Vivaldi</ListGroupItem>
              <ListGroupItem type="light" onPress={() => undefined}>Wolfgang Amadeus Mozart</ListGroupItem>
              <ListGroupItem type="dark" onPress={() => undefined}>Georg Friedrich Händel</ListGroupItem>
            </ListGroup>
          </View>
        </View>
        <View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Widh Badge</Heading>
            <ListGroup>
              <ListGroupItem badgeText="1">Пётр Ильич Чайковский</ListGroupItem>
              <ListGroupItem type="primary"   badgeText="1">Ludwig van Beethoven</ListGroupItem>
              <ListGroupItem type="secondary" badgeText="10">Johann Sebastian Bach</ListGroupItem>
              <ListGroupItem type="success"   badgeText="100">Johannes Brahms</ListGroupItem>
              <ListGroupItem type="danger"    badgeText="new">Franz Joseph Haydn</ListGroupItem>
              <ListGroupItem type="warning"   badgeText="test">Frédéric François Chopin</ListGroupItem>
              <ListGroupItem type="info"      badgeText="notfy">Antonio Lucio Vivaldi</ListGroupItem>
              <ListGroupItem type="light"     badgeText="sample">Wolfgang Amadeus Mozart</ListGroupItem>
              <ListGroupItem type="dark"      badgeText="badge">Georg Friedrich Händel</ListGroupItem>
            </ListGroup>
          </View>
        </View>
        <View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Japanese</Heading>
            <ListGroup>
              <ListGroupItem badgeText="1"    badgeText="新潮">百年泥</ListGroupItem>
              <ListGroupItem type="primary"   badgeText="文藝">おらおらでひとりいぐも</ListGroupItem>
              <ListGroupItem type="secondary" badgeText="文學界">影裏（えいり）</ListGroupItem>
              <ListGroupItem type="success"   badgeText="新潮">しんせかい</ListGroupItem>
              <ListGroupItem type="danger"    badgeText="文學界">コンビニ人間</ListGroupItem>
              <ListGroupItem type="warning"   badgeText="群像">異類婚姻譚（いるいこんいんたん）</ListGroupItem>
              <ListGroupItem type="info"      badgeText="文學界">死んでいない者</ListGroupItem>
              <ListGroupItem type="light"     badgeText="文學界">火花</ListGroupItem>
              <ListGroupItem type="dark"      badgeText="文學界">スクラップ・アンド・ビルド</ListGroupItem>
            </ListGroup>
          </View>
        </View>
        <View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Custom content</Heading>
            <Alert>
              すごい人がきっと作ってくれる。{'\n'}
              しらんけど
            </Alert>
          </View>
        </View>
        <View>
          <View
            style={styles.content}
          >
            <Heading size="xsmall" align="center">Select Item</Heading>
            <ListGroup
              selectedIndex={this.state.selectedIndex}
            >
              <ListGroupItem onPress={() => this.setState({selectedIndex: 0})}>Ludwig van Beethoven</ListGroupItem>
              <ListGroupItem onPress={() => this.setState({selectedIndex: 1})}>Johann Sebastian Bach</ListGroupItem>
              <ListGroupItem onPress={() => this.setState({selectedIndex: 2})}>Johannes Brahms</ListGroupItem>
              <ListGroupItem onPress={() => this.setState({selectedIndex: 3})}>Franz Joseph Haydn</ListGroupItem>
              <ListGroupItem onPress={() => this.setState({selectedIndex: 4})}>Frédéric François Chopin</ListGroupItem>
              <ListGroupItem onPress={() => this.setState({selectedIndex: 5})}>Antonio Lucio Vivaldi</ListGroupItem>
            </ListGroup>
          </View>
        </View>
      </Page>
    );
  }
}
