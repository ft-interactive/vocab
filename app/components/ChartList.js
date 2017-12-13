// @flow
/**
 * Chart List
 * Displays the chart types
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectChartTemplate } from '../actions/vocab';
import { slug } from '../utils';
import './ChartList.css';

const chartList = ({ templates, onTemplateClick, match }) => (
  <ul className="chart-list__ul">
    {templates
      .filter(t => slug(t.category) === match.params.dimension)
      .map(t => (
        <Link key={slug(t.chartName)} to="/get-data">
          <li
            onClick={() => onTemplateClick(slug(t.chartName))}
            className="chart-list__li"
            key={slug(t.chartName)}
            disabled={t.disabled}
          >
            <img className="chart-list__img" src={`../templates/docs/icons/${t.img}`} alt="" />
            <h2 className="chart-list__header">{t.chartName}</h2>
            <p className="chart-list__description">
              {t.description}
            </p>
          </li>
        </Link>
      ))
    }
  </ul>
);


const mapStateToProps = state => ({
  templates: state.vocabApp.templates,
});

const mapDispatchToProps = dispatch => ({
  onTemplateClick: id => dispatch(selectChartTemplate(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(chartList);
