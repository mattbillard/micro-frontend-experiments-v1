import * as React from 'react';
import { Link } from "react-router-dom";

declare const window: any;

// TODO: probably move to container-app
export const MicroNavigation = (props) => {
  window.glContainer = props.glContainer;

  const handleNavigate = (event, text, url) => {
    event.stopPropagation();
    props.setTitle && props.setTitle(text);
    props.setChildUrl && props.setChildUrl(url);
  }

  const links = [
    { url: '/micro-url/golden-spiral', text: 'Spiral' },
    { url: '/micro-url/golden-text', text: 'Text' },
    { url: '/micro-url/stock-grid', text: 'StockGrid' },
    { url: '/micro-url/column-chart', text: 'ColumnChart' },
    { url: '/micro-url/pie-chart', text: 'PieChart' },
    { url: '/micro-url/stock-chart', text: 'StockChart' },
    { url: '/micro-url/text-tester', text: 'TextTester' },
  ]

  return (
    <div>
      {links.map((link, idx) => {
        const { text, url } = link;
        return (
          <Link key={url} onClick={(event) => handleNavigate(event, text, url)} to={url}>{text}</Link>
        )
      })}
    </div>
  );
}

export default MicroNavigation;
