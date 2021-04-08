// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const appConfig = {
  useCredentialExchangeService: true,
  credentialExchangeServiceApiGatewayInvokeUrl: 'https://odl43h1zea.execute-api.us-east-1.amazonaws.com/Stage/creds',
  createGameInvokUrl: 'https://odl43h1zea.execute-api.us-east-1.amazonaws.com/Stage/games',
  //cognitoUserPoolId: 'us-east-1_JDEDGohIN',
  //cognitoAppClientId: 'miurirdkf51gnjvdms7l95igq',
  //cognitoIdentityPoolId: 'us-east-1:ce033169-ea04-4271-9f42-e6d8d1a356af',
  appInstanceArn: 'arn:aws:chime:us-east-1:770433969263:app-instance/93bc3b74-ff21-43f7-9694-8281a98f865a',
  region: 'us-east-1'
  //attachments_s3_bucket_name: 'chimedemo-chatattachmentsbucket-ie3vmpw9u0bc'
};
export default appConfig;
