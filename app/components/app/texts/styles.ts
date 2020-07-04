import { StyleSheet } from 'react-native'

// Color options for the texts
export const BASE_COLOR = { color: '#FFF' }
export const TITLE_COLOR = { color: '#E8FFA6' }
export const TextStyles = StyleSheet.create({
  minitext: {
    ...TITLE_COLOR,
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    paddingVertical: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...TITLE_COLOR,
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
  },
  text: {
    ...BASE_COLOR,
    fontFamily: 'DMSans-Regular',
    paddingVertical: 32,
    textAlign: 'center',
  },
  title: {
    ...TITLE_COLOR,
    fontFamily: 'ProductSans-Regular',
    fontSize: 20,
  },
})