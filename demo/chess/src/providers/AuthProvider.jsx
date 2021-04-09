/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';
import { useNotificationDispatch } from 'amazon-chime-sdk-component-library-react';
import appConfig from '../Config';
import { Credentials } from 'aws-sdk';

// proxy for when using Cognito vs Credential Exchange Service
let credentials;
function getAwsCredentials() {
  return credentials;
}

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const notificationDispatch = useNotificationDispatch();
  // Member
  const [member, setMember] = useState({
    username: '',
    userId: '',
  });
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [awsCredentials, setAwsCredentials] = useState('');

  const userSignOut = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.log(`error siging out ${error}`);
    }
  };

  const userSignUp = async (username, password) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          // TODO: Utilize input field for email that way we can then have users self confirm after reg.
          email: 'email@me.com',
          profile: 'none',
        },
      });
      notificationDispatch({
        type: 0,
        payload: {
          message:
            'Your registration information has been set to your administrator. Contact them for additional instructions.',
          severity: 'success',
        },
      });
    } catch (error) {
      console.log('error signing up:', error);
      notificationDispatch({
        type: 0,
        payload: {
          message: 'Registration failed.',
          severity: 'error',
        },
      });
    }
  };

  const updateUserAttributes = async (userId) => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      await Auth.updateUserAttributes(user, {
        profile: userId,
      });
      console.log("KMKMKMKMKM:  user is authenticated");
    } catch (err) {
      console.log(err);
      console.log("KMKMKMKMKM:  " + err);
    }
  };

  const getAwsCredentialsFromCognito = async () => {
    const creds = await Auth.currentCredentials();
    const essentialCreds = await Auth.essentialCredentials(creds);
    setAwsCredentials(essentialCreds);
    credentials = essentialCreds;
    return essentialCreds;
  };

  const setAuthenticatedUserFromCognito = () => {
    Auth.currentUserInfo()
      .then(curUser => {
        setMember({ username: curUser.username, userId: curUser.id });
        if (curUser.attributes?.profile === 'none') {
          updateUserAttributes(curUser.id);
          // Once we set attribute let's have user relogin to refresh SigninHookFn trigger.
          setIsAuthenticated(false);

          notificationDispatch({
            type: 0,
            payload: {
              message:
                'Your account is activated! Please sign in again to confirm.',
              severity: 'success',
            },
          });
        } else {
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        console.log(`Failed to set authenticated user! ${err}`);
      });
    getAwsCredentialsFromCognito();
  };

  const setAuthenticatedUserFromCredentialExchangeService = (response) => {
    console.log(response);
    setMember({
      username: response.ChimeDisplayName,
      userId: response.ChimeUserId
    });
    const stsCredentials = response.ChimeCredentials;
    updateUserAttributes(response.ChimeUserId);
    credentials = new Credentials(stsCredentials.AccessKeyId, stsCredentials.SecretAccessKey, stsCredentials.SessionToken);
    setAwsCredentials(stsCredentials);

    setIsAuthenticated(true);
  };

  const userSignIn = (username, password) => {
    if (appConfig.useCredentialExchangeService) {
      fetch(appConfig.credentialExchangeServiceApiGatewayInvokeUrl, {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
        })
      }).then(response => response.json())
        .then(data => setAuthenticatedUserFromCredentialExchangeService(data))
        .catch(err => {
          console.log(err);
          notificationDispatch({
            type: 0,
            payload: {
              message: 'Your username and/or password is invalid!',
              severity: 'error',
            },
          });
        });
    } else { //default to Cogntio via Amplify
      Auth.signIn({ username, password })
        .then(setAuthenticatedUserFromCognito)
        .catch((err) => {
          console.log(err);
          notificationDispatch({
            type: 0,
            payload: {
              message: 'Your username and/or password is invalid!',
              severity: 'error',
            },
          });
        });
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setAuthenticatedUserFromCognito)
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      });
  }, [Auth]);

  const authFulfiller = {
    member,
    isAuthenticated,
    awsCredentials,
    userSignOut,
    userSignUp,
    userSignIn,
  };

  return (
    <AuthContext.Provider value={authFulfiller}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuthContext, getAwsCredentials };
