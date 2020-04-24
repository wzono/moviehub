import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TouchableScale } from '../common';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';
import withNavigationOnce from "../hoc/withNavigationOnce";
import ProgressiveImage from "../ProgressiveImage";

const { width } = Dimensions.get('window');
const PREVIEW_WIDTH = width * 0.27;

export class MoviePreview extends React.PureComponent {
  static getPreviewHeight = () => PREVIEW_WIDTH / Theme.specifications.posterAspectRation;

  onPress = () => {
    const { movie, navigateOnce } = this.props;
    navigateOnce(RouteNames.MovieDetailScreen, { movie });
  };

  renderMovie() {
    const { movie, highPriority } = this.props;
    const priority = highPriority ? FastImage.priority.high : FastImage.priority.normal;
    return (
      <ProgressiveImage
        style={styles.image}
        imageStyle={{ borderRadius: 8 }}
        source={{ uri: movie.cover, priority }}
      />
    );
  }

  renderEmptyMovieView = () => <View style={styles.image} />;

  render() {
    const { movie, style } = this.props;

    return (
      <TouchableScale
        disabled={!movie}
        scaleFactor={0.97}
        style={[styles.container, style]}
        onPress={this.onPress}
      >
        {movie ? this.renderMovie() : this.renderEmptyMovieView()}
      </TouchableScale>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.tiny
  },
  image: {
    width: PREVIEW_WIDTH,
    aspectRatio: Theme.specifications.posterAspectRation,
    borderRadius: 8,
    backgroundColor: Theme.colors.transparentBlack
  }
});

MoviePreview.propTypes = {
  movie: PropTypes.object,
  highPriority: PropTypes.bool,
  style: PropTypes.any
};

export default withNavigationOnce(MoviePreview);
