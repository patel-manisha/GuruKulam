import React, { Component } from 'react';
import { Platform, StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import colors from "./src/themes/appColors";
import constantsUtils from "./src/utils/constantsUtils";
import Routes from './src/Routes';

import { createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './src/Redux/reducers';
import MyFirebaseMessageing from './src/services/MyFirebaseMessageing';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}
const store = configureStore({});


export default class App extends Component {


  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
        <View style={{ flex: 1 }}>
          <View style={[{ height: constantsUtils.STATUSBAR_HEIGHT, backgroundColor: colors.black }]}>
            <StatusBar barStyle="light-content" />
            <View style={{ backgroundColor: colors.black, height: constantsUtils.APPBAR_HEIGHT }} />
          </View>
          <Provider store={store}>
            <Routes />
            <MyFirebaseMessageing />
          </Provider>


        </View>
      </SafeAreaView>
    );
  }
}