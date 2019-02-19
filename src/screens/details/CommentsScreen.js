import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  Alert,
  Dimensions,
  TextInput,
  Image
} from 'react-native';
import {
  View,
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  Text,
  Card,
  CardItem,
  InputGroup
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Location } from 'expo';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { Colors, CustomNavBar, Spinner } from '../../common';
import { renderImage, validateCommentReply } from '../../../helpers';

class CommentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basic: true,
      commentData: [],
      newComment: ''
    };
    this.hotspot = props.hotspot;
    this.replyRef = React.createRef();
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }); //truthy if row has changed

  async componentDidMount() {
    this.getCommentDetails();
  }

  //here add any actions that need to be taken every time new props are received
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
    if (nextProps.comments) {
      this.updateCommentList(nextProps.comments);
    }
  }

  //here add any checks that need to be made after the component receives props
  //in order to determine whether or not it will update
  shouldComponentUpdate(nextProps, nextState) {
    console.log('===============');
    console.log('[ShouldUpdate]nextProps:', nextProps);
    console.log('===============');
    console.log('===============');
    console.log('[ShouldUpdate]nextState:', nextState);
    console.log('===============');
    if (this.props.comments === undefined) {
      //the first time it loads
      return true;
    } else if (
      nextState.commentData.length !== this.state.commentData.length ||
      this.state.newComment.length !== nextState.newComment.length
    ) {
      //every other time, update only when a new comment is added
      return true;
    }
    return false;
  }

  async getCommentDetails() {
    //get the IDs of the current user and the selected hotspot, load:
    //1. comments of the hotspot
    //2. Views incremented by 1 if the user's view is new
    //so here we need the action loadHotspotComments
    const hotspotId = this.hotspot._id;
    //destructure userId from props later, we need it for the views
    this.props.loadComments('5c54b0e1231ce64440d8292b', hotspotId);
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

  onBack = async () => {
    //load hotspots to the specific coords
    await this.props.loadHotspots(this.props.region);
    Actions.pop();
  };

  addNewComment = async () => {
    const error = validateCommentReply(this.state.newComment);
    if (error) {
      Alert.alert(
        'Sorry, but...',
        `${error}`,
        [{ text: 'Cancel', style: 'cancel' }],
        { cancellable: true }
      );
    } else {
      const comment = {
        text: this.state.newComment,
        user: {
          id: '5c54b0e1231ce64440d8292b', //hardcode them for now
          username: 'Pot'
        }
      };
      const hotspotId = this.hotspot._id;
      //destructure userId from props later
      await this.props.addComment(comment, hotspotId);
    }
    //clear the comment input
    this.setState({ ...this.state, newComment: '' });
    //then reload comments
    this.getCommentDetails();
  };

  render() {
    console.log('===============');
    console.log('[DetailsScreen]this.props:', this.props);
    console.log('===============');
    console.log('===============');
    console.log('[DetailsScreen]this.state:', this.state);
    console.log('===============');
    const { hotspot } = this.props;
    if (!this.props.comments) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Spinner size="large" />
        </View>
      );
    }
    return (
      <View style={{ ...StyleSheet.absoluteFill }}>
        <CustomNavBar
          title="Comments"
          leftTitle="Back"
          rightTitle={null}
          onLeft={this.onBack}
          onRight={null}
          margins={{ marginLeft: 84 }}
          textColor={{ color: Colors.whiteColor }}
          backgroundColor={{ backgroundColor: Colors.hotspotColor }}
        />
        <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
          <Card style={{ flex: 0 }}>
            <CardItem bordered>
              <Left>
                <Thumbnail
                  source={require('../../../assets/icons/user-unknown.png')}
                />
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
                    <Text style={styles.message}>{value.content}</Text>
                  </View>
                </Body>
              </ListItem>
            )}
            renderRightHiddenRow={data => (
              <View style={styles.button}>
                <TouchableOpacity onPress={() => this.replyRef.current.focus()}>
                  <Entypo name="reply" size={32} color={Colors.blackColor} />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.commentWrapper}>
            <TextInput
              ref={this.replyRef}
              multiline
              placeholder="Add a comment..."
              placeholderTextColor={Colors.darkGreyColor}
              selectionColor={Colors.hotspotColor}
              style={styles.comment}
              onChangeText={newComment => this.setState({ newComment })}
              value={this.state.newComment}
            />
            <TouchableOpacity
              onPress={this.addNewComment}
              style={styles.buttonWrapper}
            >
              <Image
                source={require('../../../assets/icons/send.png')}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity>
          </View>
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
    fontFamily: 'montserrat',
    fontSize: 16,
    marginTop: 2,
    marginBottom: 2,
    color: Colors.mediumGreyColor
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
  },
  commentWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  comment: {
    flex: 1,
    alignSelf: 'center',
    fontFamily: 'montserratLight',
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 6,
    lineHeight: 30,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.hotspotColor,
    borderRadius: 30,
    color: Colors.hotspotColor
    // backgroundColor: Colors.whiteColor
  },
  buttonWrapper: {
    height: 40,
    width: 40,
    marginLeft: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.hotspotColor
  }
});

const mapStoreToProps = store => {
  return {
    user: null, //<-------------fill this when we have auth up and running
    region: store.location.region,
    comments: store.comments.data.comments,
    error: store.comments.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadComments: bindActionCreators(actions.loadComments, dispatch),
    addComment: bindActionCreators(actions.createComment, dispatch),
    loadHotspots: bindActionCreators(actions.loadHotspots, dispatch),
    updateLocation: bindActionCreators(actions.updateLocation, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(CommentsScreen);
