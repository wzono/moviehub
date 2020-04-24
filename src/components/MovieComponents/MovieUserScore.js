import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { AppText } from '../common';
import { getFontStyleObject } from '../../utils/font';
import Theme from '../../Theme';

class MovieUserScore extends React.Component {
    getScoreColorStyle(score) {
        const { success, danger, warning } = Theme.colors;
        const color = score > 7 ? success : score > 5 ? warning : danger;
        return { color };
    }


    render() {
        const { movie, style, ...props } = this.props;
        const doubanRating = movie.douban_rating;
        const imdbRating = movie.imdb_rating;

        return (
            <>
                {doubanRating && <AppText
                    style={[styles.text, this.getScoreColorStyle(doubanRating), style]} {...props}>{`${(doubanRating).toFixed(1)} Douban`}</AppText>}
                {!!doubanRating && !!imdbRating && <AppText style={[styles.text, style]}>/</AppText>}
                {!!imdbRating && <AppText
                    style={[styles.text, this.getScoreColorStyle(imdbRating), style]} {...props}>{`${(imdbRating).toFixed(1)} IMDb`}</AppText>}
            </>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        ...getFontStyleObject({ weight: 'Bold' })
    }
});

MovieUserScore.propTypes = {
    movie: PropTypes.object.isRequired,
    style: PropTypes.any,
};

export default MovieUserScore;
