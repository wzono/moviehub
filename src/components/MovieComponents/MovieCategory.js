import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from "react-native";
import { fetchMovieEnum } from "../../services/movies";
import withRefetch from "../hoc/withRefetch";
import MovieCategoryHorizontalFlatList from "./MovieCategoryHorizontalFlatList";
import Theme from "../../Theme";
import { SORT } from "../../services/urls";

const PUB_YEARS = [{ id: "0,2020", name: "全部" }, { id: "2020,2020", name: "2020", }, { id: "2019,2019", name: "2019" },
  { id: "2018,2018", name: "2018" }, { id: "2017,2017", name: "2017" }, {
    id: "2016,2016",
    name: "2016"
  }, { id: "2010,2015", name: "2015-2010" },
  { id: "2000,2009", name: "2009-2000" }, { id: "1990,1999", name: "90年代" }, { id: "1980,1989", name: "80年代" },
  { id: "0,1979", name: "更早" }]

const SORTS = [{ id: SORT.Latest, name: "最新上映" }, { id: SORT.Highest, name: "评分最高" }, { id: SORT.Popular, name: "热度最高"}]

class MovieCategory extends Component {
  state = {
    regions: [{ id: "", name: '全部' }],
    genres: [{ id: "", name: '全部' }],
    pubYears: PUB_YEARS,
    sorts: SORTS
  }

  onCategoryChange = (id, prop) => {
    const { onSelect } = this.props
    this.selectObject = {
      ...this.selectObject,
      [prop]: id
    }
    onSelect(this.selectObject)
  }

  componentDidMount() {
    this.initialCategories()
  }


  initialCategories = () => {
    const { refetch: { fetchUntilSuccess }, onSelect } = this.props
    const { regions, genres, pubYears, sorts } = this.state
    this.selectObject = {
      regions: regions[0]?.id,
      genres: genres[0]?.id,
      pubYears: pubYears[0]?.id,
      sort: sorts[0]?.id
    }
    onSelect(this.selectObject)
    fetchUntilSuccess(fetchMovieEnum).then(res => {
      const { regions: r, genres: g } = res;
      this.setState({
        regions: [...regions, ...r],
        genres: [...genres, ...g],
      })
    })
  }

  render() {
    const { regions, genres, pubYears, sorts } = this.state
    return (
      <View style={styles.container}>
        <MovieCategoryHorizontalFlatList data={sorts} onSelect={(id) => this.onCategoryChange(id, "sort")}/>
        <MovieCategoryHorizontalFlatList data={genres} onSelect={(id) => this.onCategoryChange(id, "genres")}/>
        <MovieCategoryHorizontalFlatList data={regions} onSelect={(id) => this.onCategoryChange(id, "regions")}/>
        <MovieCategoryHorizontalFlatList data={pubYears} onSelect={(id) => this.onCategoryChange(id, "pubYears")}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.tiny, paddingBottom: 0,
    backgroundColor: Theme.colors.bottomNavbar
  }
})

MovieCategory.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default withRefetch(MovieCategory)