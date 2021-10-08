import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  DeviceEventEmitter,
  Dimensions,
  Easing,
  Modal as ReactNativeModal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const MODAL_ANIM_DURATION = 300;
const MODAL_BACKDROP_OPACITY = 0.4;

export class Modal extends Component {
  static propTypes = {
    onBackdropPress: PropTypes.func,
    onHide: PropTypes.func,
    isVisible: PropTypes.bool,
    contentStyle: PropTypes.any,
  };

  static defaultProps = {
    onBackdropPress: () => null,
    onHide: () => null,
    isVisible: false,
  };

  state = {
    isVisible: this.props.isVisible,
    deviceWidth: Dimensions.get("window").width,
    deviceHeight: Dimensions.get("window").height,
  };

  animVal = new Animated.Value(0);
  _isMounted = false;

  static _deviceEventEmitter = null;

  componentDidMount() {
    this._isMounted = true;
    if (this.state.isVisible) {
      this.show();
    }
    this._deviceEventEmitter = DeviceEventEmitter.addListener(
      "didUpdateDimensions",
      this.handleDimensionsUpdate
    );
  }

  componentWillUnmount() {
    this._deviceEventEmitter.remove();
    this._isMounted = false;
  }

  componentDidUpdate(prevProps: ModalPropsType) {
    if (this.props.isVisible && !prevProps.isVisible) {
      this.show();
    } else if (!this.props.isVisible && prevProps.isVisible) {
      this.hide();
    }
  }

  handleDimensionsUpdate = (dimensionsUpdate) => {
    const deviceWidth = dimensionsUpdate.window.width;
    const deviceHeight = dimensionsUpdate.window.height;
    if (
      deviceWidth !== this.state.deviceWidth ||
      deviceHeight !== this.state.deviceHeight
    ) {
      this.setState({ deviceWidth, deviceHeight });
    }
  };

  show = () => {
    this.setState({ isVisible: true });
    Animated.timing(this.animVal, {
      easing: Easing.inOut(Easing.quad),
      // Using native driver in the modal makes the content flash
      useNativeDriver: false,
      duration: MODAL_ANIM_DURATION,
      toValue: 1,
    }).start();
  };

  hide = () => {
    Animated.timing(this.animVal, {
      easing: Easing.inOut(Easing.quad),
      // Using native driver in the modal makes the content flash
      useNativeDriver: false,
      duration: MODAL_ANIM_DURATION,
      toValue: 0,
    }).start(() => {
      if (this._isMounted) {
        this.setState({ isVisible: false }, this.props.onHide);
      }
    });
  };

  render() {
    const {
      children,
      onBackdropPress,
      contentStyle,
      backdropStyle,
      ...otherProps
    } = this.props;
    const { deviceHeight, deviceWidth, isVisible } = this.state;
    const backdropAnimatedStyle = {
      opacity: this.animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, MODAL_BACKDROP_OPACITY],
      }),
    };
    const contentAnimatedStyle = {
      transform: [
        {
          translateY: this.animVal.interpolate({
            inputRange: [0, 1],
            outputRange: [deviceHeight, 0],
            extrapolate: "clamp",
          }),
        },
      ],
    };
    return (
      <ReactNativeModal
        transparent
        animationType="none"
        visible={isVisible}
        {...otherProps}
      >
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              backdropAnimatedStyle,
              { width: deviceWidth, height: deviceHeight },
              backdropStyle,
            ]}
          />
        </TouchableWithoutFeedback>
        {isVisible && (
          <Animated.View
            style={[styles.content, contentAnimatedStyle, contentStyle]}
            pointerEvents="box-none"
          >
            {children}
          </Animated.View>
        )}
      </ReactNativeModal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Modal;
