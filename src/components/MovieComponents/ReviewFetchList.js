import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import FooterLoading from '../FooterLoading';
import ReviewList from './ReviewList';
import withRefetch from '../hoc/withRefetch';
import { filterDuplicateReviews } from '../../utils/movies';
import Theme from '../../Theme';

class ReviewFetchList extends React.Component {
  state = {
    reviews: [],
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
      this.setState({ reviews: [...data.reviews], isInitialLoading: false, refreshing: false });
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
    const { reviews: reviewsBeforeFetch } = this.state;
    const data = await refetch.fetchUntilSuccess(() => fetchFunction({ start: this.start + 20 }));
    const { reviews } = this.state;
    const reviewsProps = {};
    if (reviews === reviewsBeforeFetch) {
      reviewsProps.reviews = filterDuplicateReviews([...reviews, ...data.reviews]);
      this.start += 20;
      this.total = data.total;
    }
    this.setState({ isPaginationLoading: false, ...reviewsProps });
  }

  renderLoadingIndicator = () => (
    <ActivityIndicator
      size={Theme.specifications.activityIndicatorSize}
      color={Theme.gray.lightest}
    />
  );

  renderListFooter = () => {
    const { isPaginationLoading } = this.state;
    return isPaginationLoading ? <FooterLoading /> : null;
  };

  renderReviewList = () => {
    const { withRefresh, withPagination, title, ...props } = this.props;
    const { reviews, refreshing, isPaginationLoading } = this.state;
    const refreshProps = withRefresh ? { refreshing, onRefresh: this.onRefresh } : {};
    const paginationProps = withPagination
      ? {
        onEndReached: this.onListEndReached,
        onEndReachedThreshold: 3,
        extraData: isPaginationLoading
      }
      : {};

    return (
      <ReviewList
        reviews={reviews}
        title={title}
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
        {isInitialLoading ? this.renderLoadingIndicator() : this.renderReviewList()}
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

ReviewFetchList.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  withRefresh: PropTypes.bool,
  withPagination: PropTypes.bool
};

ReviewFetchList.defaultProps = {
  withRefresh: true,
  withPagination: true
};

export default withRefetch(ReviewFetchList);
