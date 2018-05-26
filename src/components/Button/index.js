import React from "react";
import { TouchableHighlight, View, Text, Platform } from "react-native";
import { Button as BaseButton } from "react-native-elements";
import Flex from "./../FlexBox"
import { commons, types, sizes } from "./style";

export default class extends React.Component {
  
  componentWillMount() {
    this.setState({
      isShowUnderlay: false
    })
  }
  
  render() {
    const {
      children,
      outline = false,
      size = "medium", // small medium large
      type = "primary", // primary secondary success danger warning info light dark
      disabled = false,
      style = {},
      textStyle = {},
      disabledStyle = {},
      Component = disabled ? View : TouchableHighlight,
      japanese = false,
      ...props
    } = this.props;

    return (
      <Component
        style={[
          commons.button,
          types.button[type],
          sizes.button[size],
          (
            disabled ? commons.disabledButton : {}
          ),
          (
            outline ? {backgroundColor: "transparent"} : {}
          ),
          (
            Platform.OS == "ios" && japanese ? {
              paddingBottom: sizes.button[size].paddingBottom - 4,
              paddingTop   : sizes.button[size].paddingTop + 4
            }                    : {}
          ),
          style
        ]}
        underlayColor={!disabled && types.underlayColor[type]}
        onShowUnderlay={() => this.setState({isShowUnderlay: true})}
        onHideUnderlay={() => this.setState({isShowUnderlay: false})}
        {...props}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            ...commons.text,
            ...types.text[type],
            ...sizes.text[size],
            ...(
              outline && !this.state.isShowUnderlay ? types.outlineText[type] : {}
            ),
            ...textStyle,
          }}
        >
          {children}
        </Text>
      </Component>
    )
  }
}
