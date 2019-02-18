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

import { getMarkerImage, hasImgFile } from '../../../../helpers';
import { Colors } from '../../../common';
import { Actions } from 'react-native-router-flux';

const CustomHotspotMarker = ({ hotspot }) => {
  const renderImage = () => {
    if (hasImgFile(hotspot.file)) {
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

  const _handleMarkerPress = () => {
    //go to the details page with comments

    Actions.comments({ hotspot });
  };

  return (
    <Marker
      key={hotspot._id}
      coordinate={hotspot.coordinates}
      title={hotspot.user.username}
      image={getMarkerImage('flame', hotspot.size)}
      style={styles.marker}
    >
      <Callout style={styles.callout}>
        <Card>
          <CardItem bordered>
            <Left>
              <Thumbnail
                source={require('../../../../assets/icons/user-unknown.png')}
              />
              <Body>
                <Text style={styles.text}>{hotspot.user.username}</Text>
                <Text style={styles.meta}>Athens</Text>
              </Body>
              <Right>
                <Text style={styles.meta} note>{`${moment(
                  hotspot.created_at
                ).fromNow()}`}</Text>
              </Right>
            </Left>
          </CardItem>
          <CardItem bordered>
            <TouchableWithoutFeedback onPress={_handleMarkerPress}>
              <Body style={{ flex: 1 }}>
                <Text note>{hotspot.description}</Text>
              </Body>
            </TouchableWithoutFeedback>
          </CardItem>
          {renderImage()}
          <CardItem>
            <Left>
              <Button transparent onPress={_handleMarkerPress}>
                <Ionicons
                  name="ios-thumbs-up"
                  size={18}
                  color={Colors.hotspotColor}
                />
                <Text style={[styles.text, { fontSize: 12 }]}>{`${
                  hotspot.views_count
                } Views`}</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={_handleMarkerPress}>
                <Ionicons
                  name="ios-chatbubbles"
                  size={18}
                  color={Colors.hotspotColor}
                />
                <Text style={[styles.text, { fontSize: 12 }]}>{`${
                  hotspot.comments_count
                } Comments`}</Text>
              </Button>
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
