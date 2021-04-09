/* eslint-disable import/no-unresolved */
// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  lightTheme,
  NotificationProvider,
  darkTheme,
  GlobalStyles,
} from 'amazon-chime-sdk-component-library-react';
import routes from './constants/routes';
import Notifications from './containers/Notifications';
import './Chat.css';
import { AppStateProvider, useAppState } from './providers/AppStateProvider';
import { AuthProvider } from './providers/AuthProvider';
import Signin from './views/Signin';
import Chess from './views/Chess';
import { MessagingProvider } from './providers/ChatMessagesProvider';
import { UserPermissionProvider } from './providers/UserPermissionProvider';
import Authenticated from './components/Authenticated';
import { IdentityProvider } from './providers/IdentityProvider';

const ChessDemo = () => (
  <Router>
    <div> KM TEST TEST TEST </div>
    <AppStateProvider>
      <Theme>
        <NotificationProvider>
          <div> KM TEST TEST TEST 11111</div>
          <Notifications />
          <AuthProvider>
            <div> KM TEST TEST TEST XXXXXXX</div>
            <Authenticated />
            <IdentityProvider>
              <div> KM TEST TEST TEST YYYYYYY</div>
              <Switch>
                <Route path={routes.CHESSDEMO}>
                  <div> KM TEST TEST TEST 222222</div>
                  <MessagingProvider>
                    <UserPermissionProvider>
                      <Chess />
                    </UserPermissionProvider>
                  </MessagingProvider>
                </Route>
                <Route exact path={routes.SIGNIN} component={Signin} />
              </Switch>
            </IdentityProvider>
          </AuthProvider>
        </NotificationProvider>
      </Theme>
    </AppStateProvider>
  </Router>
);

const Theme = ({ children }) => {
  const { theme } = useAppState();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default ChessDemo;
