/* eslint-disable no-return-assign */
import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-native'
import { View } from 'react-native-animatable'

import styles from './index.style.js'

export default class CustomModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node,
    contentContainerStyle: PropTypes.any
  }

  static defaultProps = {
    contentContainerStyle: {},
    visible: false
  }

  state = {
    visible: false
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.visible && nextProps.visible) {
      this.setState({ visible: true })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // On modal open request slide the view up and fade in the backdrop
    if (this.state.visible && !prevState.visible) {
      this._open()
    // On modal close request slide the view down and fade out the backdrop
    } else if (!this.props.visible && prevProps.visible) {
      this._close()
    }
  }

  _open = () => {
    this.backdropRef.transitionTo({ opacity: 0.70 })
    this.contentRef.slideInUp(300)
  }

  _close = () => {
    this.backdropRef.transitionTo({ opacity: 0 })
    this.contentRef.slideOutDown(300)
      .then(() => this.setState({ visible: false }))
  }

  render () {
    const { children, contentContainerStyle, ...otherProps } = this.props
    const { visible } = this.state
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        {...otherProps}
        visible={visible}
      >
        <View ref={(ref) => this.backdropRef = ref} style={styles.backdrop} />
        <View ref={(ref) => this.contentRef = ref} style={[styles.contentContainer, contentContainerStyle]}>
          {children}
        </View>
      </Modal>
    )
  }
}
