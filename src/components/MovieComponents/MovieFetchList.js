import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import FooterLoading from '../FooterLoading';
import MovieList from './MovieList';
import withRefetch from '../hoc/withRefetch';
import { filterDuplicateMovies } from '../../utils/movies';
import Theme from '../../Theme';

class MoviesFetchList extends React.Component {
  state = {
    movies: [],
    isInitialLoading: true,
    isPaginationLoading: false,
    refreshing: false
  };

  _isMounted = false

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    this.start = 0;
    this.total = Infinity;

    requestAnimationFrame(() => {
      this.fetchFirstPage({ isInitial: true });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fetchFunction !== nextProps.fetchFunction) {
      this.fetchFirstPage({ nextProps });
      return false;
    }

    return !(this.state === nextState && this.props === nextProps);
  }

  onRefresh = () => {
    const { refreshing } = this.state;
    if (refreshing) return;
    this.fetchFirstPage();
  };

  onListEndReached = () => {
    const { isPaginationLoading, refreshing } = this.state;
    if (isPaginationLoading || refreshing || this.start >= this.total) return;
    this.fetchNextPage();
  };

  async fetchFirstPage({ isInitial, nextProps } = {}) {
    const { fetchFunction, refetch } = nextProps || this.props;

    this._isMounted && this.setState({ refreshing: true });
    const start = 0
    const refetchAction = isInitial ? refetch.fetchUntilSuccess : refetch.fetchSafe;
    try {
      const data = await refetchAction(() => fetchFunction({ start: 0 }));
      this.start = start;
      this.total = data.total;
      this.setState({ movies: [...data.movies], isInitialLoading: false, refreshing: false });
    } catch (error) {
      console.log(error)
      this.setState({ refreshing: false });
    } finally {
      this.setState({ isInitialLoading: false })
    }
  }

  async fetchNextPage() {
    const { fetchFunction, refetch } = this.props;

    this.setState({ isPaginationLoading: true });
    const { movies: moviesBeforeFetch } = this.state;
    const data = await refetch.fetchUntilSuccess(() => fetchFunction({ start: this.start + 20 }));
    const { movies } = this.state;
    const moviesProps = {};
    if (movies === moviesBeforeFetch) {
      moviesProps.movies = filterDuplicateMovies([...movies, ...data.movies]);
      this.start += 20;
      this.total = data.total;
    }
    this.setState({ isPaginationLoading: false, ...moviesProps });
  }

  renderLoadingIndicator = () => (
    <ActivityIndicator
      size={Theme.specifications.activityIndicatorSize}
      color={Theme.gray.lightest}
    />
  );

  renderListFooter = () => {
    const { isPaginationLoading } = this.state;
    return isPaginationLoading ? <FooterLoading/> : null;
  };

  renderMovieList = () => {
    const { withRefresh, withPagination, ...props } = this.props;
    const { movies, refreshing, isPaginationLoading } = this.state;
    const refreshProps = withRefresh ? { refreshing, onRefresh: this.onRefresh } : {};
    const paginationProps = withPagination
      ? {
        onEndReached: this.onListEndReached,
        onEndReachedThreshold: 3,
        extraData: isPaginationLoading
      }
      : {};

    return (
      <MovieList
        movies={movies}
        ListFooterComponent={this.renderListFooter}
        {...refreshProps}
        {...paginationProps}
        {...props}
      />
    );
  };

  render() {
    const { isInitialLoading } = this.state;
    return (
      <View style={styles.container}>
        {isInitialLoading ? this.renderLoadingIndicator() : this.renderMovieList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

MoviesFetchList.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
  withRefresh: PropTypes.bool,
  withPagination: PropTypes.bool
};

MoviesFetchList.defaultProps = {
  withRefresh: true,
  withPagination: true
};

export default withRefetch(MoviesFetchList);
