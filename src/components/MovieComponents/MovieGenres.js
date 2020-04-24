import React from 'react';
import PropTypes from 'prop-types';
import { AppText } from '../common';
import Theme from '../../Theme';
import { View } from "react-native";

class MovieGenres extends React.PureComponent {
  generateGenresText = genres =>
    genres
      .map(g => g.name)
      .splice(0, 4)
      .reduce((acc, cur) => `${acc} · ${cur}`);

  renderGenres = (genres, style) => genres &&
      genres.length > 0 && (
          <AppText style={[style, { color: Theme.gray.lighter }]}>{this.generateGenresText(genres)}</AppText>
      )

  renderDuration = (duration, style) => duration && (
      <AppText style={[style, { color: Theme.gray.lighter }]}>{duration} 分钟</AppText>
  )

  renderSep = (style) => (
      <AppText style={[style, { color: Theme.gray.light, fontWeight: "700" }]}> 丨 </AppText>
  )

  render() {
    const {
      style,
      movie: { genres, duration }
    } = this.props;

    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          {!!genres.length && this.renderGenres(genres, style)}
          {!!genres.length && !!duration && this.renderSep(style)}
          {!!duration && this.renderDuration(duration, style)}
        </View>
    )
  }
}

MovieGenres.propTypes = {
  movie: PropTypes.object,
  style: PropTypes.any
};

export default MovieGenres;
