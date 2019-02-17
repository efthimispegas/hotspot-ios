import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
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
import { Actions } from 'react-native-router-flux';
import { Entypo, Ionicons } from '@expo/vector-icons';

import { data } from './dummy';
import { Colors, CustomNavBar } from '../../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class CommentsScreen extends React.Component {
  state = {
    basic: true,
    commentData: []
  };
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }); //truthy if row has changed

  getCommentDetails() {
    //here i will fetch the comments of the current user
    //from my db
    const comments = data;
    return comments;
  }

  componentDidMount() {
    //below is a nice boilerplate I will need, maybe
    const results = this.getCommentDetails();
    let commentArray = [];
    results.forEach(value => {
      let message = {
        id: value._id,
        name: value.name,
        avatar: value.picture,
        email: value.email,
        content: value.message
      };
      commentArray.push(message);
    });

    this.setState({
      commentData: commentArray
    });
  }

  // componentWillMount() {

  // }

  render() {
    console.log('===============');
    console.log('[DetailsScreen]this.props:', this.props);
    console.log('===============');

    return (
      <View style={{ backgroundColor: 'white' }}>
        <CustomNavBar
          title="Comments"
          leftTitle="Back"
          rightTitle={null}
          onLeft={Actions.pop}
          onRight={null}
          margins={{ marginLeft: 84 }}
          textColor={{ color: Colors.whiteColor }}
          backgroundColor={{ backgroundColor: Colors.hotspotColor }}
        />
        <KeyboardAwareScrollView>
          <List
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.commentData)}
            renderRow={value => (
              <ListItem avatar>
                <Left style={styles.avatarContainer}>
                  <Thumbnail
                    source={{ uri: value.avatar }}
                    style={styles.image}
                  />
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
            renderRightHiddenRow={data => (
              <View style={styles.button}>
                <TouchableOpacity onPress={() => alert(data)}>
                  <Entypo name="reply" size={32} color={Colors.blackColor} />
                </TouchableOpacity>
              </View>
            )}
          />
          {/** Here goes the reply component */}
        </KeyboardAwareScrollView>
      </View>
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
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.hotspotColor
  }
});

export default CommentsScreen;
