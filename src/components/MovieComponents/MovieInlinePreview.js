import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet } from 'react-native';
import MovieScoreYear from './MovieScoreYear';
import { AppText, TouchableHighlightView } from '../common';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';
import withNavigationOnce from "../hoc/withNavigationOnce";
import ProgressiveImage from "../ProgressiveImage";

class MovieInlinePreview extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  onPress = () => {
    const { navigateOnce, movie } = this.props;
    navigateOnce(RouteNames.MovieDetailScreen, { movie });
  };

  render() {
    const { movie } = this.props;
    return (
      <TouchableHighlightView
        scaleFactor={0.98}
        contentStyle={styles.container}
        onPress={this.onPress}
      >
        <ProgressiveImage style={styles.poster} source={{ uri: movie.cover }} />
        <View style={styles.textWrapper}>
          <AppText type="headline" numberOfLines={1} style={styles.title}>
            {movie.title}
          </AppText>
          <MovieScoreYear movie={movie} />
        </View>
      </TouchableHighlightView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 96,
    paddingVertical: Theme.spacing.xTiny
  },
  poster: {
    height: '100%',
    aspectRatio: Theme.specifications.posterAspectRation,
    marginHorizontal: Theme.spacing.tiny,
    backgroundColor: Theme.gray.dark
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    width: '95%',
    marginBottom: Theme.spacing.tiny
  }
});

MovieInlinePreview.propTypes = {
  movie: PropTypes.object.isRequired
};

export default withNavigationOnce(MovieInlinePreview);
