import React from 'react';
import _ from 'lodash';
import { CardItem } from 'native-base';
import { Image } from 'react-native';

export const getVenueCategory = payload => {
  let category = undefined;
  // console.log('===============');
  // console.log('payload:');
  // console.log('===============');

  if (_.isArrayLikeObject(payload)) {
    category = payload[0].categories[0].name;
  } else if (payload !== null) {
    category = payload.categories[0].name;
  }

  let marker;
  if (category && category !== undefined) {
    category = _.toLower(category);
    if (
      category.includes('cafe') ||
      category.includes('coffee') ||
      category.includes('café')
    ) {
      marker = 1;
    } else if (
      category.includes('basketball') ||
      category.includes('football') ||
      category.includes('sports') ||
      category.includes('event')
    ) {
      marker = 2;
    } else if (
      category.includes('restaurant') ||
      category.includes('food') ||
      category.includes('burger') ||
      category.includes('eat')
    ) {
      marker = 3;
    } else if (
      category.includes('museum') ||
      category.includes('sights') ||
      category.includes('gallery') ||
      category.includes('exhibit') ||
      category.includes('site')
    ) {
      marker = 4;
    } else if (
      category.includes('concert') ||
      category.includes('music') ||
      category.includes('dance')
    ) {
      marker = 11;
    } else if (
      category.includes('night') ||
      category.includes('club') ||
      category.includes('bar')
    ) {
      marker = 5;
    } else if (
      (category.includes('theater') && !category.includes('movie')) ||
      category.includes('art')
    ) {
      marker = 6;
    } else if (category.includes('pizza')) {
      marker = 7;
    } else if (
      category.includes('store') ||
      category.includes('shop') ||
      category.includes('mall')
    ) {
      marker = 8;
    } else if (
      category.includes('entertainment') ||
      category.includes('event') ||
      category.includes('cinema') ||
      category.includes('movie') ||
      category.includes('multiplex') ||
      category.includes('video')
    ) {
      marker = 9;
    } else marker = 10;
    return marker;
  }
  return undefined;
};

const getFlame = () => {
  const x1 = require('../assets/flames/1.png');
  const x2 = require('../assets/flames/2.png');
  const x3 = require('../assets/flames/3.png');
  const x4 = require('../assets/flames/4.png');
  const flames = [
    { id: 1, img: x1 },
    { id: 2, img: x2 },
    { id: 3, img: x3 },
    { id: 4, img: x4 }
  ];

  return flames;
};

const getCategory = () => {
  const award = require('../assets/categories/award.png');
  const coffee = require('../assets/categories/coffee.png');
  const food = require('../assets/categories/fast-food.png');
  const other = require('../assets/categories/other.png');
  const palette = require('../assets/categories/palette.png');
  const pint = require('../assets/categories/pint.png');
  const pizza = require('../assets/categories/pizza.png');
  const popcorn = require('../assets/categories/popcorn.png');
  const shop = require('../assets/categories/shopping-store.png');
  const theater = require('../assets/categories/theater.png');
  const music = require('../assets/categories/music.png');
  const markers = [
    { id: 1, img: coffee },
    { id: 2, img: award },
    { id: 3, img: food },
    { id: 4, img: palette },
    { id: 5, img: pint },
    { id: 6, img: theater },
    { id: 7, img: pizza },
    { id: 8, img: shop },
    { id: 9, img: popcorn },
    { id: 10, img: other },
    { id: 11, img: music }
  ];
  return markers;
};

export const getMarkerImage = (type, imageId) => {
  let category, flame, found;
  if (type === 'flame') {
    flame = getFlame();
    found = _.find(flame, element => {
      const id = element.id;
      if (imageId === id) {
        return element;
      }
    });
    return found.img;
  } else if (type === 'category') {
    category = getCategory();
    found = _.find(category, element => {
      const id = element.id;
      if (imageId === id) {
        return element;
      }
    });
  }
  return found.img;
};

export const renderImage = hotspot => {
  if (typeof hotspot.file.uri === 'string') {
    return (
      <CardItem cardBody>
        <Image
          source={{ uri: hotspot.file.uri }}
          style={{ height: 180, width: null, flex: 1, borderRadius: 2 }}
        />
      </CardItem>
    );
  }
  return null;
};

//needs modifying
export const renderProfilePicture = (avatar, image, imageStyle) => {
  if (typeof avatar.uri === 'string') {
    return <Image source={{ uri: avatar.uri }} style={imageStyle} />;
  } else if (image) {
    return image;
  } else {
    return (
      <Image
        source={require('../assets/icons/user-unknown.png')}
        style={imageStyle}
      />
    );
  }
};
