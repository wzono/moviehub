import React from 'react';
import { View, StyleSheet, LayoutAnimation, Alert } from 'react-native';
import { AppText } from '../common';
import MovieBackdropWithTitle from './MovieBackdropWithTitle';
import MovieDetailsButtons from './MovieDetailsButtons';
import MovieGenres from './MovieGenres';
import MovieRegions from './MovieRegions'
import MovieScoreYear from './MovieScoreYear';
import withRefetch from '../hoc/withRefetch';
import { MoviePreview as MoviePreViewClass } from './MoviePreview';
import Theme from '../../Theme';
import MovieSummary from "./MovieSummary";
import MovieMakers from "./MovieMakers";
import MovieTitles from "./MovieTitles";
import { fetchMovieDetail, getReviewFetchFunctionFromId } from "../../services/movies";
import ReviewFetchList from "./ReviewFetchList";


class MovieDetails extends React.PureComponent {
  state = {
    recommendedMovies: [],
    movieDetail: {},
  };

  componentDidMount() {
    requestAnimationFrame(() => this.loadDetailedInfo());
  }

  loadDetailedInfo = async () => {
    const { refetch: { fetchUntilSuccess }, movie } = this.props
    fetchUntilSuccess(() => fetchMovieDetail(movie.id)).then(res => {
      this.setState({ movieDetail: res })
      this.configureDetailsAnimation();
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
    const { movieDetail } = this.state;
    const { movie } = this.props
    const reviewFetchFunc = getReviewFetchFunctionFromId(movie.id)
    return (
      <View style={styles.container}>
        <MovieBackdropWithTitle movie={movie} />
        <View style={styles.mh}>
          <MovieScoreYear style={styles.mb} movie={movie} />
          {!!movieDetail.genres?.length && <MovieGenres style={styles.mb} movie={movieDetail} />}
          {!!movieDetail.regions?.length && <MovieRegions style={styles.mb} movie={movieDetail} />}
          <MovieDetailsButtons movie={movie} />
          <AppText type="headline">Overview</AppText>
          <MovieSummary title="Douban" content={movieDetail.douban_summary} />
          <MovieSummary title="IMDb" content={movieDetail.imdb_summary} />
          <AppText style={styles.bigTitle} type="headline">Movie Makers</AppText>
          <MovieMakers movie={movieDetail} />
          <MovieTitles movie={movieDetail} />
          <View style={styles.reviewWrapper}>
          </View>
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
  },
});

export default withRefetch(MovieDetails);
