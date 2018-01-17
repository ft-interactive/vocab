/**
 * Chart List
 * Displays the chart types
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { selectChartTemplate } from '../../shared/actions/vocab';
import { slug } from '../../shared/utils';
import styles from './ChartList.css';
import type { templateType } from '../../shared/reducers/vocab';

type Props = {
  templates: Array<templateType>,
  onTemplateClick: (chartName: string) => void,
  match: Match
};

const chartList = ({ templates, onTemplateClick, match }: Props) => (
  <ul className={styles['chart-list__ul']}>
    {templates.filter(t => slug(t.category) === match.params.dimension).map(t => (
      <li className={styles['chart-list__li']} key={slug(t.chartName)}>
        <Link key={slug(t.chartName)} to="/get-data">
          <button
            onClick={() => onTemplateClick(slug(t.chartName))}
            className={styles['chart-list__button']}
            disabled={t.disabled}
          >
            <img
              className={styles['chart-list__img']}
              src={`../templates/docs/icons/${t.img}`}
              alt=""
            />
            <h2 className={styles['chart-list__header']}>{t.chartName}</h2>
            <p className={styles['chart-list__description']}>{t.description}</p>
          </button>
        </Link>
      </li>
    ))}
  </ul>
);

const mapStateToProps = state => ({
  templates: state.vocabApp.templates
});

const mapDispatchToProps = dispatch => ({
  onTemplateClick: id => dispatch(selectChartTemplate(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(chartList);
