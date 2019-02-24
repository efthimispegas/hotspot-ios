import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button as NativeButton } from 'native-base';
import { withDebounce } from '../../helpers';
import { Button } from './Button';

const TouchableDebounce = withDebounce(NativeButton);
const DebouncedOpacity = withDebounce(TouchableOpacity);
const CustomDebouncedButton = withDebounce(Button);

export { TouchableDebounce, CustomDebouncedButton, DebouncedOpacity };
