import { Asset } from 'expo';
import { Image } from 'react-native';

const cachedAssets = assets =>
  assets.map(asset => {
    if (typeof asset === 'string') {
      //this asset is a url in string format,
      //so we prefeth it from the web source
      //when we need to user it, we do so normally
      //(e.g. <Image source={require('path/to/image')} />)
      return Image.prefetch(asset);
    } else {
      //this asset is an image that is saved in the local fs,
      //so we download it and cache it from the local module
      return Asset.fromModule(asset).downloadAsync();
    }
  });

export const ImageAssets = cachedAssets([
  'https://image.flaticon.com/icons/png/512/0/340.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png',
  require('../assets/images/street.png'),
  require('../assets/images/hotspot-logo.png'),
  require('../assets/images/welcome2.png'),
  require('../assets/icons/ios.png'),
  require('../assets/hotspot-splash.png'),
  require('../assets/splash.png')
]);
