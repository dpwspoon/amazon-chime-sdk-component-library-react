/* eslint-disable import/no-extraneous-dependencies */
// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import AWS from 'aws-sdk';
import { getAwsCredentials } from '../providers/AuthProvider';

/**
 * @class IdentityService
 */
export class ChimeIdentityService {
  /**
   * @param {region}  region AWS region.
   * @param {userPoolId} userPoolId Cognito User Pool Id.
   */
  constructor(region, appInstanceArn) {
    this._region = region;
    this._appInstanceArn = appInstanceArn;
  }

  async getUsers(limit = 60) {
    try {
      const users = await this._identityClient
          .listAppInstanceUsers({
            AppInstanceArn: this._appInstanceArn,
            // UserPoolId: this._userPoolId
          })
          .promise();

      return users.AppInstanceUsers;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUser(userArn) {

  }

  async searchByName(name) {
    // try {
    //   const list = await this._identityClient
    //     .listUsers({
    //       Filter: `username ^= "${name}"`,
    //       Limit: 10,
    //       UserPoolId: this._userPoolId
    //     })
    //     .promise();
    //
    //   return list.Users;
    // } catch (err) {
    throw new Error(`Failed with error: Not Implemented`);
    // }
  }

  async setupClient() {
    const creds = getAwsCredentials();
    if (!creds) return;

    this._identityClient = new AWS.Chime({
      region: this._region,
      credentials: creds
    });
  }
}

export default ChimeIdentityService;
