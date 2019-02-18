import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  FlatList,
  Alert
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { Colors, CustomNavBar } from '../../common';

class CommentsScreen extends React.Component {
  state = {
    basic: true,
    commentData: []
  };
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }); //truthy if row has changed

  async componentDidMount() {
    this.getCommentDetails();
  }

  componentWillReceiveProps(nextProps) {
    console.log('===============');
    console.log('[ComponentWillReceiveProps] nextProps:', nextProps);
    console.log('===============');
    console.log('===============');
    console.log('this.props:', this.props);
    console.log('===============');
    if (nextProps.error) {
      Alert.alert(
        'Oops..Something went wrong!',
        "We couldn't load the commetns from this hotspot, please try again later.",
        [{ text: 'Cancel', style: 'cancel', onPress: Actions.pop }],
        { cancelable: true }
      );
    }
    if (this.props.comments === undefined) {
      //the first time the component loads
      this.updateCommentList(nextProps.comments);
    } else {
      if (nextProps.comments.length != this.props.comments.length) {
        this.updateCommentList(nextProps.comments);
      }
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('===============');
  //   console.log('nextProps:', nextProps);
  //   console.log('===============');
  //   if (this.props.comments) {
  //     if (nextProps.comments.length !== this.props.comments.length) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  async getCommentDetails() {
    //get the IDs of the current user and the selected hotspot, load:
    //1. comments of the hotspot
    //2. Views incremented by 1 if the user's view is new
    //so here we need the action loadHotspotComments
    const hotspotId = this.props.hotspot._id;
    //destructure userId from props later
    this.props.loadComments('5c6530a3dce16943b8572af3', hotspotId);
  }

  updateCommentList(comments) {
    let commentArray = [];
    comments.forEach(el => {
      let comment = {
        id: el._id,
        user: {
          id: el.user.id,
          username: el.user.username
        },
        // avatar: , //hardcode it for now
        content: el.description,
        created_at: el.created_at
      };
      commentArray.push(comment);
    });

    this.setState({
      commentData: commentArray
    });
  }

  render() {
    console.log('===============');
    console.log('[DetailsScreen]this.props:', this.props);
    console.log('===============');
    console.log('===============');
    console.log('[DetailsScreen]this.state:', this.state);
    console.log('===============');

    return (
      <View style={{ ...StyleSheet.absoluteFill }}>
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
        <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
          <List
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.commentData)}
            renderRow={value => (
              <ListItem avatar>
                <Left style={styles.avatarContainer}>
                  <Thumbnail
                    source={require('../../../assets/icons/user-unknown.png')}
                    style={styles.image}
                  />
                </Left>
                <Body>
                  <View style={styles.topContainer}>
                    <Text style={styles.name}>{value.user.username}</Text>
                    <Text note style={styles.time}>
                      {moment(value.created_at).fromNow()}
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

const mapStoreToProps = store => {
  return {
    user: null, //<-------------fill this when we have auth up and running
    comments: store.comments.data.comments,
    error: store.comments.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadComments: bindActionCreators(actions.loadComments, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(CommentsScreen);
