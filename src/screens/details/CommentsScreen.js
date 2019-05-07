import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  Alert,
  Dimensions,
  TextInput,
  Image,
  Modal
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
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { Colors, CustomNavBar, Spinner, GalleryImage } from '../../common';
import { validateCommentReply, renderProfilePicture } from '../../../helpers';
import HotspotPost from './components/HotspotPost';
import CommentsList from './components/CommentsList';
import ReplyBox from './components/ReplyBox';
import { Hotspot } from '../../api';

class CommentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: [],
      newComment: '',
      page: 1,
      isModalVisible: false,
      isShowMoreVisible: true
    };
    this.hotspot = props.hotspot;
    this.user = props.user;
    this.replyRef = React.createRef();
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }); //truthy if row has changed

  async componentDidMount() {
    await this.getCommentDetails();
  }

  //here add any actions that need to be taken every time new props are received
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      Alert.alert(
        'Oops..Something went wrong!',
        "We couldn't load the comments from this hotspot, please try again later.",
        [{ text: 'Cancel', style: 'cancel', onPress: Actions.pop }],
        { cancelable: true }
      );
    }
    if (nextProps.pages && nextProps.pages === 1) {
      this.setState({ isShowMoreVisible: false });
    } else {
      this.setState({ isShowMoreVisible: true });
    }
    if (nextProps.comments) {
      this.updateCommentList(nextProps.comments);
    }
  }

  //here add any checks that need to be made after the component receives props
  //in order to determine whether or not it will update
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.comments === undefined) {
      //the first time it loads
      return true;
    } else if (
      nextState.commentData.length !== this.state.commentData.length ||
      this.state.newComment.length !== nextState.newComment.length ||
      this.state.isModalVisible !== nextState.isModalVisible ||
      this.state.isShowMoreVisible !== nextState.isShowMoreVisible
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
    const hotspotId = this.hotspot._id;
    const userId = this.user._id;
    await this.props.loadComments(userId, hotspotId);
  }

  updateCommentList(comments) {
    let commentArray = [];
    comments.forEach(el => {
      let comment = {
        id: el._id,
        user: el.user,
        description: el.description,
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
        text: this.state.newComment
      };
      const hotspotId = this.hotspot._id;
      const userId = this.user._id;
      //destructure userId from props later
      await this.props.addComment(userId, hotspotId, comment);
    }
    //clear the comment input
    this.setState({ ...this.state, newComment: '' });
    //then reload comments
    this.getCommentDetails();
  };
  _handleChangeText = newComment => {
    this.setState({ newComment });
  };
  _handleReply = (data, secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].props.closeRow();
    this.replyRef.current.focus();
  };

  _handleShowMore = async (page, limit) => {
    const { comments, total, offset } = await Hotspot.showMoreComments(
      page,
      limit,
      this.user._id,
      this.hotspot._id
    );
    if (offset * page >= total || total === 0) {
      this.setState({
        isShowMoreVisible: false
      });
    }
    this.setState({
      commentData: [...this.state.commentData, ...comments],
      page: this.state.page + 1
    });
  };

  toggleModal = isVisible => {
    console.log(isVisible);
    this.setState({ isModalVisible: isVisible });
  };

  render() {
    console.log('===============');
    console.log('[DetailsScreen]this.props:', this.props);
    console.log('===============');
    console.log('===============');
    console.log('[DetailsScreen]this.state:', this.state);
    console.log('===============');
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
          <Modal
            animationType="fade"
            transparent
            visible={this.state.isModalVisible}
            style={styles.modal}
          >
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={() => this.toggleModal(false)}
                style={styles.closeButton}
              >
                <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
              <GalleryImage uri={this.hotspot.file.uri} />
            </View>
          </Modal>
          <HotspotPost
            toggleModal={this.toggleModal.bind(this)}
            hotspot={this.hotspot}
          />
          <CommentsList
            ds={this.ds}
            commentData={this.state.commentData}
            _handleReply={this._handleReply.bind(this)}
          />
          {this.state.isShowMoreVisible ? (
            <TouchableOpacity
              onPress={() => this._handleShowMore(this.state.page + 1, 5)}
              style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}
            >
              <Text style={{ color: Colors.lightGreyColor }}>More...</Text>
            </TouchableOpacity>
          ) : null}
          <ReplyBox
            replyRef={this.replyRef}
            state={this.state}
            _handleChangeText={this._handleChangeText.bind(this)}
            addNewComment={this.addNewComment}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: '#eee'
  },
  imageWrapper: {
    width: Dimensions.get('window').width / 3 - 4,
    height: Dimensions.get('window').height / 3 - 4,
    padding: 5,
    backgroundColor: '#fff'
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  closeButton: {
    alignSelf: 'center',
    height: 26,
    width: 26,
    marginBottom: 20
  }
});

const mapStoreToProps = store => {
  return {
    user: store.auth.user.info,
    region: store.location.region,
    comments: store.comments.data.comments,
    pages:
      Math.floor(store.comments.data.total / store.comments.data.limit) + 1,
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
