import React from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../Theme';

const { smallIconSize, iconSize, largeIconSize, hugeIconSize } = Theme.specifications;
const { primary: primaryColor } = Theme.colors;
const {
  lightest: lightestColor,
  lighter: lighterColor,
  light: lightColor,
  darkest: darkestColor
} = Theme.gray;
const { tiny } = Theme.spacing;

// ------------------------------------------------------
// MovieDetailsButtons
// ------------------------------------------------------

export const getAddToFavoritesIcon = ({ inFavorite }) => (
  <IconMaterialIcons
    name={inFavorite ? 'favorite' : 'favorite-border'}
    color={inFavorite ? primaryColor : lightestColor}
    size={iconSize}
  />
);

export const getOpenDoubanIcon = ({ disabled }) => (
  <IconMaterialCommunityIcons
    name="movie"
    color={disabled ? lightColor : lightestColor}
    size={iconSize}
  />
)


export const getOpenImdbIcon = ({ disabled }) => (
  <IconMaterialCommunityIcons
    name="movie-roll"
    color={disabled ? lightColor : lightestColor}
    size={iconSize}
  />
);

export const getOpenReviewIcon = ()  => (
  <IconMaterialCommunityIcons name="comment" color={lighterColor } size={iconSize} />
)


// ------------------------------------------------------
// MovieSearchResults
// ------------------------------------------------------
export const getEmptySearchIcon = () => (
  <IconFeather name="alert-circle" color={lightestColor} size={hugeIconSize} />
);

export const getInitialSearchIcon = () => (
  <IconEvilIcons name="search" color={lightestColor} size={hugeIconSize} />
);


// ------------------------------------------------------
// SearchInput
// ------------------------------------------------------
export const getSearchInputBackIcon = ({ style }) => (
  <IconEntypo name="chevron-thin-left" size={smallIconSize} color={darkestColor} style={style} />
);

export const getSearchInputLabelIcon = () => (
  <IconFeather
    name="search"
    color={darkestColor}
    size={smallIconSize * 1.1}
    style={{ paddingHorizontal: tiny }}
  />
);

export const getSearchInputCloseIcon = () => (
  <IconAntDesign name="close" color={darkestColor} size={smallIconSize * 1.2} />
);

// ------------------------------------------------------
// MovieList
// ------------------------------------------------------
export const getMovieListEmptyIcon = () => (
  <IconAntDesign name="smileo" color={lightestColor} size={hugeIconSize} />
);



// ------------------------------------------------------
// ReviewList
// ------------------------------------------------------
export const getReviewListEmptyIcon = () => (
  <IconAntDesign name="smileo" color={lightestColor} size={hugeIconSize} />
)

export const getReviewUsefulIcon = () => (
  <IconMaterialIcons
    name="favorite"
    color={primaryColor}
    size={iconSize}
  />
)



// ------------------------------------------------------
// Library
// ------------------------------------------------------
export const getLibrarySettingsIcon = () => (
  <IconFontAwesome
    name="cog"
    color={lightestColor}
    size={iconSize * 0.9}
    style={{ padding: tiny }}
  />
);

export const getLibraryWatchlistIcon = () => (
  <IconMaterialIcons name="watch-later" color={lightColor} size={iconSize * 0.8} />
);

export const getLibraryFavoriteIcon = () => (
  <IconMaterialCommunityIcons name="heart-multiple" color={lightColor} size={iconSize * 0.8} />
);

// ------------------------------------------------------
// Header
// ------------------------------------------------------
export const getHeaderBackIcon = () => (
  <IconEntypo
    name="chevron-left"
    color={lightestColor}
    size={iconSize}
    style={{ padding: Theme.spacing.tiny }}
  />
);

// ------------------------------------------------------
// Routes
// ------------------------------------------------------
export const getNavbarBrowseIcon = ({ tintColor }) => (
  <IconEntypo name="home" color={tintColor} size={iconSize * 0.9} />
);

export const getNavbarCategoryIcon = ({ tintColor }) => (
  <IconFeather name="grid" color={tintColor} size={iconSize * 0.9} />
);

export const getNavbarFavorIcon = ({ tintColor }) => (
  <IconFeather name="heart" color={tintColor} size={iconSize * 0.85} />
);

export const getUsefulCountIcon = ()  => (
  <IconFeather name="chevron-up" color={lightColor} size={smallIconSize} />
)
