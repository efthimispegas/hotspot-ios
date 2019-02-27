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
  require('../assets/categories/palette.png'),
  require('../assets/categories/theater.png'),
  require('../assets/categories/pizza.png'),
  require('../assets/categories/popcorn.png'),
  require('../assets/categories/fast-food.png'),
  require('../assets/categories/fast-food.png'),
  require('../assets/categories/coffee.png'),
  require('../assets/categories/shopping-store.png'),
  require('../assets/gifs/loading.gif'),
  require('../assets/flames/x1.png'),
  require('../assets/flames/x2.png'),
  require('../assets/flames/x3.png'),
  require('../assets/flames/x4.png'),
  require('../assets/flames/x5.png'),
  require('../assets/icons/plus.png'),
  require('../assets/icons/add-image.png'),
  require('../assets/icons/arrow-back.png'),
  require('../assets/icons/camera.png'),
  require('../assets/icons/chat.png'),
  require('../assets/icons/exit.png'),
  require('../assets/icons/location.png'),
  require('../assets/icons/location-on.png'),
  require('../assets/icons/findmylocation.png'),
  require('../assets/icons/user-unknown.png')
]);
