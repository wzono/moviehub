import React, { Component } from "react";
import MovieCategoryButton from "./MovieCategoryButton";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import _ from 'lodash'
class MovieCategoryHorizontalFlatList extends Component {
  state = {
    current: {}
  }

  componentDidMount() {
    const { data } = this.props
    this.setState({
      current: data[0]
    })
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.state.current.id !== nextState.current.id || !_.isEqual(this.props, nextProps);
  }


  renderCategory = ({ item }) => (
    <MovieCategoryButton
      item={item}
      onPress={this.onCategorySelect}
      active={item.id === this.state.current?.id}
      hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
      style={{ height: 34 }}
    />)

  onCategorySelect = (item) => {
    const { onSelect } = this.props
    if (this.state.current.id === item.id) return
    this.setState({ current: item })
    onSelect(item.id)
  }


  render() {
    const { data } = this.props
    const isEmpty = !data.length
    const categoryKeyExtractor = c => c.id.toString()
    return (
        <FlatList
          horizontal
          data={data}
          scrollEnabled={!isEmpty}
          initialNumToRender={8}
          showsHorizontalScrollIndicator={false}
          keyExtractor={categoryKeyExtractor}
          renderItem={this.renderCategory}
          style={{ height: 48 }}
        />
    )
  }
}

MovieCategoryHorizontalFlatList.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default MovieCategoryHorizontalFlatList