import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';
import { Marker, Callout } from 'react-native-maps';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

import {
  getMarkerImage,
  renderImage,
  renderProfilePicture
} from '../../../../helpers';
import { Colors, TouchableDebounce } from '../../../common';
import { Actions } from 'react-native-router-flux';

const CustomHotspotMarker = ({ hotspot, user }) => {
  const _handleMarkerPress = () => {
    //go to the details page with comments

    Actions.comments({ hotspot, user });
  };
  return (
    <Marker
      key={hotspot._id}
      coordinate={hotspot.coordinates}
      title={user.username}
      image={getMarkerImage('flame', hotspot.size)}
      style={styles.marker}
    >
      <Callout style={styles.callout}>
        <Card>
          <CardItem bordered>
            <Left>
              {renderProfilePicture(hotspot.user.avatar, null, {
                width: 60,
                height: 60,
                borderRadius: 30
              })}
              <Body>
                <Text style={styles.text}>{hotspot.user.username}</Text>
                <Text style={styles.meta}>{user.city}</Text>
              </Body>
              <Right style={{ flex: 0.8, marginTop: 20 }}>
                <Text style={styles.meta} note>{`${moment(
                  hotspot.created_at
                ).fromNow()}`}</Text>
              </Right>
            </Left>
          </CardItem>
          <CardItem bordered>
            <Body style={{ flex: 1 }}>
              <Text
                note
                style={[styles.text, { color: Colors.mediumGreyColor }]}
              >
                {hotspot.description}
              </Text>
            </Body>
          </CardItem>
          {renderImage(hotspot)}
          <CardItem>
            <Left
              style={{
                flexDirection: 'row',
                flex: 0.6,
                alignItems: 'flex-start',
                justifyContent: 'center'
              }}
            >
              <Ionicons name="md-eye" size={18} color={Colors.hotspotColor} />
              <Text style={[styles.text, { fontSize: 12 }]}>{`${
                hotspot.views_count
              } Views`}</Text>
            </Left>
            <Right>
              <TouchableDebounce
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  paddingHorizontal: 10
                }}
                transparent={true}
                activeOpacity={0.2}
                onPress={_handleMarkerPress}
              >
                <Ionicons
                  name="ios-chatbubbles"
                  size={18}
                  color={Colors.hotspotColor}
                />
                <Text style={[styles.text, { fontSize: 12 }]}>{`${
                  hotspot.comments_count
                } Comments`}</Text>
              </TouchableDebounce>
            </Right>
          </CardItem>
        </Card>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  callout: {
    width: 300
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    backgroundColor: Colors.hotspotColor
  },
  text: {
    fontFamily: 'montserrat',
    fontSize: 14,
    color: Colors.hotspotColor
  },
  meta: {
    fontFamily: 'montserratLight',
    fontSize: 10
  }
});

export default CustomHotspotMarker;
