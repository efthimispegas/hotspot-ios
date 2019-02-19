import React, { Component } from 'react';
import { Button } from 'native-base';
import { withDebounce } from '../../helpers';

export const TouchableDebounce = withDebounce(Button);
