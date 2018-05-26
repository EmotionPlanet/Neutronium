import React             from "react";
import { Router, Scene } from "react-native-router-flux";
import { Font }          from "expo";
import ApiClientPage     from "Neutronium/src/page/ApiClientPage";
import ColorListPage     from "Neutronium/src/page/ColorListPage";
import TopPage           from "Neutronium/src/page/TopPage";
import {
  AlertComponentPage,
  AvatarComponentPage,
  BadgeComponentPage,
  ButtonComponentPage,
  ButtonGroupComponentPage,
  CheckboxComponentPage,
  DropdownComponentPage,
  ExpansionPanelComponentPage,
  ModalComponentPage,
  HeadingComponentPage,
  ListGroupComponentPage,
  SliderComponentPage,
  SwitchComponentPage,
  TextInputComponentPage,
  AnimatedComponentPage,
} from "Neutronium/src/page/originalComponents";

import {
  CameraApiPage,
  IconApiPage,
  ImagePickerApiPage,
  NotificationApiPage,
  SpeechApiPage,
  AccelerometerApiPage,
  LocationApiPage,
} from "Neutronium/src/page/expoApiComponents"

import {
  VisionApiPage
} from "Neutronium/src/page/googleCloudApiComponents"

import {
  TypePage,
  MakeRoomPage,
  RoomPage,
  RulePage,
  GameScreenPage,
  GameSetPage
} from "Neutronium/src/page/appPage"

import * as firebase from 'firebase';

export default class extends React.Component {

  componentWillMount() {
    this.setState({
      fontLoaded: false
    })
  }

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        "Nunito-Regular"      : require("./assets/fonts/Nunito-Regular.ttf"),
        "Nunito-Italic"       : require("./assets/fonts/Nunito-Italic.ttf"),
        "Nunito-Bold"         : require("./assets/fonts/Nunito-Bold.ttf"),
        "Nunito-SemiBold"     : require("./assets/fonts/Nunito-SemiBold.ttf"),
      });

      firebase.initializeApp({
        apiKey: "AIzaSyBFZCCBBpqSZzC9VUzMVza7Mp5BSYF_LYU",
        authDomain: "spajam-armageddon.firebaseapp.com",
        databaseURL: "https://spajam-armageddon.firebaseio.com",
        projectId: "spajam-armageddon",
        storageBucket: "spajam-armageddon.appspot.com",
        messagingSenderId: "916231197545"
      });

      this.setState({
        fontLoaded: true
      })
    })()
  }

  render() {

    if (!this.state.fontLoaded)
      return null

    return (
      <Router>
        <Scene key="root">
          <Scene
            key="topPage"
            component={TopPage}
            title="top-page"
            // initial={true}
          />

          {/* Expo Api */}
          <Scene
            key="cameraApiPage"
            component={CameraApiPage}
            title="camera-api-page"
          />
          <Scene
            key="iconApiPage"
            component={IconApiPage}
            title="icon-api-page"
          />
          <Scene
            key="imagePickerApiPage"
            component={ImagePickerApiPage}
            title="image-picker-api-page"
          />
          <Scene
            key="notificationApiPage"
            component={NotificationApiPage}
            title="notification-api-page"
          />
          <Scene
            key="speechApiPage"
            component={SpeechApiPage}
            title="speech-api-page"
          />
          <Scene
            key="accelerometerApiPage"
            component={AccelerometerApiPage}
            title="accelerometer-api-page"
          />
          <Scene
            key="locationApiPage"
            component={LocationApiPage}
            title="location-api-page"
          />

          {/* appPage */}
          <Scene 
            key="typePage"
            component={TypePage}
            title="type-page"
          />
          <Scene 
            key="makeroomPage"
            component={MakeRoomPage}
            title="make-room-page"
          />
          <Scene
            key="roomPage"
            component={RoomPage}
            title="room-page"
          />
         <Scene
            key="rulePage"
            component={RulePage}
            title="rule-page"
          />
          <Scene
            key="gameScreenPage"
            component={GameScreenPage}
            title="game-screen-page"
          />
          <Scene
            key="gameSetPage"
            component={GameSetPage}
            title="game-set-page"
          />
        </Scene>
        
      </Router>
    );
  }
}
