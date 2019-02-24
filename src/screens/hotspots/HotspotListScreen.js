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
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { messages as dummyData } from './dummy';
import { Colors, CustomNavBar, TouchableDebounce, Spinner } from '../../common';
import { renderProfilePicture } from '../../../helpers';

class HotspotListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hotspotData: []
    };
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
    if (nextProps.deletion) {
      this.updateHotspotList(nextProps.myHotspots);
    }
  }

  //here add any checks that need to be made after the component receives props
  //in order to determine whether or not it will update
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.myHotspots === null) {
  //     //the first time it loads
  //     return true;
  //   } else if (nextState.hotspotData.length !== this.state.hotspotData.length) {
  //     //every other time, reload only when a hotspot is deleted or updated
  //     return true;
  //   } else if (nextProps)
  //   return false;
  // }

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
        _id: el._id,
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
      hotspotData: hotspotArray,
      isLoading: false
    });
  }

  async _handleDelete(hotspot, secId, rowId, rowMap) {
    console.log('===============');
    console.log('hotspot:', hotspot);
    console.log('===============');
    rowMap[`${secId}${rowId}`].props.closeRow();
    //remove the selected hotspot
    await this.props.deleteHotspot(hotspot._id);
    await this.getHotspotDetails();
    let newData = [...this.state.hotspotData];
    newData.splice(rowId, 1);
    this.setState({ hotspotData: newData });
  }

  _handleEdit = (hotspot, secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].props.closeRow();
    Actions.edit_hotspot({ hotspot });
  };

  //if no messages then need to display "no mesages"
  render() {
    console.log('state', this.state);
    if (this.state.isLoading) {
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
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Spinner />
          </View>
        </View>
      );
    }
    console.log('===============');
    console.log('[HotspotList]:this.props.myHotspots', this.props.myHotspots);
    console.log('===============');
    if (!this.props.myHotspots) {
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
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{
                color: Colors.lightGreyColor,
                fontFamily: 'montserratItalic'
              }}
            >
              No Hotspots
            </Text>
          </View>
        </View>
      );
    }

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
                        {value.text.length <= 100
                          ? value.text
                          : value.text.substr(0, 100).concat('...')}
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
                      name="md-eye"
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
                      onPress={() => Actions.comments({ hotspot: value })}
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
            renderLeftHiddenRow={(data, secId, rowId, rowMap) => (
              <View style={styles.replyButton}>
                <TouchableDebounce
                  transparent
                  full
                  onPress={() => this._handleEdit(data, secId, rowId, rowMap)}
                >
                  <MaterialIcons
                    name="edit"
                    size={32}
                    color={Colors.blackColor}
                  />
                </TouchableDebounce>
              </View>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <View style={styles.deleteButton}>
                <Button
                  transparent
                  full
                  onPress={() => this._handleDelete(data, secId, rowId, rowMap)}
                >
                  <Ionicons
                    name="ios-trash"
                    size={32}
                    color={Colors.whiteColor}
                  />
                </Button>
              </View>
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
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.redColor
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
    myHotspots: store.hotspots.myHotspots,
    deletion: store.hotspots.deletion
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserHotspots: bindActionCreators(actions.loadUserHotspots, dispatch),
    deleteHotspot: bindActionCreators(actions.deleteHotspot, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(HotspotListScreen);
