import * as React from 'react';
import { Link } from "react-router-dom";

// TODO: probably move to container-app
export const MicroNavigation = (props) => {
  window.glContainer = props.glContainer;

  const handleNavigate = (event, text, url) => {
    event.stopPropagation();
    props.glContainer.setTitle(text);
    props.glContainer.setState({ url });
  }

  const links = [
    { url: '/micro-app/golden-spiral', text: 'Spiral' },
    { url: '/micro-app/golden-text', text: 'Text' },
    { url: '/micro-app/stock-grid', text: 'StockGrid' },
    { url: '/micro-app/column-chart', text: 'ColumnChart' },
    { url: '/micro-app/pie-chart', text: 'PieChart' },
    { url: '/micro-app/stock-chart', text: 'StockChart' },
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
