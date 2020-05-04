import React, { Component } from 'react'
import { ActivityIndicator, FlatList, PanResponder, StyleSheet, View } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import MoviesHorizontalScroll from "../components/MovieComponents/MoviesHorizontalScroll";
import { getSearchFetchFunctionFromQuery, getSectionFetchFunctionFromUrlGetter } from "../services/movies";
import { getLatestMoviesUrl, getPopularMoviesUrl, getRandomMoviesUrl, getTrendingMoviesUrl } from "../services/urls";
import withDelayedLoading from "../components/hoc/withDelayedLoading";
import withRefetch from "../components/hoc/withRefetch";
import Theme from "../Theme";
import SearchBlock from "../components/SearchBlock";
import MovieSearchResults from "../components/MovieComponents/MovieSearchResults";

const BROWSE_SECTIONS = [
  { title: 'Trending', fetchFunction: getSectionFetchFunctionFromUrlGetter(getTrendingMoviesUrl) }, // 最近观看人数较多
  { title: 'Popular', fetchFunction: getSectionFetchFunctionFromUrlGetter(getPopularMoviesUrl) }, // 观看人数较多
  { title: 'Latest', fetchFunction: getSectionFetchFunctionFromUrlGetter(getLatestMoviesUrl) }, // 评分较高
  { title: 'Random', fetchFunction: getSectionFetchFunctionFromUrlGetter(getRandomMoviesUrl) }, // 随机
]

class Browse extends Component {
  constructor(props) {
    super(props);
    const sectionsMovies = BROWSE_SECTIONS.reduce((acc, cur) => {
      acc[cur.title] = []
      return acc
    }, {})

    this.state = {
      sectionsMovies,
      isInitialSearch: true,
      isSearchBlockFocused: false,
      searchResultsFetchFunction: getSearchFetchFunctionFromQuery(''),
      searchText: '',
      loading: true
    }

    this.createKeyboardDismissResponder();
  }

  componentDidMount() {
    requestAnimationFrame(() => this.initialSectionsFetch());
  }

  onSearchBlockFocus = () => this.setState({ isSearchBlockFocused: true });
  onSearchBlockBlur = () => this.setState({ isSearchBlockFocused: false });
  onSearchTextInputRef = ref => (this.searchTextInput = ref);

  onSearchTextChange = text => {
    const additionalProps = text.length === 0 ? { isInitialSearch: true } : {};
    this.setState({ searchText: text, ...additionalProps });
  };

  onDelayedInput = async () => {
    const { searchText } = this.state;
    this.setState({
      searchResultsFetchFunction: getSearchFetchFunctionFromQuery(searchText),
      isInitialSearch: false
    });
  };

  createKeyboardDismissResponder() {
    const onResponder = () => {
      this.searchTextInput.blur();
      return false;
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: onResponder,
      onStartShouldSetPanResponderCapture: onResponder
    });
  }

  initialSectionsFetch = () => {
    const {
      refetch: { fetchUntilSuccess }
    } = this.props;

    BROWSE_SECTIONS.forEach(section =>
      fetchUntilSuccess(() => section.fetchFunction({ start: 0 })).then(data => {
        const { sectionsMovies } = this.state;
        console.log(data)
        const newSections = {
          ...sectionsMovies,
          [section.title]: data.movies
        };

        this.setState({ sectionsMovies: newSections, loading: false});
      })
    );
  }

  renderMoviesScrollSection = ({ item: { title, fetchFunction } }) => {
    const { sectionsMovies } = this.state;
    return (
      <MoviesHorizontalScroll
        fetchFunction={fetchFunction}
        movies={sectionsMovies[title]}
        title={title}
      />
    );
  }

  renderLoadingIndicator = () => (
    <ActivityIndicator
      size={Theme.specifications.activityIndicatorSize}
      color={Theme.gray.lightest}
      style={{ flex: 1}}
    />
  )

  renderBrowseSections() {
    const { sectionsMovies } = this.state;
    const keyExtractor = section => section.title;

    return (
      <FlatList
        data={BROWSE_SECTIONS}
        extraData={sectionsMovies}
        keyExtractor={keyExtractor}
        renderItem={this.renderMoviesScrollSection}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  render() {
    const {
      searchText,
      searchResultsFetchFunction,
      isInitialSearch,
      isSearchBlockFocused,
      loading
    } = this.state
    return (
      <View style={styles.container}>
        <SearchBlock
          value={searchText}
          style={styles.search}
          inputRef={this.onSearchTextInputRef}
          onBlockBlur={this.onSearchBlockBlur}
          onBlockFocus={this.onSearchBlockFocus}
          onChangeText={this.onSearchTextChange}
          onDelayedInput={this.onDelayedInput}
        />

        <View style={styles.bottomContainer} {...this.panResponder.panHandlers}>
          {loading ? this.renderLoadingIndicator() : this.renderBrowseSections()}
          {isSearchBlockFocused && (
            <MovieSearchResults
              initialSearch={isInitialSearch}
              fetchFunction={searchResultsFetchFunction}
            />
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background
  },
  search: {
    marginVertical: Theme.spacing.tiny
  },
  bottomContainer: {
    flex: 1
  }
});

export default withNavigationFocus(withRefetch(withDelayedLoading(Browse)))
