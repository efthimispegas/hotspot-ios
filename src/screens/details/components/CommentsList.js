import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem, Left, Right, Body } from 'native-base';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';

import { renderProfilePicture } from '../../../../helpers';
import { Colors } from '../../../common';

const CommentsList = ({ ds, commentData, _handleReply }) => {
  return (
    <List
      rightOpenValue={-75}
      dataSource={ds.cloneWithRows(commentData)}
      renderRow={value => (
        <ListItem avatar>
          <Left style={styles.avatarContainer}>
            {renderProfilePicture(value.user.avatar, null, {
              width: 40,
              height: 40,
              borderRadius: 20
            })}
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
      renderRightHiddenRow={(data, secId, rowId, rowMap) => (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => _handleReply(data, secId, rowId, rowMap)}
          >
            <Entypo name="reply" size={32} color={Colors.blackColor} />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 5
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
  }
});

export default CommentsList;
