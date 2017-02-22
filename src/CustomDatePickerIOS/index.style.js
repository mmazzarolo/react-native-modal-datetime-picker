import { StyleSheet } from 'react-native';

const BORDER_RADIUS = 14;
const BACKGROUND_COLOR = 'white';
const BORDER_COLOR = '#d5d5d5';
const TITLE_FONT_SIZE = 18;
const TITLE_COLOR = 'black';
const BUTTON_FONT_WEIGHT = 'normal';
const BUTTON_FONT_COLOR = '#007ff9';
const BUTTON_FONT_SIZE = 24;

export default StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
  },
  datepickerContainer: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
    marginBottom: 20,
  },
  titleContainer: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 12,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    color: TITLE_COLOR,
    fontSize: TITLE_FONT_SIZE,
  },
  confirmButton: {
    borderColor: BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  },
  confirmText: {
    textAlign: 'center',
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: BUTTON_FONT_WEIGHT,
    backgroundColor: 'transparent',
    padding: 10,
  },
  cancelButton: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
  },
  cancelText: {
    padding: 10,
    textAlign: 'center',
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});
