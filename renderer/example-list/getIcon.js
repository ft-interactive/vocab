/**
 * This is a terribly hacky lookup table that gives each chart an icon.
 * @TODO add thumbnails to `graphics-examples` and display those instead.
 */

function getIcon(dir) {
  switch (dir) {
    case 'bubble-chart':
      return 'record';

    case 'chord-diagram':
      return 'renren';

    case 'constituency-cartogram-categorical':
      return 'map';

    case 'dot-plot':
      return 'dot-3';

    case 'enhanced-line-chart':
      return 'chart-line';

    case 'heatmap-calendar':
      return 'calendar';

    case 'icon-array-10x10':
    case 'icons':
      return 'layout';

    case 'scatter':
      return 'dot-3';

    case 'slopechart-basic':
    case 'slopchart-elections':
      return 'flow-branch';

    case 'small-multiples-area':
    case 'small-multiples-bars':
    case 'small-multiples-columns':
    case 'small-multiples':
      return 'layout';

    case 'treemap':
      return 'sweden';

    case 'world-choropleth-categorical':
      return 'map';

    case 'wrapper-area':
      return 'chart-area';

    case 'wrapper-bar-ordered':
    case 'wrapper-bar':
      return 'chart-bar';

    case 'wrapper-bubble':
      return 'record';

    case 'wrapper-calendar heat map':
      return 'calendar';

    case 'wrapper-circles-timeline':
      return 'dot-3';

    case 'wrapper-column-grouped':
    case 'wrapper-column-ordered':
    case 'wrapper-column-political':
    case 'wrapper-column-stacked UNFINISHED':
    case 'wrapper-column':
      return 'doc-text-inv';

    case 'wrapper-h-lollipop':
      return 'thermometer';

    case 'wrapper-histogram':
      return 'chart-area';

    case 'wrapper-line-interday':
    case 'wrapper-line':
      return 'chart-line';

    case 'wrapper-pie':
      return 'chart-pie';

    case 'wrapper-sankey':
      return 'air';

    case 'wrapper-treemap':
      return 'sweden';

    case 'wrapper-v-lollipop':
      return 'thermometer';

    case 'wrapper-waterfall':
      return 'chart-bar';

    case 'wrapper-xy-heatmap':
    case 'wrapper-starter':
    case 'wrapper-priestley-timeline':
    case 'wrapper-boxplot':
    case 'open-close-high-low':
    case 'snail-trail':
    default:
      return 'star';
  }
}
module.exports.getIcon = getIcon;
