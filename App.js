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
  MagnetometerApiPage,
} from "Neutronium/src/page/expoApiComponents"

import {
  VisionApiPage
} from "Neutronium/src/page/googleCloudApiComponents"

import {
  MakeRoomPage,
  RoomPage,
  RulePage,
  GameScreenPage,
  GameSetPage,
  ResultPage,
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
        "AlfaSlabOne-Regular" : require("./assets/fonts/AlfaSlabOne-Regular.ttf")
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
      <Router
        navigationBarStyle={{ backgroundColor: 'black' }}
        titleStyle={{color: 'white'}}
      >
        <Scene key="root">
          <Scene
            key="topPage"
            component={TopPage}
            title=" "
            // initial={true}
          />

          {/* Expo Api */}
          <Scene
            key="cameraApiPage"
            component={CameraApiPage}
            title=" "
          />
          <Scene
            key="iconApiPage"
            component={IconApiPage}
            title="icon-api-page"
          />
          <Scene
            key="imagePickerApiPage"
            component={ImagePickerApiPage}
            title=" "
          />
          <Scene
            key="notificationApiPage"
            component={NotificationApiPage}
            title=" "
          />
          <Scene
            key="speechApiPage"
            component={SpeechApiPage}
            title=" "
          />
          <Scene
            key="accelerometerApiPage"
            component={AccelerometerApiPage}
            title="　"
          />
          <Scene
            key="locationApiPage"
            component={LocationApiPage}
            title="　"
          />
          <Scene
            key="magnetometerApiPage"
            component={MagnetometerApiPage}
            title="　"
          />

          {/* appPage */}
          <Scene 
            key="makeroomPage"
            component={MakeRoomPage}
            title="　"
          />
          <Scene
            key="roomPage"
            component={RoomPage}
            title="　"
          />
         <Scene
            key="rulePage"
            component={RulePage}
            title="　"
          />
          <Scene
            key="gameScreenPage"
            component={GameScreenPage}
            title="　"
          />
          <Scene
            key="gameSetPage"
            component={GameSetPage}
            title="　"
          />
          <Scene
            key="resultPage"
            component={ResultPage}
            title=" "
          />
        </Scene>
        
      </Router>
    );
  }
}
