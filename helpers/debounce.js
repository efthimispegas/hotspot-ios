import React from 'react';
import { debounce } from 'lodash';

export const withDebounce = WrappedComponent => {
  class Debouncer extends React.PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    onPress = debounce(this.debouncedOnPress, 1000, {
      leading: true,
      trailing: false
    });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  Debouncer.name = `withDebounce(${WrappedComponent.name})`;
  return Debouncer;
};
