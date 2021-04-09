// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const appConfig = {
  useCredentialExchangeService: true,
  credentialExchangeServiceApiGatewayInvokeUrl: 'https://fyasb7nh0e.execute-api.us-east-1.amazonaws.com/Stage/creds',
  createGameInvokeUrl: 'https://fyasb7nh0e.execute-api.us-east-1.amazonaws.com/Stage/games',
  //cognitoUserPoolId: 'us-east-1_JDEDGohIN',
  //cognitoAppClientId: 'miurirdkf51gnjvdms7l95igq',
  //cognitoIdentityPoolId: 'us-east-1:ce033169-ea04-4271-9f42-e6d8d1a356af',
  appInstanceArn: 'arn:aws:chime:us-east-1:925089040268:app-instance/838f90d8-4395-47ed-a2b2-c6fa3cf5a7ce',
  region: 'us-east-1'
  //attachments_s3_bucket_name: 'chimedemo-chatattachmentsbucket-ie3vmpw9u0bc'
};
export default appConfig;
