import React from 'react';
import { View, StyleSheet, LayoutAnimation } from 'react-native';
import { AppText } from '../common';
import MovieBackdropWithTitle from './MovieBackdropWithTitle';
import MovieDetailsButtons from './MovieDetailsButtons';
import MovieGenres from './MovieGenres';
import MovieRegions from './MovieRegions'
import MovieScoreYear from './MovieScoreYear';
import withRefetch from '../hoc/withRefetch';
import Theme from '../../Theme';
import { MoviePreview as MoviePreViewClass } from './MoviePreview';
import MovieSummary from "./MovieSummary";
import MovieMakers from "./MovieMakers";
import MovieTitles from "./MovieTitles";


class MovieDetails extends React.PureComponent {
  state = {
    recommendedMovies: [],
    movie: {}
  };

  componentDidMount() {
    requestAnimationFrame(() => this.loadDetailedInfo());
  }

  loadDetailedInfo = async () => {
    this.configureDetailsAnimation();
    this.setState({ movie: this.props.movie})
  };

  configureDetailsAnimation() {
    const { scaleY } = LayoutAnimation.Properties;
    const type = LayoutAnimation.Types.easeOut;

    LayoutAnimation.configureNext({
      duration: 250,
      update: { type, property: scaleY }
    });
  }

  configureRecommendationsAnimation() {
    const { opacity } = LayoutAnimation.Properties;
    const type = LayoutAnimation.Types.easeOut;

    LayoutAnimation.configureNext({
      duration: 250,
      create: { type, property: opacity },
      delete: { type, property: opacity }
    });
  }

  render() {
    const { movie } = this.state;
    const { movie: movieInfo } = this.props
    return (
      <View style={styles.container}>
        <MovieBackdropWithTitle movie={movieInfo} />
        <View style={styles.mh}>
          <MovieScoreYear style={styles.mb} movie={movieInfo} />
          {!!movie.genres?.length && <MovieGenres style={styles.mb} movie={movie} />}
          {!!movie.regions?.length && <MovieRegions style={styles.mb} movie={movie} />}
          <MovieDetailsButtons movie={movieInfo} />
          <AppText type="headline">Overview</AppText>
          <MovieSummary title="Douban" content={movieInfo.douban_summary} />
          <MovieSummary title="IMDb" content={movie.imdb_summary} />
          <AppText style={styles.bigTitle} type="headline">Movie Makers</AppText>
          <MovieMakers movie={movie} />
          <MovieTitles movie={movie} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.small
  },
  bigTitle: {
    marginTop: Theme.spacing.base,
    marginBottom: Theme.spacing.tiny
  },
  mb: {
    marginBottom: Theme.spacing.tiny
  },
  mh: {
    marginHorizontal: Theme.spacing.small
  },
  noMoviesContainer: {
    width: '100%',
    height: MoviePreViewClass.getPreviewHeight(),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default withRefetch(MovieDetails);
