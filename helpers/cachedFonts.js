import { Font } from 'expo';

const cachedFonts = fonts => fonts.map(font => Font.loadAsync(font));

export const fontAssets = cachedFonts([
  {
    montserrat: require('../assets/fonts/Montserrat-Regular.ttf')
  },
  {
    montserratItalic: require('../assets/fonts/Montserrat-MediumItalic.ttf')
  },
  {
    montserratBold: require('../assets/fonts/Montserrat-Bold.ttf')
  },
  {
    montserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf')
  },
  {
    montserratLight: require('../assets/fonts/Montserrat-Light.ttf')
  },
  {
    montserratLightItalic: require('../assets/fonts/Montserrat-LightItalic.ttf')
  },
  {
    montserratExtraLight: require('../assets/fonts/Montserrat-ExtraLight.ttf')
  },
  {
    montserratExtraLightItalic: require('../assets/fonts/Montserrat-ExtraLightItalic.ttf')
  },
  {
    montserratThin: require('../assets/fonts/Montserrat-Thin.ttf')
  },
  {
    montserratThinItalic: require('../assets/fonts/Montserrat-ThinItalic.ttf')
  }
]);
