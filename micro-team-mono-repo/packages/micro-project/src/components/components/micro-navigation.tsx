import * as React from 'react';
import { Link } from 'react-router-dom';
import { IMicroAppProps } from '@company/core-team-shared-tools';

export type TMicroNavigationProps = Pick<IMicroAppProps, 'setTitle' | 'setUrl'>;

export const MicroNavigation = (props: TMicroNavigationProps) => {
  const handleNavigate = (
    event: React.MouseEvent,
    text: string,
    url: string,
  ) => {
    event.stopPropagation();
    props.setTitle && props.setTitle(text);
    props.setUrl && props.setUrl(url);
  };

  const links = [
    { url: '/micro-url/golden-text', text: 'Text' },
    { url: '/micro-url/golden-spiral', text: 'Spiral' },
    { url: '/micro-url/stock-grid', text: 'StockGrid' },
    { url: '/micro-url/column-chart', text: 'ColumnChart' },
    { url: '/micro-url/pie-chart', text: 'PieChart' },
    { url: '/micro-url/stock-chart', text: 'StockChart' },
  ];

  return (
    <div>
      {links.map((link, idx) => {
        const { text, url } = link;
        return (
          <Link
            key={url}
            onClick={(event) => handleNavigate(event, text, url)}
            to={url}
          >
            {text}
          </Link>
        );
      })}
    </div>
  );
};
