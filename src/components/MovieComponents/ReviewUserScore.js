import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { AppText } from '../common';
import { getFontStyleObject } from '../../utils/font';
import Theme from '../../Theme';

class ReviewUserScore extends React.Component {
  getScoreColorStyle(score) {
    const { success, danger, warning } = Theme.colors;
    const color = score > 7 ? success : score > 5 ? warning : danger;
    return { color };
  }


  render() {
    const { review, style, ...props } = this.props;
    const rating = review.rating || 0
    const source = String(review.source).toUpperCase()

    return (
      <AppText style={[styles.text, this.getScoreColorStyle(rating), style]} {...props}>{`${(rating).toFixed(1)} ${source}`}</AppText>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    ...getFontStyleObject({ weight: 'Bold' })
  }
});

ReviewUserScore.propTypes = {
  review: PropTypes.object.isRequired,
  style: PropTypes.any,
};

export default ReviewUserScore;
