import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, } from 'react-native';
import ReviewUserScore from './ReviewUserScore';
import { AppButton, AppText } from '../common';
import Theme from '../../Theme';
import { parseReleaseDate } from '../../utils/movies'
import { getUsefulCountIcon } from "../../utils/icons";
import { unescapeEntity } from '../../utils/utils'
import RouteNames from "../../RouteNames";
import withNavigationOnce from "../hoc/withNavigationOnce";

class ReviewListItem extends React.Component {
  onPress = () => {
    const { review, navigateOnce, title } = this.props;
    navigateOnce(RouteNames.MovieReviewDetailScreen, { review, title });
  };


  render() {
    const { review } = this.props;
    const buttonText = '查看详情'

    return (
      <View
        style={styles.container}
      >
        <View style={styles.lineWrapper}>
          <AppText type="subTitle" numberOfLines={1} style={styles.user}>
            {review.author}
          </AppText>
          <ReviewUserScore review={review} />
        </View>
        <View style={styles.lineWrapper}>
          <AppText type="headline" style={styles.title}>
            {review.title.trim()}
          </AppText>
        </View>
        <AppText style={styles.content}>{unescapeEntity(review.content)}</AppText>
        <AppButton toScale={false} onlyText onPress={this.onPress} style={styles.button}>{buttonText}</AppButton>
        <View style={styles.lineWrapper}>
          <AppText style={{ color: Theme.gray.light }}>
            {parseReleaseDate(review.created_at)}
          </AppText>
          <AppText style={{ color: Theme.gray.light }}>
            {getUsefulCountIcon()} {review.useful_count}
          </AppText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: Theme.spacing.small,
    paddingVertical: Theme.spacing.small,
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.gray.dark,
    justifyContent: 'flex-start'
  },
  lineWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  user: {
    color: Theme.colors.textInputSelection,
  },
  title: {
    paddingVertical: Theme.spacing.tiny
  },
  content: {
    color: Theme.gray.light,
    letterSpacing: 1,
    marginVertical: Theme.spacing.tiny,
  },
  button: {
    alignItems: 'flex-start',
  },
});

ReviewListItem.propTypes = {
  review: PropTypes.object.isRequired
};

export default withNavigationOnce(ReviewListItem);
