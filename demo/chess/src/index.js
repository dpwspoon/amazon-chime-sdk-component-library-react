// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ReactDOM from 'react-dom';
import ChessDemo from './ChessDemo';
//import Chat from './Chat';
import configureAmplify from './services/servicesConfig';

// Call services configuration
configureAmplify();

document.addEventListener('DOMContentLoaded', _event => {
  ReactDOM.render(<ChessDemo />, document.getElementById('root'));
  //ReactDOM.render(<Chat />, document.getElementById('root'));
});
