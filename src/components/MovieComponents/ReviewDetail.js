import React from 'react';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import { AppText, IconButton } from '../common';
import withRefetch from '../hoc/withRefetch';
import Theme from '../../Theme';
import { fetchMovieReviewDetail } from "../../services/movies";
import ReviewUserScore from "./ReviewUserScore";
import { unescape, unescapeEntity } from "../../utils/utils";
import { parseReleaseDate } from "../../utils/movies";
import { getReviewUsefulIcon } from "../../utils/icons";


class ReviewDetail extends React.PureComponent {
  state = {
    reviewDetail: {},
  };

  componentDidMount() {
    requestAnimationFrame(() => this.loadDetailedInfo());
  }

  loadDetailedInfo = async () => {
    const { refetch: { fetchUntilSuccess }, review } = this.props
    fetchUntilSuccess(() => fetchMovieReviewDetail(review.id)).then(res => {
      this.setState({ reviewDetail: res })
      this.configureDetailsAnimation()
    })
  };

  configureDetailsAnimation() {
    const { scaleY } = LayoutAnimation.Properties;
    const type = LayoutAnimation.Types.easeOut;

    LayoutAnimation.configureNext({
      duration: 250,
      update: { type, property: scaleY }
    });
  }

  formatContent = (str = '') => {
    return unescapeEntity(str.split('\n').map(s => s.trim()).filter(v => v).join('\n\n'))
  }

  render() {
    const { reviewDetail } = this.state;
    const { review } = this.props
    const usefulCount = `${review.useful_count}`
    return (
      <View style={styles.container}>
        <AppText type="title2" style={styles.title}>
          {review.title.trim()}

        </AppText>
        <View style={styles.lineWrapper}>
          <AppText style={{ color: Theme.gray.light }}>
            {review.author}
          </AppText>
          <AppText style={{ color: Theme.gray.light }}>
            {parseReleaseDate(review.created_at)}
          </AppText>
        </View>
        <ReviewUserScore review={review}/>
        {reviewDetail.content && <AppText
          style={styles.content}
        >
          {this.formatContent(reviewDetail.content)}
        </AppText>}
        <View style={styles.usefulWrapper}>
          <IconButton
            disabled={true}
            toScale={false}
            style={styles.iconButton}
            Icon={getReviewUsefulIcon()}
            text={usefulCount}
          />
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
    flex: 1,
    flexShrink: 1,
  },
  lineWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.tiny,
  },
  title: {
    paddingVertical: Theme.spacing.tiny,
    fontWeight: '600'
  },
  content: {
    color: Theme.gray.light,
    letterSpacing: 1,
    marginVertical: Theme.spacing.base,
    fontSize: 16,
  },
  usefulWrapper: {
    marginVertical: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButton: {
    height: 78,
    width: '25%',
    marginVertical: Theme.spacing.xTiny,

  }
});

export default withRefetch(ReviewDetail);
