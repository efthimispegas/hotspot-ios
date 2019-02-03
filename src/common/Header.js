import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Button, Body, Icon, Left, Right, Title } from 'native-base';

class HeaderComponent extends Component {
  render() {
    const { config, onPressLeft, onPressRight } = this.props;
    return (
      <Header>
        <Left>
          {config.iconLeft.on ? (
            <Button transparent onPress={onPressLeft}>
              <Icon
                type={config.iconLeft.type}
                name={config.iconLeft.name}
                style={config.iconLeft.styles}
              />
            </Button>
          ) : null}
        </Left>
        <Body>
          {config.title ? (
            <Title style={styles.title}>{this.props.children}</Title>
          ) : null}
        </Body>
        <Right>
          {config.iconRight ? (
            <Button transparent onPress={onPressRight}>
              <Icon
                type={config.iconRight.type}
                name={config.iconRight.name}
                style={config.iconRight.styles}
              />
            </Button>
          ) : null}
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: 'montserratMed'
  }
});

export { HeaderComponent };
