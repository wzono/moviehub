import React from 'react';
import { withNavigation } from 'react-navigation'

const withNavigationOnce = WrappedComponent => {
    class HOC extends React.Component {
        navigateOnce = (routeName, props, ms = 300) => {
            const { navigation } = this.props
            !this.navigating &&  navigation.push(routeName, props)
            this.navigating = true
            setTimeout(() => this.navigating = false, ms)
        }

        render() {
            return <WrappedComponent {...this.props} navigateOnce={this.navigateOnce} />;
        }
    }

    return withNavigation(HOC);
};

export default withNavigationOnce;
