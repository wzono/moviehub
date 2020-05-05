import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, } from 'react-native';
import ReviewUserScore from './ReviewUserScore';
import { AppButton, AppText } from '../common';
import Theme from '../../Theme';
import { parseReleaseDate } from '../../utils/movies'
import { getUsefulCountIcon } from "../../utils/icons";
import { unescape } from '../../utils/utils'

class ReviewListItem extends React.Component {
  state = {
    toShowDetail: false,
    showMore: true,
  }

  onPress = () => {
    this.state.showMore && this.setState({ toShowDetail: !this.state.toShowDetail });
  };

  formatContent = (str) => {
    return unescape(str.split('\n').map(s => s.trim()).filter(v => v).join('\n\n'))
  }


  render() {
    const { review } = this.props;
    const { toShowDetail, showMore } = this.state;
    const NUM_OF_LINES = toShowDetail ? 0 : 3
    const buttonText = toShowDetail ? '收起' : '展开'

    return (
      <View
        style={styles.container}
      >
        <View style={styles.lineWrapper}>
          <AppText type="subTitle" numberOfLines={1} style={styles.user}>
            {review.author}
          </AppText>
          <ReviewUserScore review={review}/>
        </View>
        <View style={styles.lineWrapper}>
          <AppText type="headline" style={styles.title}>
            {review.title.trim()}
          </AppText>
        </View>
        <AppText
          style={styles.content}
          numberOfLines={NUM_OF_LINES}
          onTextLayout={({ nativeEvent: { lines } }) =>
            this.setState({ showMore: lines.length > NUM_OF_LINES })
          }
        >
          {this.formatContent(review.content)}
        </AppText>
        {showMore && <AppButton toScale={false} onlyText onPress={this.onPress} style={styles.button}>{buttonText}</AppButton>}
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
    paddingTop: Theme.spacing.tiny,
  },
});

ReviewListItem.propTypes = {
  review: PropTypes.object.isRequired
};

export default ReviewListItem;
