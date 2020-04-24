import React from 'react'
import { StyleSheet, View } from 'react-native'
import Theme from "../../Theme";
import { AppText } from "../common";

class MovieSummary extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    formatContent = content => content.split('\n').join('\n\n')

    render() {
        const { title, content, style } = this.props;
        if (!content) {
            return null
        }

        return (
            <View style={[styles.container, style]}>
                <AppText style={[styles.mb, Theme.typography.subTitle]} type="headline">{title}</AppText>
                <AppText style={styles.content}>{this.formatContent(content)}</AppText>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Theme.spacing.tiny
    },
    mb: {
        marginBottom: Theme.spacing.tiny
    },
    content: {
        color: Theme.gray.light
    }
})



export default MovieSummary