// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const appConfig = {
  useCredentialExchangeService: true,
  credentialExchangeServiceApiGatewayInvokeUrl:
    'https://uj14mo9g66.execute-api.us-east-1.amazonaws.com/Stage/creds',
  cognitoUserPoolId: 'us-east-1_pAf9Oa2fs',
  cognitoAppClientId: '7pck89dnfa77dh9g4mggfhul9d',
  cognitoIdentityPoolId: 'us-east-1:ce033169-ea04-4271-9f42-e6d8d1a356af',
  appInstanceArn:
    'arn:aws:chime:us-east-1:925089040268:app-instance/dc1c062b-18d5-40a1-9ae3-5f1edc1b3612',
  region: 'us-east-1',
  attachments_s3_bucket_name: 'chimedemo-chatattachmentsbucket-ie3vmpw9u0bc'
};
export default appConfig;
