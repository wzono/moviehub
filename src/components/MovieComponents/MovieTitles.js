import React, { PureComponent } from 'react'
import AppText from "../common/AppText";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types"
import Theme from "../../Theme";

class MovieTitles extends PureComponent {
    constructor(props) {
        super(props);
    }

    generateTitles = titles => titles.split('(港,台)').join('(港/台)').split(',').join('、')

    render() {
        const { movie: { origin_title, alias } } = this.props
        const [hasOriginTitle, hasAlias] = [!!origin_title, !!alias]
        if (!hasOriginTitle && !hasAlias) return null
        return (
            <View>
                {hasOriginTitle && <View style={styles.subContainer}>
                    <AppText type="headline" style={styles.bigTitle}>Origin Title</AppText>
                    <AppText style={styles.content}>{origin_title}</AppText>
                </View>}
                {hasAlias && <View style={styles.subContainer}>
                    <AppText type="headline" style={styles.bigTitle}>Alias</AppText>
                    <AppText style={styles.content}>{this.generateTitles(alias)}</AppText>
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bigTitle: {
        marginTop: Theme.spacing.base,
    },
    subContainer: {
        marginBottom: Theme.spacing.tiny
    },
    content: {
        marginTop: Theme.spacing.tiny,
        color: Theme.gray.light,
        ...Theme.typography.caption1
    }
})

MovieTitles.propsType = {
    movie: PropTypes.object.require
}

export default MovieTitles