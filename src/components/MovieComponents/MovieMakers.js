import React, { PureComponent } from 'react'
import AppText from "../common/AppText";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types"
import Theme from "../../Theme";

class MovieMakers extends PureComponent {
    constructor(props) {
        super(props);
    }

    generatePersons = persons => persons.map(person => person.name).join('、')

    render() {
        const { movie: { actors, directors, writers } } = this.props
        const [hasActors, hasDirectors, hasWriters] = [!!actors?.length, !!directors?.length, !!writers?.length]
        return (
            <View>
                {hasDirectors && <View style={styles.subContainer}>
                    <AppText type="headline" style={Theme.typography.subTitle}>Director</AppText>
                    <AppText style={styles.content}>{this.generatePersons(directors)}</AppText>
                </View>}
                {hasWriters && <View style={styles.subContainer}>
                    <AppText type="headline" style={Theme.typography.subTitle}>Writer</AppText>
                    <AppText style={styles.content}>{this.generatePersons(writers)}</AppText>
                </View>}
                {hasActors && <View style={styles.subContainer}>
                    <AppText type="headline" style={Theme.typography.subTitle}>Actor</AppText>
                    <AppText style={styles.content}>{this.generatePersons(actors)}</AppText>
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer: {
        marginBottom: Theme.spacing.tiny
    },
    content: {
        marginTop: Theme.spacing.tiny,
        color: Theme.gray.light,
        ...Theme.typography.caption1
    }
})

MovieMakers.propsType = {
    movie: PropTypes.object.require
}

export default MovieMakers