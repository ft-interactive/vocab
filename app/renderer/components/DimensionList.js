// @flow
/**
 * Side-bar container for Visual Vocabulary dimensions
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { slug } from '../../shared/utils';
import styles from './DimensionList.css';
import type { categoryType } from '../../shared/reducers/vocab';

type Props = {
  className: string,
  categories: categoryType[]
};

const DimensionList = ({
  className,
  categories
}: Props) => (
  <aside className={className}>
    <ul className={styles['dimension-list__unordered-list']}>
      {categories.map(cat => (
        <li
          key={slug(cat.category)}
          className={styles['dimension-list__list-item']}
          style={{
            borderColor: cat.colour
          }}
        >
          <Link to={`/choose-your-chart/${slug(cat.category)}`}>{cat.category}</Link>
        </li>
      ))}
    </ul>
  </aside>
);

const mapStateToProps = state => ({
  categories: state.vocabApp.categories
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DimensionList);
