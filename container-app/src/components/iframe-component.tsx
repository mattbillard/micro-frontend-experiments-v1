import * as React from 'react';

interface IIframeComponentProps {
  url: string;
}

export const IframeComponent = (props: IIframeComponentProps) => {
  return (
    <iframe src={props.url}></iframe>
  )
}
