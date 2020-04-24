import React, { Component } from 'react'
import { getFavorites } from "../services/movies";
import MovieList from "../components/MovieComponents/MovieList";
import withRefetch from "../components/hoc/withRefetch";
import { View, StyleSheet } from "react-native";
import EventBus from 'react-native-event-bus'
import Theme from "../Theme";
import EventNames from '../EventNames'
class FavoriteScreen extends Component {
    state = {
        favorites: [],
        refreshing: false
    }

    initialFavorites = (showRefreshing = true) => {
        const { refetch: { fetchUntilSuccess } } = this.props
        showRefreshing && this.setState({ refreshing: true })
        fetchUntilSuccess(getFavorites).then(favorites => {
            this.setState({
                favorites,
            })
        }).finally(() => {
            this.setState({ refreshing: false})
        })
    }

    registerUpdateEvent = () => {
        EventBus.getInstance().addListener(EventNames.FavoriteUpdate, this.listener = () => {
            requestAnimationFrame(() => this.initialFavorites(false))
        })
    }

    unregisterUpdateEvent = () => {
        EventBus.getInstance().removeListener(this.listener)
    }

    componentDidMount() {
        requestAnimationFrame(() => this.initialFavorites(false))
        this.registerUpdateEvent()
    }

    componentWillUnmount() {
        this.unregisterUpdateEvent()
    }

    render() {
        const { favorites, refreshing } = this.state

        return (
            <View style={styles.container}>
                <MovieList
                    movies={favorites}
                    emptyText="Empty Favorite List"
                    emptySubtext="Go to add one!"
                    onRefresh={() => this.initialFavorites()}
                    refreshing={refreshing}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.colors.background,
        flex: 1,
        paddingVertical: Theme.spacing.tiny
    }
})

export default withRefetch(FavoriteScreen)