import { StyleSheet } from 'react-native'

const BORDER_RADIUS = 14
const BACKGROUND_COLOR = 'white'

export default StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end'
  },
  datepickerContainer: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS
  },
  titleContainer: {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    padding: 12,
    backgroundColor: 'transparent'
  },
  title: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 20
  },
  confirmButton: {
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: 'transparent'
  },
  confirmText: {
    textAlign: 'center',
    color: '#2E93FC',
    fontSize: 24,
    fontWeight: '500',
    backgroundColor: 'transparent'
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: BACKGROUND_COLOR,
    padding: 10,
    borderRadius: BORDER_RADIUS
  },
  cancelText: {
    textAlign: 'center',
    color: '#2E93FC',
    fontSize: 24,
    fontWeight: '700',
    backgroundColor: 'transparent'
  }
})
