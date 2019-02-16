import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { List, ListItem, Left, Button, Body, Right, Switch } from 'native-base';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { User } from '../../api';
import { Colors, Spinner, CustomNavBar } from '../../common';

class ProfileScreen extends Component {
  state = {
    user: null,
    public: true
  };

  componentDidMount() {
    this._getUser();
  }

  _getUser = async () => {
    //hardcode id for now
    const { user } = await User.fetchUser('5c539c398b7c1126bcfd984d');
    this.setState({ user });
  };

  async _handleValueChange(value) {
    this.setState({ public: value });
  }

  render() {
    const { user } = this.state;
    if (!user) {
      return <Spinner size="large" />;
    }
    console.log('===============');
    console.log('[ProfileScreen]:', this.state);
    console.log('===============');
    return (
      <View>
        <CustomNavBar />
        <CustomNavBar
          title="Profile"
          leftTitle="Back"
          rightTitle="Edit"
          onLeft={Actions.pop}
          onRight={() => Actions.edit()}
          margins={{ marginLeft: 50, marginRight: 50 }}
          textColor={{ color: Colors.whiteColor }}
          backgroundColor={{ backgroundColor: Colors.hotspotColor }}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.picture}>
              <Image
                source={require('../../../assets/icons/user.png')}
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
                      <Ionicons
                        name="ios-person"
                        size={24}
                        color={Colors.whiteColor}
                      />
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
                      <Ionicons
                        name="md-home"
                        size={24}
                        color={Colors.whiteColor}
                      />
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
                      value={this.state.public}
                      onValueChange={value => this._handleValueChange(value)}
                    />
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button
                      active={false}
                      style={{ backgroundColor: Colors.hotspotColor }}
                    >
                      <Ionicons
                        name="ios-stats"
                        size={24}
                        color={Colors.whiteColor}
                      />
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
        </ScrollView>
      </View>
    );
  }
}

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

export default ProfileScreen;
