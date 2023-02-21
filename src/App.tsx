import React from 'react';
import CountryDropdown from './components/CountryDropdown';
import DataTable from './components/DataTable';

interface Props {
  name?: string;
}
const App: React.FunctionComponent<Props> = ({ name }) => {
  return (
    <React.Fragment>
      <h1>The {name}</h1>
      <CountryDropdown />
      <DataTable />
    </React.Fragment>
  );
};

App.defaultProps = {
  name: 'Grid',
};

export { App };
