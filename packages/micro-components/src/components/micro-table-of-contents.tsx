import * as React from 'react';
import { Link } from "react-router-dom";

import { MicroNavigation } from '../components';

// TODO: probably move to container-app
export const MicroTableOfContents = (props) => {
  return (
    <div className="micro-table-of-contents">
      <MicroNavigation {...props} />
    </div>
  );
}

export default MicroTableOfContents;
