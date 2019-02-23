import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { Colors } from '../../../common';

const ReplyBox = ({ replyRef, state, _handleChangeText, addNewComment }) => (
  <View style={styles.commentWrapper}>
    <TextInput
      ref={replyRef}
      multiline
      placeholder="Add a comment..."
      placeholderTextColor={Colors.darkGreyColor}
      selectionColor={Colors.hotspotColor}
      style={styles.comment}
      onChangeText={_handleChangeText}
      value={state.newComment}
    />
    <TouchableOpacity onPress={addNewComment} style={styles.buttonWrapper}>
      <Image
        source={require('../../../../assets/icons/send.png')}
        style={{ height: 24, width: 24 }}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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

export default ReplyBox;
