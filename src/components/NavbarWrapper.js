import React from 'react';
import { BottomTabBar } from 'react-navigation';
import { View } from 'react-native';


class NavbarWrapper extends React.Component {
  render() {
    return (
      <View>
        <BottomTabBar {...this.props} />
      </View>
    );
  }
}


export default NavbarWrapper;
