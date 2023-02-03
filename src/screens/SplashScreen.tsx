import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from '@degenwallet/styles';

export const SplashScreen: () => React.ReactElement = () => {
  // const dispatch = useDispatch();
  // const state = useSelector<AppState, AppState>(state => state);

  //console.log('SplashScreen before state', state);

  //dispatch(walletLoad());
  //useEffect(() => {}, []);

  //console.log('SplashScreen before state', state);

  return <SafeAreaView style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
});
