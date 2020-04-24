import React from 'react'
import { createAppContainer, createBottomTabNavigator, createStackNavigator, StackActions } from "react-navigation";
import RouteNames from "./RouteNames";
import Header from './components/Header'
import { fromRightWithFade } from './utils/navigation'
import MovieDetailScreen from './screens/movie/MovieDetailScreen'
import MovieListScreen from './screens/movie/MovieListScreen'
import Browse from "./screens/Browse";
import Category from "./screens/Category";
import Favorite from "./screens/Favorite";
import Theme from "./Theme";
import { getFontStyleObject } from "./utils/font";
import { getNavbarBrowseIcon, getNavbarCategoryIcon, getNavbarFavorIcon } from "./utils/icons";
import NavbarWrapper from "./components/NavbarWrapper";
import NavbarButtonWrapper from "./components/NavbarButtonWrapper";

const defaultHeaderObject = {
  header: props => <Header scene={props.scene}/>
};

const TabNames = {
  browse: 'Browse',
  category: 'Category',
  favor: 'Favorite'
}

const createDefaultStackNavigator = (screensObject, customOptions) =>
  createStackNavigator(screensObject, {
    defaultNavigationOptions: { ...defaultHeaderObject },
    cardStyle: {
      backgroundColor: '#000'
    },
    headerMode: 'screen',
    transitionConfig: () => fromRightWithFade(),
    ...customOptions
  });

const BottomTabs = createBottomTabNavigator({
    [TabNames.browse]: createDefaultStackNavigator({
      Browse,
      [RouteNames.MovieListScreen]: MovieListScreen,
      [RouteNames.MovieDetailScreen]: MovieDetailScreen
    }),
    [TabNames.category]: createDefaultStackNavigator({
      Category,
      [RouteNames.MovieDetailScreen]: MovieDetailScreen
    }),
    [TabNames.favor]: createDefaultStackNavigator({
      Favorite,
      [RouteNames.MovieDetailScreen]: MovieDetailScreen
    })
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Theme.colors.bottomNavbar,
      inactiveBackgroundColor: Theme.colors.bottomNavbar,
      activeTintColor: Theme.gray.lightest,
      inactiveTintColor: Theme.gray.light,
      labelStyle: { ...getFontStyleObject() },
      style: {
        borderTopColor: Theme.colors.bottomNavbar,
        height: Theme.specifications.bottomNavbarHeight,
        backgroundColor: Theme.colors.bottomNavbar
      }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      lazy: false,
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case TabNames.browse:
            return getNavbarBrowseIcon({ tintColor })
          case TabNames.favor:
            return getNavbarFavorIcon({ tintColor })
          case TabNames.category:
            return getNavbarCategoryIcon({ tintColor })
          default:
            return null;
        }
      },
      tabBarComponent: NavbarWrapper,
      tabBarButtonComponent: NavbarButtonWrapper,
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.dispatch(StackActions.popToTop());
        defaultHandler();
      }
    })
  })

const HomeStack = createStackNavigator(
  { [RouteNames.BottomTabs]: { screen: BottomTabs } },
  { defaultNavigationOptions: () => ({ header: null }) }
)
/**
 * SwitchNavigator 用于一个Stack占用一个页面
 * @type {NavigationContainer}
 */
export const RootStack = createAppContainer(HomeStack)