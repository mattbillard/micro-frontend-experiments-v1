// @ts-nocheck
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Slick from 'slickgrid-es6';

export const StockGrid = (props) => {
  const ref = useRef(null);
  const [grid, setGrid] = useState();

  const data = generateData();

  const columns = [
    { id: "symbol", name: "Symbol", field: "symbol" },
    { id: "company", name: "Company", field: "company" },
    { id: "price", name: "Price", field: "price" },
    { id: "change", name: "Change", field: "change" },
    { id: "changeRel", name: "Change %", field: "changeRel" },
    { id: "volume", name: "Volume", field: "volume" }
  ];
  
  const options = {
    editable: false,
    enableAddRow: false,
    enableCellNavigation: true,
    enableColumnReorder: false
  };

  useEffect(() => {
    const grid = new Slick.Grid(
      ref.current,
      data,
      columns,
      options,
    );

    grid.resizeCanvas();
    grid.autosizeColumns();

    setGrid(grid);
  }, []);

  return (
    <div ref={ref} className="grid-component"></div>
  );
}

const generateData = () => {
  const data = ['Acme, inc.', 'ACI', 'Ajax', 'AJX', 'Allied Biscuit', 'ABS', 'Ankh-Sto Associates', 'ASA', 'Atlantic Northern', 'ANO', 'Axis Chemical Co.', 'ACC', 'Barrytron', 'BRT', 'Big Kahuna Burger', 'BKB', 'Big T Burgers and Frie', 'BBF', 'Blammo', 'BLM', 'BLAND Corporation', 'BLC', 'Bluth Company', 'BLU', 'Burleigh and Strongint', 'BAS', 'C.H. Lavatory and Sons', 'CLS', 'Carrys Candles', 'CCD', 'Central Perk', 'CEP', 'Charles Townsend Agenc', 'CTA', 'Chasers', 'CSS', 'Chez Quis', 'CQU', 'Chotchkies', 'CKI', 'Cogswell Cogs', 'CCO', 'Colonial Movers', 'CMO', 'Compuglobalhypermegane', 'CCH', 'Corellian Engineering', 'CEN', 'Data Systems', 'DAS', 'Duff Brewing Company', 'DBC', 'Dunder Mifflin', 'DMF', 'Extensive Enterprise', 'EEP', 'Fake Brothers', 'FBR', 'Flowers By Irene', 'FBI', 'Foo Bars', 'FOB', 'Gadgetron', 'GAG', 'Galaxy Corp', 'GAC', 'General Forge and Foun', 'GFF', 'General Products', 'GPO', 'General Services Corpo', 'GSC', 'Gizmonic Institute', 'GIT', 'Globex Corporation', 'GLC', 'Globo Gym American Cor', 'GGA', 'Globo-Chemimacals', 'GCE', 'Gringotts', 'GGO', 'Incom Corporation', 'ICO', 'Industrial Automation', 'IAU', 'Initech', 'IIT', 'Initrode', 'INT', 'Input, Inc.', 'INP', 'Keedsler Motors', 'KMS', 'Klimpys', 'KLM', 'Krustyco', 'KUC', 'Kumatsu Motors', 'KMO', 'Leeding Engines Ltd.', 'LEL', 'LexCorp', 'LCO', 'LuthorCorp', 'LCP', 'Mainway Toys', 'MTO', 'Mammoth Pictures', 'MPI', 'McMahon and Tate', 'MAT', 'Megadodo Publications', 'MPU', 'Milliways', 'MIW', 'Minuteman Cafe', 'MIC', 'Moes Tavern', 'MOT', 'Monarch Playing Card Corp', 'MPC', 'Monks Diner', 'MOD', 'Mooby Corp', 'MOB', 'Mr. Sparkle', 'MRS', 'Niagular', 'NIA', 'Nordyne Defense Dynamimics', 'NDD', 'North Central Positron', 'NCP', 'Omni Consimer Products', 'OCP', 'Osato Chemicals', 'OCE', 'Petrox Oil Company', 'POC', 'Plow King', 'PLK', 'Powell Motors', 'PWM', 'Praxis Corporation', 'PRX', 'Primatech', 'PMT', 'QWERTY Logistics', 'QWR', 'Roboto Industries', 'ROI', 'Rouster and Sideways', 'RAS', 'Roxxon', 'ROX', 'Sirius Cybernetics Cor', 'SCC', 'Sixty Second Avenue', 'SSA', 'Smith and Co.', 'SAC', 'Sombra Corporation', 'SOC', 'Sonky Rubber Goods', 'SRG', 'Spacely Sprockets', 'SPR', 'Spade and Archer', 'SAA', 'SpringShield', 'SSH', 'St. Anky Beer', 'SAB', 'Stay Puft Corporation', 'SPC', 'Sto Plains Holdings', 'SPH', 'Strickland Propane', 'SPO', 'Taco Grande', 'TAG', 'Taggart Transcontinent', 'TTA', 'Tessier-Ashpool', 'TEA', 'Thatherton Fuels', 'TAF', 'The Frying Dutchman', 'TFD', 'The Krusty Krab', 'TKK', 'The Legitimate Busines', 'TLB', 'The New Firm', 'TNF', 'Three Waters', 'TWA', 'Thrift Bank', 'TBA', 'Tip Top Cafe', 'TTC', 'Transworld Consortium', 'TWC', 'U.S. Robotics and Mech', 'URM', 'United Fried Chicken', 'UFC', 'Universal Export', 'UEX', 'Vandelay Industries', 'VAI', 'Videlectrix', 'VEX', 'Virtucon', 'VUC', 'Water and Power', 'WAP', 'Wentworth Industries', 'WEI', 'Wernham Hogg', 'WEH', 'Western Gas & Electric', 'WGE', 'Widget Corp', 'WCO', 'Zevo Toys', 'ZET', 'ZiffCorp', 'ZFC'];
  const output = [];
  let changeRel, price;
  for (let i = 0; i < data.length; i += 2) {
    price = (1000 * Math.random()).toFixed(2);
    changeRel = (-5 + (10 * Math.random())).toFixed(2);
    output.push({
      'symbol': data[i],
      'company': data[i + 1],
      'price': price,
      'change': (price * (changeRel / 100)).toFixed(2),
      'changeRel': changeRel,
      'volume': Math.floor(Math.random() * 100000)
    });
  }

  return output;
};
