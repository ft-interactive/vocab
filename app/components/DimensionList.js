// @flow
/**
 * Side-bar container for Visual Vocabulary dimensions
 */
import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../templates/docs/categories';
import { slug } from '../utils';
import styles from './DimensionList.css';

export default ({ className }) => (
  <aside className={className}>
    <ul className={styles['dimension-list__unordered-list']}>
      {categories.map(cat => (
        <li
          key={slug(cat.category)}
          className={styles['dimension-list__list-item']}
          style={{
            borderColor: cat.colour,
          }}
        >
          <Link to={`/choose-your-chart/${slug(cat.category)}`}>{cat.category}</Link>
        </li>
      ))}
    </ul>
  </aside>
);
