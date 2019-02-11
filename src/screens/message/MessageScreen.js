import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  ListView,
  FlatList
} from 'react-native';
import {
  View,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
  Text
} from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';

import { messages as dummyData } from './dummy';
import { Colors } from '../../common';

class MessageScreen extends React.Component {
  state = {
    basic: true,
    messageData: []
  };
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }); //truthy if row has changed

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    let newData = [...this.state.messageData];
    newData.splice(rowId, 1);
    this.setState({ messageData: newData });
  }

  getMessageDetails() {
    //here i will fetch the messages of the current user
    //from my db
    const message = dummyData;
    return message;
  }

  componentDidMount() {
    //below is a nice boilerplate I will need, maybe
    const results = this.getMessageDetails();
    let messageArray = [];
    results.forEach(value => {
      let message = {
        id: value._id,
        name: value.name,
        avatar: value.picture,
        email: value.email,
        content: value.message
      };
      messageArray.push(message);
    });

    this.setState({
      messageData: messageArray
    });
  }

  // componentWillMount() {

  // }

  render() {
    console.log('state', this.state.messageData);

    return (
      // <ScrollView style={styles.container}>
      <List
        leftOpenValue={75}
        rightOpenValue={-75}
        dataSource={this.ds.cloneWithRows(this.state.messageData)}
        renderRow={value => (
          <ListItem avatar>
            <Left style={styles.avatarContainer}>
              <Thumbnail source={{ uri: value.avatar }} style={styles.image} />
            </Left>
            <Body>
              <View style={styles.topContainer}>
                <Text style={styles.name}>{value.name}</Text>
                <Text note style={styles.time}>
                  3 mins ago
                </Text>
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.message}>
                  {value.content.substr(0, 30).concat('...')}
                </Text>
              </View>
            </Body>
          </ListItem>
        )}
        renderLeftHiddenRow={data => (
          <Button full onPress={() => alert(data)}>
            <Entypo name="reply" size={32} />
          </Button>
        )}
        renderRightHiddenRow={(data, secId, rowId, rowMap) => (
          <Button
            full
            danger
            onPress={() => this.deleteRow(secId, rowId, rowMap)}
          >
            <Ionicons name="ios-trash" size={32} />
          </Button>
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 5
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontFamily: 'montserrat',
    fontSize: 16
  },
  message: {
    fontFamily: 'montserratExtraLight',
    fontSize: 16,
    color: Colors.lightGreyColor,
    marginTop: 2,
    marginBottom: 2
  },
  time: {
    fontSize: 12,
    paddingRight: 10
  }
});

export default MessageScreen;
