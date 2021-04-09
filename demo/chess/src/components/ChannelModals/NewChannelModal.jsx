// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, {useEffect, useState} from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalButtonGroup,
  ModalButton,
  Input,
  Label,
  RadioGroup, ChannelItem, ChannelList,
} from 'amazon-chime-sdk-component-library-react';

import './NewChannelModal.css';
import { useAuthContext } from '../../providers/AuthProvider';
import {useChatChannelState} from "../../providers/ChatMessagesProvider";
import { listAppInstanceUsers, getAppInstanceUser } from '../../api/ChimeAPI';
import ContactPicker from "../ContactPicker";

export const NewChannelModal = ({ onClose, onCreateChannel }) => {
  const [name, setName] = useState('');
  const [player2, setPlayer2] = useState('');
  const [privacy, setPrivacy] = useState('PRIVATE');
  const [mode, setMode] = useState('RESTRICTED');
  const [usersList, setUsersList] = useState([]);
    const {
        channelList,
        activeChannel,
        unreadChannels,
    } = useChatChannelState();
  const { member } = useAuthContext();
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onPlayer2Change = (e) => {
    setPlayer2(e.target.value);
  };
  const onPrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };
  const onModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <Modal size="lg" onClose={onClose}>
      <ModalHeader title="Create Game" />
      <ModalBody>
        <form
          onSubmit={(e) => onCreateChannel(e, name, player2)}
          id="new-channel-form"
        >
          <div className="ch-form-field-input">
            <Label className="lbl">Game name</Label>
            <Input
              className="value"
              showClear={false}
              type="text"
              value={name}
              onChange={(e) => onNameChange(e)}
            />
          </div>

          <div className="ch-form-field-input">
              {/*{getAllUsers()}*/}
              {/*{alert(usersList)}*/}
            {/*<Label className="lbl">Choose Opponent</Label>*/}
              {/*<ContactPicker onChange={(e) => onNameChange(e)} options={usersList} />*/}


          </div>

          <div className="ch-form-field-input">
            <Label className="lbl">Player 1</Label>
            <Label className="value">{member.username}</Label>
          </div>

            <div className="ch-form-field-input">
                <Label className="lbl">Player 2</Label>
                <Input
                    className="value"
                    showClear={false}
                    type="text"
                    value={player2}
                    onChange={(e) => onPlayer2Change(e)}
                />
            </div>
          {/*<div className="ch-form-field-input">*/}
          {/*  <Label className="lbl">Type (cannot be changed)</Label>*/}
          {/*  <div className="value ch-type-options">*/}
          {/*    <RadioGroup*/}
          {/*      options={[*/}
          {/*        { value: 'PRIVATE', label: 'Private' },*/}
          {/*        { value: 'PUBLIC', label: 'Public' },*/}
          {/*      ]}*/}
          {/*      value={privacy}*/}
          {/*      onChange={(e) => onPrivacyChange(e)}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*{privacy !== 'PUBLIC' && (*/}
          {/*  <div className="ch-form-field-input">*/}
          {/*    <Label className="lbl">Mode</Label>*/}
          {/*    <div className="value ch-mode-options">*/}
          {/*      <RadioGroup*/}
          {/*        options={[*/}
          {/*          { value: 'RESTRICTED', label: 'Restricted' },*/}
          {/*          { value: 'UNRESTRICTED', label: 'Unrestricted' },*/}
          {/*        ]}*/}
          {/*        value={mode}*/}
          {/*        onChange={(e) => onModeChange(e)}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
        </form>
      </ModalBody>
      <ModalButtonGroup
        primaryButtons={[
          <ModalButton
            label="Create"
            type="submit"
            form="new-channel-form"
            variant="primary"
          />,
          <ModalButton label="Cancel" closesModal variant="secondary" />,
        ]}
      />
    </Modal>
  );
};

export default NewChannelModal;
