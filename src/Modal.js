import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  Easing,
  Modal as ReactNativeModal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";

const MODAL_ANIM_DURATION = 300;
const MODAL_BACKDROP_OPACITY = 0.4;

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

const Modal = ({
  backdropStyle,
  children,
  contentStyle,
  isVisible,
  onBackdropPress,
  onHide,
  ...otherProps
}) => {
  const animVal = useRef(new Animated.Value(0)).current;
  const visibility = useRef(isVisible);
  const isMounted = useRef(false);
  const { height, width } = useWindowDimensions();
  const backdropAnimatedStyle = {
    opacity: animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, MODAL_BACKDROP_OPACITY],
    }),
  };
  const contentAnimatedStyle = {
    transform: [
      {
        translateY: animVal.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  useEffect(() => {
    if (!visibility) {
      visibility.current = true;
      Animated.timing(animVal, {
        easing: Easing.inOut(Easing.quad),
        // Using native driver in the modal makes the content flash
        useNativeDriver: false,
        duration: MODAL_ANIM_DURATION,
        toValue: 1,
      }).start();
    } else if (visibility) {
      Animated.timing(animVal, {
        easing: Easing.inOut(Easing.quad),
        // Using native driver in the modal makes the content flash
        useNativeDriver: false,
        duration: MODAL_ANIM_DURATION,
        toValue: 0,
      }).start(() => {
        if (isMounted) {
          visibility.current = false;
          onHide();
        }
      });
    }
  }, [visibility]);

  return (
    <ReactNativeModal
      transparent
      animationType="none"
      visible={visibility}
      {...otherProps}
    >
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <Animated.View
          style={[
            styles.backdrop,
            backdropAnimatedStyle,
            { width, height },
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
};

Modal.propTypes = {
  onBackdropPress: PropTypes.func,
  onHide: PropTypes.func,
  isVisible: PropTypes.bool,
  contentStyle: PropTypes.any,
};

Modal.defaultProps = {
  onBackdropPress: () => null,
  onHide: () => null,
  isVisible: false,
  contentStyle: {},
};

export default Modal;
