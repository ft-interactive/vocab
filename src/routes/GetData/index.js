/**
 * @file
 * Data-loading dropzone route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Dropzone from 'react-dropzone';
import { loadUserData } from '../../redux/actions';

export default connect(() => ({}), dispatch => ({
  onDrop: (files) => {
    dispatch(loadUserData(files));
    dispatch(push('/configure-data'));
  }
}))(({ onDrop }) => <Dropzone onDrop={onDrop} />);
