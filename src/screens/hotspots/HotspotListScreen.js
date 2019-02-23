import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  ListView,
  TouchableOpacity
} from 'react-native';
import {
  View,
  List,
  Card,
  ListItem,
  CardItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
  Text
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { messages as dummyData } from './dummy';
import { Colors, CustomNavBar, TouchableDebounce } from '../../common';
import { renderProfilePicture } from '../../../helpers';

class HotspotListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basic: true,
      hotspotData: []
    };
    this.myHotspots = props.myHotspots;
    this.user = props.user;
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }); //truthy if row has changed

  async componentDidMount() {
    await this.getHotspotDetails();
  }

  //here add any actions that need to be taken every time new props are received
  componentWillReceiveProps(nextProps) {
    console.log('===============');
    console.log('[MyHotspots]will receive props:', nextProps);
    console.log('===============');
    if (nextProps.error) {
      Alert.alert(
        'Oops..Something went wrong!',
        "We couldn't load your hotspots, please try again later.",
        [{ text: 'Cancel', style: 'cancel', onPress: Actions.pop }],
        { cancelable: true }
      );
    }
    if (nextProps.myHotspots) {
      this.updateHotspotList(nextProps.myHotspots);
    }
  }

  //here add any checks that need to be made after the component receives props
  //in order to determine whether or not it will update
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.myHotspots === null) {
      //the first time it loads
      return true;
    } else if (nextState.hotspotData.length !== this.state.hotspotData.length) {
      //every other time, reload only when a hotspot is deleted or updated
      return true;
    }
    return false;
  }

  async getHotspotDetails() {
    //here i will fetch the hotspots of the current user
    //from my db
    const userId = this.user._id;
    await this.props.loadUserHotspots(userId);
  }

  updateHotspotList(hotspots) {
    let hotspotArray = [];
    hotspots.forEach(el => {
      let hotspot = {
        id: el._id,
        text: el.text,
        description: el.description,
        validity: el.validity,
        valid: el.valid,
        file: el.file,
        user: this.user,
        loc: el.loc,
        comments_count: el.comments_count,
        views_count: el.views_count,
        created_at: el.created_at
      };
      hotspotArray.push(hotspot);
    });

    this.setState({
      hotspotData: hotspotArray
    });
  }

  async deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    let newData = [...this.state.hotspotData];
    newData.splice(rowId, 1);
    this.setState({ hotspotData: newData });
  }

  privateMessage = data => {
    console.log('===============');
    console.log('data:', data);
    console.log('===============');
  };

  //if no messages then need to display "no mesages"
  render() {
    console.log('state', this.state);

    return (
      <View style={{ ...StyleSheet.absoluteFill }}>
        <CustomNavBar
          title="My Hotspots"
          leftTitle="Back"
          rightTitle={null}
          onLeft={Actions.pop}
          onRight={null}
          margins={{ marginLeft: 76 }}
          textColor={{ color: Colors.whiteColor }}
          backgroundColor={{ backgroundColor: Colors.hotspotColor }}
        />
        <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.hotspotData)}
            renderRow={value => (
              <View>
                <ListItem noBorder>
                  <View style={styles.hotspotContainer}>
                    <View style={styles.timeContainer}>
                      <Text note style={styles.time}>
                        {moment(value.created_at).fromNow()}
                      </Text>
                    </View>
                    <View style={styles.postContainer}>
                      <Text style={styles.message}>
                        {value.text.substr(0, 100).concat('...')}
                      </Text>
                    </View>
                  </View>
                </ListItem>
                <View style={styles.statsContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.4,
                      alignItems: 'flex-start',
                      justifyContent: 'space-around',
                      marginHorizontal: 20,
                      marginTop: 15
                    }}
                  >
                    <Ionicons
                      name="ios-thumbs-up"
                      size={18}
                      color={Colors.hotspotColor}
                    />
                    <Text style={[styles.text, { fontSize: 12 }]}>{`${
                      value.views_count
                    } Views`}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.5,
                      alignItems: 'flex-start',
                      justifyContent: 'space-around',
                      marginHorizontal: 20
                    }}
                  >
                    <TouchableDebounce
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center'
                      }}
                      transparent={true}
                      activeOpacity={0.2}
                      onPress={() => {}}
                    >
                      <Ionicons
                        name="ios-chatbubbles"
                        size={18}
                        color={Colors.hotspotColor}
                      />
                      <Text style={[styles.text, { fontSize: 12 }]}>{`${
                        value.comments_count
                      } Comments`}</Text>
                    </TouchableDebounce>
                  </View>
                </View>
              </View>
            )}
            renderLeftHiddenRow={data => (
              <View style={styles.replyButton}>
                <TouchableOpacity onPress={() => this.privateMessage(data)}>
                  <Entypo name="reply" size={32} color={Colors.blackColor} />
                </TouchableOpacity>
              </View>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={() => this.deleteRow(secId, rowId, rowMap)}
              >
                <Ionicons
                  name="ios-trash"
                  size={32}
                  color={Colors.whiteColor}
                />
              </Button>
            )}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  hotspotContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGreyColor
  },
  timeContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  postContainer: {
    flex: 1
  },
  message: {
    fontFamily: 'montserratExtraLight',
    fontSize: 16,
    color: Colors.mediumGreyColor,
    marginTop: 2,
    marginBottom: 2
  },
  time: {
    fontSize: 12,
    paddingRight: 10
  },
  replyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

const mapStoreToProps = store => {
  return {
    user: store.auth.user.info,
    myHotspots: store.hotspots.myHotspots
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserHotspots: bindActionCreators(actions.loadUserHotspots, dispatch),
    updateHotspot: null, //<----------------------
    deleteHotspot: null //<-----------|
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(HotspotListScreen);
