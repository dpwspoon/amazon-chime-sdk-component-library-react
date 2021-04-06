// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const awsPath = '/Prod';
export const rootPath = window.location.href.includes(awsPath)
  ? `${awsPath}/`
  : '/';

const routes = {
  SIGNIN_WITH_COGNITO: `${rootPath}`,
  SIGNIN_WITH_CREDENTIAL_EXCHANGE_SERVICE: `${rootPath}signin-credential-exchange-service`,
  CHAT: `${rootPath}rooms`
};

export default routes;
