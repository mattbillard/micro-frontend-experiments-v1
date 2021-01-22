import * as React from 'react';
import { Link } from "react-router-dom";

export const MicroTableOfContents = () => {
  return (
    <div className="micro-table-of-contents">
      <Link to='/micro-app/golden-spiral'>Spiral</Link>
      <Link to='/micro-app/golden-text'>Text</Link>
      <Link to='/micro-app/stock-grid'>StockGrid</Link>
      <Link to='/micro-app/column-chart'>ColumnChart</Link>
      <Link to='/micro-app/pie-chart'>PieChart</Link>
      <Link to='/micro-app/stock-chart'>StockChart</Link>
    </div>
  );
}

export default MicroTableOfContents;
