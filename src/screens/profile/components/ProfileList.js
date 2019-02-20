import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { List, ListItem, Left, Button, Body, Right, Switch } from 'native-base';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { Colors } from '../../../common';

const ProfileLst = ({ state, user, _handleValueChange }) => (
  <View style={styles.container}>
    <View style={styles.picture}>
      <Image
        source={require('../../../../assets/icons/user.png')}
        style={{ width: 60, height: 60 }}
      />
    </View>
    <View style={styles.settings}>
      <List>
        <ListItem itemDivider>
          <Text style={styles.separator}>ACCOUNT INFO</Text>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button
              active={false}
              style={{ backgroundColor: Colors.hotspotColor }}
            >
              <FontAwesome
                name="transgender"
                size={24}
                color={Colors.whiteColor}
              />
            </Button>
          </Left>
          <Body>
            <Text style={styles.listItem}>Gender</Text>
          </Body>
          <Right>
            <Text style={styles.listItem}>{user.gender}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button
              active={false}
              style={{ backgroundColor: Colors.hotspotColor }}
            >
              <Ionicons name="ios-person" size={24} color={Colors.whiteColor} />
            </Button>
          </Left>
          <Body>
            <Text style={styles.listItem}>Username</Text>
          </Body>
          <Right>
            <Text style={styles.listItem}>{user.username}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button
              active={false}
              style={{ backgroundColor: Colors.hotspotColor }}
            >
              <Ionicons
                name="ios-information-circle-outline"
                size={24}
                color={Colors.whiteColor}
              />
            </Button>
          </Left>
          <Body>
            <Text style={styles.listItem}>Full name</Text>
          </Body>
          <Right>
            <Text style={styles.listItem}>
              {user.fullname ? user.fullname : user.username}
            </Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left />
          <Body>
            <Text style={styles.listItem}>Birthday</Text>
          </Body>
          <Right>
            <Text style={styles.listItem}>{user.birthday}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button
              active={false}
              style={{ backgroundColor: Colors.hotspotColor }}
            >
              <Ionicons name="md-home" size={24} color={Colors.whiteColor} />
            </Button>
          </Left>
          <Body>
            <Text style={styles.listItem}>City</Text>
          </Body>
          <Right>
            <Text style={styles.listItem}>{user.city}</Text>
          </Right>
        </ListItem>
        <ListItem itemDivider>
          <Text style={styles.separator}>SETTINGS</Text>
        </ListItem>
        <ListItem>
          <Left>
            <Text style={styles.listItem}>Public</Text>
          </Left>
          <Body />
          <Right>
            <Switch
              value={state.public}
              onValueChange={value => _handleValueChange(value)}
            />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button
              active={false}
              style={{ backgroundColor: Colors.hotspotColor }}
            >
              <Ionicons name="ios-stats" size={24} color={Colors.whiteColor} />
            </Button>
          </Left>
          <Body>
            <Text style={styles.listItem}>Stats for nerds</Text>
          </Body>
          <Right>
            <Button transparent>
              <Ionicons
                name="ios-arrow-forward"
                size={32}
                color={Colors.hotspotColor}
              />
            </Button>
          </Right>
        </ListItem>
        <ListItem itemDivider>
          <Text style={styles.separator}>GALLERY</Text>
        </ListItem>
      </List>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  picture: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30
  },
  separator: {
    fontSize: 12,
    color: Colors.lightGreyColor
  },
  listItem: {
    color: Colors.darkGreyColor,
    fontSize: 16,
    marginRight: 15
  }
});

export default ProfileLst;