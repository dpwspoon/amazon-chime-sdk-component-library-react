// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const appConfig = {
  useCredentialExchangeService: true,
  credentialExchangeServiceApiGatewayInvokeUrl: 'https://5j4habydol.execute-api.us-east-1.amazonaws.com/Stage/creds',
  cognitoUserPoolId: 'us-east-1_JDEDGohIN',
  cognitoAppClientId: 'miurirdkf51gnjvdms7l95igq',
  cognitoIdentityPoolId: 'us-east-1:ce033169-ea04-4271-9f42-e6d8d1a356af',
  appInstanceArn: 'arn:aws:chime:us-east-1:925089040268:app-instance/4f2b2b75-2aa1-4bdc-accc-9883ae37c4cf',
  region: 'us-east-1',
  attachments_s3_bucket_name: 'chimedemo-chatattachmentsbucket-ie3vmpw9u0bc'
};
export default appConfig;
