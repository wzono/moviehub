import React from 'react';
import { withMappedNavigationProps }  from 'react-navigation-props-mapper'
import { View, StyleSheet, ScrollView } from 'react-native';
import withDelayedLoading from '../../components/hoc/withDelayedLoading';
import Theme from '../../Theme';
import ReviewDetail from "../../components/MovieComponents/ReviewDetail";

class MovieReviewDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title') || " "
    return ({
      title: title
    });
  }

  render() {
    const { navigation } = this.props;
    const review = navigation.getParam("review") || {}
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <ReviewDetail review={review} />
        </ScrollView>
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

export default withMappedNavigationProps()(withDelayedLoading(MovieReviewDetailScreen));
