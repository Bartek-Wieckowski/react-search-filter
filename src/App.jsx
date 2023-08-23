import { useState } from 'react';
import { Users } from './users';
import Table from './Table';
function App() {
  const [searchValue, setSearchValue] = useState('');
  const keys = ['first_name', 'last_name', 'email'];

  const searchAndFilter = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(searchValue))
    );
  };

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search"
        className="search"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      {/* <ul className="list-items">
        {Users.filter((u) =>
          u.first_name.toLowerCase().includes(searchValue)
        ).map((u) => (
          <li className="item" key={u.id}>
            {u.first_name}
            </li>
            ))}
          </ul> */}

      {/* different options */}

      <Table data={searchAndFilter(Users)} />
    </div>
  );
}

export default App;
