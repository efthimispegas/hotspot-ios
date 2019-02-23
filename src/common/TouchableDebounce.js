import React, { Component } from 'react';
import { Button as NativeButton } from 'native-base';
import { withDebounce } from '../../helpers';
import { Button } from './Button';

const TouchableDebounce = withDebounce(NativeButton);
const CustomDebouncedButton = withDebounce(Button);

export { TouchableDebounce, CustomDebouncedButton };
