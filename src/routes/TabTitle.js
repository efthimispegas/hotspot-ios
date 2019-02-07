import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string
};

const defaultProps = {
  focused: false,
  title: ''
};

const TabTitle = props => (
  <Text style={{ color: props.focused ? 'red' : 'black' }}>{props.title}</Text>
);

TabTitle.propTypes = propTypes;
TabTitle.defaultProps = defaultProps;

export default TabTitle;
