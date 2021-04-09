/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import {
  Heading,
  Grid,
  Cell,
  useNotificationDispatch,
} from 'amazon-chime-sdk-component-library-react';
import { useTheme } from 'styled-components';
import ChannelsWrapper from '../../containers/channels/ChannelsWrapper';
import Messages from '../../containers/messages/Messages';
import Input from '../../containers/input/Input';
import './style.css';
import {
  useChatChannelState,
  useChatMessagingState,
} from '../../providers/ChatMessagesProvider';
import { useAuthContext } from '../../providers/AuthProvider';
import WithMoveValidation from './integrations/WithMoveValidation';
//import WithMoveValidation from "./integrations/WithMoveValidation";
import Chessboard from 'chessboardjsx';

const Chess = () => {
  const currentTheme = useTheme();

  const { member, userSignOut } = useAuthContext();
  const {
    messages,
    messagesRef,
    setMessages,
    onReceiveMessage,
  } = useChatMessagingState();
  console.log("KMKMKMK onReceiveMessage = " + onReceiveMessage);
  console.log("KMKMKMK messages = " + messages);
  console.log("KMKMKMK last message = " + (messages[messages.length-1] ? messages[messages.length-1].Content : 'none'));
  const notificationDispatch = useNotificationDispatch();

  const {
    setChannelMessageToken,
    setChannelList,
    activeChannel,
    activeChannelRef,
    channelList,
    hasMembership,
  } = useChatChannelState();

  const handleUserNameCopyClick = (_e) => {
    // Create new element
    const el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = member.userId;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);

    notificationDispatch({
      type: 0,
      payload: {
        message: 'UserId copied to clipboard!',
        severity: 'info',
        autoClose: true,
        autoCloseDelay: 1000,
      },
    });
  };

  return (
    <Grid
      gridTemplateColumns="1fr 10fr"
      gridTemplateRows="3rem 101%"
      style={{ width: '100vw', height: '100vh' }}
      gridTemplateAreas='
      "heading heading"
      "side main"      
      '
    >
      <Cell gridArea="heading">
        <Heading
          level={5}
          style={{
            backgroundColor: currentTheme.colors.greys.grey60,
            height: '3rem',
            paddingLeft: '1rem',
            color: 'white',
          }}
          className="app-heading"
        >
          Chess App
          <div className="user-block">
            <a className="user-info" href="#">
              {member.username || 'Unknown'}
              <span onClick={handleUserNameCopyClick} className="tooltiptext">
                Click to copy UserId to clipboard!
              </span>
            </a>

            <a href="#" onClick={userSignOut}>
              Log out
            </a>
          </div>
        </Heading>
      </Cell>
      <Cell gridArea="side" style={{ height: 'calc(100vh - 3rem)' }}>
        <div
          style={{
            backgroundColor: currentTheme.colors.greys.grey10,
            height: '100%',
            borderRight: `solid 1px ${currentTheme.colors.greys.grey30}`,
          }}
        >
          <ChannelsWrapper />
        </div>
      </Cell>
      <Cell gridArea="main" style={{ height: 'calc(100vh - 3rem)' }}>
        {activeChannel.ChannelArn ? (
	  // Ideally this would show moves for past games or the chessboard
	  // for an active game.  Past games is probably beyond the scope of
	  // what can be accomplished in 1.5 days, so just show the board
	  // for a new game.
          <>
            <div className="messaging-container">
	      <WithMoveValidation
		messages={messages}
		member={member}
	      />
            </div>
          </>
        ) : (
	  <div>
            <div className="messaging-container">
              <Chessboard
                id="EmptyBoard"
                calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
                boardStyle={{
                  borderRadius: '5px',
                  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                }}
              />
            </div>
	  </div>
        )}
      </Cell>
    </Grid>
  );
};

export default Chess;
