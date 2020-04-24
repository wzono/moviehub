import React from 'react';
import PropTypes from 'prop-types';
import { AppText } from '../common';
import Theme from '../../Theme';
import { View } from "react-native";

class MovieRegions extends React.PureComponent {
    generateRegionsText = regions =>
        regions
            .map(g => g.name)
            .splice(0, 4)
            .reduce((acc, cur) => `${acc} · ${cur}`);
    renderRegions = (regions, style) => regions &&
        regions.length > 0 && (
            <AppText style={[style, { color: Theme.gray.lighter }]}>
                {this.generateRegionsText(regions)}
            </AppText>
        )

    renderLang = (lang, style) => lang && (
        <AppText style={[style, { color: Theme.gray.lighter }]}>{lang}</AppText>
    )

    renderSep = (style) => (
        <AppText style={[style, { color: Theme.gray.light, fontWeight: "700" }]}> 丨 </AppText>
    )

    render() {
        const {
            style,
            movie: { regions, lang }
        } = this.props;
        const langs = lang.split(',').filter(i => i).splice(0, 3).join(' · ')
        return (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                {this.renderRegions(regions, style)}
                {regions.length && langs && this.renderSep(style)}
                {this.renderLang(langs, style)}
            </View>
        )

    }
}

MovieRegions.propTypes = {
    movie: PropTypes.object,
    style: PropTypes.any
};

export default MovieRegions;
