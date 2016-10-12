import {StyleSheet} from "react-native";

const BORDER_RADIUS = 14;
const BORDER_COLOR = '#d5d5d5';
const TITLE_FONT_SIZE = 18;
const TITLE_COLOR = 'black';
const BUTTON_FONT_WEIGHT = 'normal';
const BUTTON_FONT_COLOR = '#007ff9';
const BUTTON_FONT_SIZE = 18;

export default StyleSheet.create({
    contentContainer: {
        justifyContent: 'flex-end'
    },
    datepickerContainer: {
        borderRadius: BORDER_RADIUS
    },
    titleContainer: {
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        padding: 12,
        backgroundColor: 'transparent'
    },
    title: {
        textAlign: 'center',
        color: TITLE_COLOR,
        fontSize: TITLE_FONT_SIZE
    },
    confirmButton: {
        borderColor: BORDER_COLOR,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: 'transparent'
    },
    confirmText: {
        textAlign: 'center',
        color: BUTTON_FONT_COLOR,
        fontSize: BUTTON_FONT_SIZE,
        fontWeight: BUTTON_FONT_WEIGHT,
        backgroundColor: 'transparent'
    },
    cancelButton: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: BORDER_RADIUS,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    cancelText: {
        textAlign: 'center',
        color: BUTTON_FONT_COLOR,
        fontSize: BUTTON_FONT_SIZE,
        fontWeight: BUTTON_FONT_WEIGHT,
        backgroundColor: 'transparent'
    }
})
