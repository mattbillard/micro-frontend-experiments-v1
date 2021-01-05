import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { MicroFrontEndComponent } from '../components';

interface IPageComponentProps {
}

export const PageComponent = (props: IPageComponentProps) => {
  let { params } = useRouteMatch();
  const url = `/${params[0]}`;

  return (
    <div className="page-component">
      <MicroFrontEndComponent url={url} />
    </div>
  )
}
