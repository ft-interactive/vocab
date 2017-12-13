// @flow
/**
 * Side-bar container for Visual Vocabulary dimensions
 */
import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../templates/docs/categories';
import { slug } from '../../utils';
import './index.css';

export default (props) => (
  <aside>
    <ul className="dimension-list__unordered-list">
      {categories.map(cat => (
        <li key={slug(cat.category)} className="dimension-list__list-item" style={{
          borderTop: cat.colour,
        }}>
          <Link to={`/choose-your-chart/${slug(cat.category)}`}>{cat.category}</Link>
        </li>
      ))}
    </ul>
  </aside>
);
