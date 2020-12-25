import * as React from 'react';

interface IIframeComponent2Props {
  url: string;
}

export class IframeComponent2 extends React.Component<IIframeComponent2Props> {
  ref = undefined;

  state = {
    height: undefined,
  }

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  setSize = (elem) => {
      const height = elem.offsetHeight;
      // const height = elem.scrollHeight;    
      this.setState({ height })
  }

  handleOnload = () => {
    const iframe = this.ref.current;
    const iframeWindow = iframe.contentWindow;
    const iframeDocument = iframe.contentDocument;
    const iframeHtmlTag = iframeDocument.body.parentNode;
    // const iframeHtmlTag = iframeDocument.body;

    const resizeObserver = new iframeWindow.ResizeObserver(entries => this.setSize(entries[0].target));
    resizeObserver.observe(iframeHtmlTag);

    // iframeWindow.addEventListener('resize', console.log);
  }

  render() {
    const { handleOnload, ref } = this;
    const { url } = this.props;
    const { height } = this.state;
    
    return (
      <iframe 
        ref={ref} 
        src={url} 
        // onLoad={handleOnload}
        // style={{height}}
        style={{width:'100%', height:'100%'}}
      ></iframe>
    )
  }
  // render() {
  //   const url = '/micro-app/index.html';

  //   return (
  //     <iframe 
  //       src={url} 
  //     ></iframe>
  //   )
  // }
}

