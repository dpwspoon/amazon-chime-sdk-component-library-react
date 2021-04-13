/* eslint-disable import/no-unresolved */
// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, {useState, setState} from 'react';
import {Heading, Grid, Cell, Flex} from 'amazon-chime-sdk-component-library-react';
import { useTheme } from 'styled-components';
import LoginWithCognito from '../../containers/loginWithCognito/LoginWithCognito';
import LoginWithCredentialExchangeService from '../../containers/loginWithCredentialExchangeService/LoginWithCredentialExchangeService';
import { useAuthContext } from '../../providers/AuthProvider';

import './style.css';

const Signin = () => {
  const [signinProvider, updateSigninProvider] = useState('cognito');
  const { userSignIn, userSignUp, userExchangeCreds } = useAuthContext();
  const currentTheme = useTheme();

  const provider =
    signinProvider === 'cognito' ?
      <LoginWithCognito register={userSignUp} login={userSignIn} /> :
      <LoginWithCredentialExchangeService exchangeCreds={userExchangeCreds}/>;

  const signInMessage =
    signinProvider === 'cognito' ? 'Sign in with ' : 'Get AWS creds via ';

  return (
    <Grid
      gridTemplateRows="3rem 100%"
      gridTemplateAreas='
      "heading"
      "main"
      '
    >
      <Cell gridArea="heading">
        <Heading
          level={1}
          style={{
            backgroundColor: currentTheme.colors.greys.grey60,
            height: '3rem',
          }}
          className="app-heading"
        >
          Chat App
        </Heading>
      </Cell>
      <Cell gridArea="main">
        <Flex className="signin-container" layout="stack">
          <Heading
            css="font-size: 1.1875rem !important; line-height: 4rem !important;"
            level="1"
          >
            {signInMessage} <select name="signinProvider"
                                 id="signinProvider"
                                 onChange={e => updateSigninProvider(e.target.value)}>
              <option value="cognito">Cognito User Pools</option>
              <option value="ces">Credential Exchange Service</option>
            </select>
          </Heading>
          {provider}
        </Flex>
      </Cell>
    </Grid>
  );
};

export default Signin;
