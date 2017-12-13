/**
 * @file
 * Data-loading dropzone route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Dropzone from 'react-dropzone';
import { loadUserData } from '../../redux/actions';

const dropped = ({ onDrop, selectedTemplate, redirect }) => {
  if (!selectedTemplate) {
    redirect('/');
    return null;
  }

  return <Dropzone onDrop={onDrop} />;
}

export default connect(state => ({
  selectedTemplate: state.vocabApp.selectedTemplate,
}), dispatch => ({
  onDrop: (files) => {
    dispatch(loadUserData(files));
  },
  redirect: (path) => dispatch(push(path)),
}))(dropped);
