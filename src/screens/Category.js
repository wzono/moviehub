import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import MovieCategory from "../components/MovieComponents/MovieCategory";
import Theme from "../Theme";
import { getCategoryFetchFunctionFromSelect } from "../services/movies";
import MovieFetchList from "../components/MovieComponents/MovieFetchList";

export default class CategoryScreen extends Component {
  state = {
    fetchFunction: () => {},
    visible: true
  }

  getFetchFunction = (params) => {
    this.setState({
      visible: false
    }, () => {
      requestAnimationFrame(() => {
        this.setState({ fetchFunction: getCategoryFetchFunctionFromSelect(params), visible: true})
      })
    })
  }

  render() {
    const { fetchFunction, visible } = this.state
    return (
      <View style={styles.container}>
        <MovieCategory onSelect={this.getFetchFunction}/>
        { visible ?
          <MovieFetchList fetchFunction={fetchFunction} withRefresh={false} />
        : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
})