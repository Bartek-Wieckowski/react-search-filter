import { useState } from 'react';
import { Users } from './users';
function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search"
        className="search"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <ul className="list-items">
        {Users.filter((u) =>
          u.first_name.toLowerCase().includes(searchValue)
        ).map((u) => (
          <li className="item" key={u.id}>
            {u.first_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
