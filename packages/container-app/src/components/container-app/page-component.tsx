import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { MicroFrontendModeSwitch } from '../../components';

interface IPageComponentProps {
}

export const PageComponent = (props: IPageComponentProps) => {
  let { params } = useRouteMatch();
  const url = `/${params[0]}`;
  const setTitle = (title) => document.title = title;
  const setState = (state) => { /* noop */ };
  const newProps = { ...props, setTitle, setState, url }

  return (
    <div className="page-component">
      <MicroFrontendModeSwitch {...newProps} />
    </div>
  )
}
