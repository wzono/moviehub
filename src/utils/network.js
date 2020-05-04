import { Linking } from 'react-native';
import Config from '../Config';

export const safeOpenURL = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else if (Config.logNetworkErrors) {
      console.log(`Error opening ${url}`);
    }
  });
};
