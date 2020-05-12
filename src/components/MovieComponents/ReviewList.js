import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import { reviewKeyExtractor } from '../../utils/movies';
import { getReviewListEmptyIcon } from '../../utils/icons';
import ReviewListItem from "./ReviewListItem";

class ReviewList extends React.PureComponent {
  renderEmptyDefault = () => {
    const { emptyText, emptySubtext } = this.props;
    return (
      <InfoAbsoluteBlock Icon={getReviewListEmptyIcon()} text={emptyText} subtext={emptySubtext} />
    );
  };

  renderEmpty = () => {
    const { renderEmptyComponent } = this.props;
    return renderEmptyComponent ? renderEmptyComponent() : this.renderEmptyDefault();
  };

  renderReview = ({ item: review }, title) => <ReviewListItem review={review} title={title} />;

  renderReviewList = () => {
    const { reviews, title, ...props } = this.props;

    return (
      <FlatList
        data={reviews}
        style={styles.list}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        renderItem={item => this.renderReview(item, title)}
        keyExtractor={reviewKeyExtractor}
        {...props}
      />
    );
  };

  render() {
    const { reviews } = this.props;
    return reviews.length === 0 ? this.renderEmpty() : this.renderReviewList();
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

ReviewList.propTypes = {
  reviews: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  renderEmptyComponent: PropTypes.func,
  emptyText: PropTypes.string,
  emptySubtext: PropTypes.string
};

ReviewList.defaultProps = {
  emptyText: 'There is no reviews'
};

export default ReviewList;
