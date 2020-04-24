import React, { Component } from "react";
import AppButton from "../common/AppButton";
import { StyleSheet } from "react-native";
import Theme from "../../Theme";
import PropTypes from "prop-types";

class MovieCategoryButton extends Component {
  getActiveStyles = (active) => active ? [buttonStyles.activeWrapper, buttonStyles.activeText] : []
  shouldComponentUpdate(nextProps, nextState, ) {
    return nextProps.active !== this.props.active;
  }

  render() {
    const { item, style, onPress, active, ...props } = this.props
    const [activeWrapper, activeText] = this.getActiveStyles(active)
    const { name } = item;
    return (
      <AppButton
        onPress={() => onPress(item)}
        style={[buttonStyles.wrapper, style, activeWrapper]}
        textStyle={[buttonStyles.text, activeText]}
        {...props}
      >{name}</AppButton>
    )
  }
}

const buttonStyles = StyleSheet.create({
  activeWrapper: {
    backgroundColor: Theme.colors.primaryVariant,
  },
  activeText: {
    color: Theme.gray.lighter
  },
  text: {
    color: Theme.gray.light,
    paddingHorizontal: Theme.spacing.tiny,
    ...Theme.typography.titleCaption
  },
  wrapper: {
    backgroundColor: Theme.colors.bottomNavbar,
    height: '100%',
    paddingVertical: Theme.spacing.tiny,
    minWidth: 0,
    marginRight: Theme.spacing.tiny,
    borderRadius: 2,
  }
})

MovieCategoryButton.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
}

export default MovieCategoryButton