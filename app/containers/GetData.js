/**
 * @file
 * Data-loading dropzone route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Dropzone from 'react-dropzone';
import { loadUserData } from '../actions/vocab';
import styles from './GetData.css';

const dropped = ({ onDrop, selectedTemplate, redirect }) => {
  if (!selectedTemplate) {
    redirect('/');
    return null;
  }

  return (<section className={styles['get-data__wrapper']}>
    <Dropzone className={styles['get-data__dropzone']} onDrop={onDrop}>
      <div className={styles['get-data__dropzone--header-big']}>
        drag your data file here
      </div>
      <div className={styles['get-data__dropzone--header-small']}>
        (or click to browse)
      </div>
    </Dropzone>
  </section>);
};

export default connect(state => ({
  selectedTemplate: state.vocabApp.selectedTemplate,
}), dispatch => ({
  onDrop: (files) => {
    dispatch(loadUserData(files));
  },
  redirect: (path) => dispatch(push(path)),
}))(dropped);
