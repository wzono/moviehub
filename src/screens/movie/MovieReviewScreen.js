import React from 'react';
import { withMappedNavigationProps }  from 'react-navigation-props-mapper'
import { View, StyleSheet } from 'react-native';
import withDelayedLoading from '../../components/hoc/withDelayedLoading';
import Theme from '../../Theme';
import ReviewFetchList from "../../components/MovieComponents/ReviewFetchList";

class MovieReviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const movie = navigation.getParam('movie') || {}
    return ({
      title: movie.title || " "
    });
  }

  render() {
    const { fetchFunction } = this.props;
    return (
      <View style={styles.container}>
        <ReviewFetchList fetchFunction={fetchFunction} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  }
});

export default withMappedNavigationProps()(withDelayedLoading(MovieReviewScreen));
