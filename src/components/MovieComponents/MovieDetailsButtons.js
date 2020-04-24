import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Alert } from 'react-native';
import { IconButton } from '../common';
import withRefetch from '../hoc/withRefetch';
import { getIMDbLink, getDoubanLink } from '../../services/urls';
import { safeOpenURL } from '../../utils/network';
import {  getAddToFavoritesIcon, getOpenImdbIcon, getOpenDoubanIcon } from '../../utils/icons';
import Theme from '../../Theme';
import { add2Favorites, isInFavorites, removeFromFavorites } from "../../services/movies";
import EventBus from "react-native-event-bus";
import EventNames from '../../EventNames'
class MovieDetailsButtons extends React.PureComponent {
  state = {
    inFavorite: false,
    isFavoriteFetching: false
  };

  componentDidMount() {
    requestAnimationFrame(() => this.initialMovieFetch());
  }


  onAddToFavorites = async () => {
    const { movie } = this.props;
    const { inFavorite } = this.state;
    const action = inFavorite ? removeFromFavorites : add2Favorites

    this.setState({ inFavorite: !inFavorite, isFavoriteFetching: true });
    try {
      await action(movie.id)
      EventBus.getInstance().fireEvent(EventNames.FavoriteUpdate)
      this.setState({ inFavorite: !inFavorite });
    } catch (e) {
      this.setState({ inFavorite });
    } finally {
      this.setState({ isFavoriteFetching: false });
    }
  };

  initialMovieFetch() {
    const { movie, refetch } = this.props;

    refetch
      .fetchUntilSuccess(() => isInFavorites(movie.id))
      .then(favorite => {
        this.setState({ inFavorite: favorite });
      });
  }

  openImdb = () => {
    const { movie } = this.props;
    safeOpenURL(getIMDbLink(movie.imdb_id));
  };

  openDouban = () => {
    const { movie } = this.props;
    safeOpenURL(getDoubanLink(movie.douban_id));
  }

  render() {
    const { movie } = this.props;
    const { inFavorite, isFavoriteFetching } = this.state;
    const imdbDisabled = !movie.imdb_id
    const doubanDisabled = !movie.douban_id

    return (
      <View style={styles.container}>
          <IconButton
            disabled={isFavoriteFetching}
            style={styles.iconButton}
            onPress={this.onAddToFavorites}
            Icon={getAddToFavoritesIcon({ inFavorite })}
            text="Favorite"
          />
        <IconButton
            style={styles.iconButton}
            onPress={this.openDouban}
            Icon={getOpenDoubanIcon({ disabled: doubanDisabled })}
            text="Douban"
        />
        <IconButton
          disabled={imdbDisabled}
          style={styles.iconButton}
          onPress={this.openImdb}
          Icon={getOpenImdbIcon({ disabled: imdbDisabled })}
          text="IMDb"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Theme.colors.background,
    marginVertical: Theme.spacing.tiny
  },
  iconButton: {
    height: 78,
    width: '25%',
    marginVertical: Theme.spacing.xTiny
  }
});

MovieDetailsButtons.propTypes = {
  movie: PropTypes.object.isRequired,
};


export default withRefetch(MovieDetailsButtons);
