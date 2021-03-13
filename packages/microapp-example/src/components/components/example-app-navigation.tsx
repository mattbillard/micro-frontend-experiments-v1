import * as React from 'react';
import { Link } from 'react-router-dom';
import { IMicroAppProps } from '@company/shared-tools';

export type TMicroNavigationProps = Pick<IMicroAppProps, 'setTitle' | 'setUrl'>;

export const ExampleAppNavigation = (props: TMicroNavigationProps) => {
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
    { url: '/example-url/title-text', text: 'Text' },
    { url: '/example-url/spiral', text: 'Spiral' },
    { url: '/example-url/stock-grid', text: 'StockGrid' },
    { url: '/example-url/column-chart', text: 'ColumnChart' },
    { url: '/example-url/pie-chart', text: 'PieChart' },
    { url: '/example-url/stock-chart', text: 'StockChart' },
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
