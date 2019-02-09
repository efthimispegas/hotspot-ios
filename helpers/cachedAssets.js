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

export const imageAssets = cachedAssets([
  require('../assets/splash.png'),
  require('../assets/icon.png'),
  // require('../assets/icons/arrow-back.png'),
  // require('../assets/icons/camera.png'),
  // require('../assets/icons/chat.png'),
  // require('../assets/icons/cog.png'),
  // require('../assets/icons/exit.png'),
  // require('../assets/icons/findmylocation.png'),
  // require('../assets/icons/list.png'),
  // require('../assets/icons/location.png'),
  // require('../assets/icons/map.png'),
  // require('../assets/icons/return.png'),
  // require('../assets/icons/search.png'),
  // require('../assets/icons/settings.png'),
  // require('../assets/icons/user.png'),
  // require('../assets/icons/return.png'),
  // require('../assets/images/hotspot-logo.png'),
  // require('../assets/images/street.png'),
  // require('../assets/images/welcome2.png'),
  // require('../assets/gifs/dots.gif'),
  require('../assets/gifs/elastic.gif'),
  require('../assets/gifs/loading.gif')
]);
