/**
 * @file
 * Data-loading dropzone route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Dropzone from 'react-dropzone';
import { loadUserData } from '../../shared/actions';
import styles from './GetData.css';

type Props = {
  onDrop: () => void,
  selectedTemplate: string | null,
  redirect: () => void
};

const dropped = ({ onDrop, selectedTemplate, redirect }: Props) => {
  if (!selectedTemplate) {
    redirect('/');
    return null;
  }

  return (
    <section className={styles['get-data__wrapper']}>
      <Dropzone
        className={styles['get-data__dropzone']}
        onDrop={files => onDrop(files, selectedTemplate)}
      >
        <div className={styles['get-data__dropzone--header-big']}>drag your data file here</div>
        <div className={styles['get-data__dropzone--header-small']}>(or click to browse)</div>
      </Dropzone>
      <button className={styles['get-data__back-button']} onClick={() => redirect('/')}>
        Go back
      </button>
    </section>
  );
};

export default connect(
  state => ({
    selectedTemplate: state.vocabApp.selectedTemplate
  }),
  dispatch => ({
    onDrop: (files, selectedTemplate) => {
      dispatch(loadUserData(files, selectedTemplate));
    },
    redirect: path => dispatch(push(path))
  })
)(dropped);
