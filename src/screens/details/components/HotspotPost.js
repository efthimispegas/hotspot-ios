import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Left, Body } from 'native-base';
import moment from 'moment';

import { renderProfilePicture, renderImage } from '../../../../helpers';
import { Colors } from '../../../common';

const HotspotPost = ({ hotspot }) => (
  <Card style={{ flex: 0 }}>
    <CardItem bordered>
      <Left>
        {renderProfilePicture(hotspot.user.avatar, null, {
          width: 60,
          height: 60,
          borderRadius: 30
        })}
        <Body>
          <Text style={styles.name}>{hotspot.user.username}</Text>
          <Text note>{`${moment(hotspot.created_at).fromNow()}`}</Text>
        </Body>
      </Left>
    </CardItem>
    <CardItem bordered>
      <Body style={{ flex: 1 }}>
        <Text style={styles.message}>{hotspot.text}</Text>
      </Body>
    </CardItem>
    {renderImage(hotspot)}
  </Card>
);

const styles = StyleSheet.create({
  name: {
    fontFamily: 'montserrat',
    fontSize: 16
  },
  message: {
    fontFamily: 'montserrat',
    fontSize: 16,
    marginTop: 2,
    marginBottom: 2,
    color: Colors.mediumGreyColor
  }
});

export default HotspotPost;
