import { useEffect, useState } from 'react';
import { Users } from './users';
import Table from './Table';
import axios from 'axios';

// 1) option to search
// function App() {
//   const [query, setQuery] = useState("");
//   return (
//     <div className="app">
//       <input
//         className="search"
//         placeholder="Search..."
//         onChange={(e) => setQuery(e.target.value.toLowerCase())}
//       />
//       <ul className="list">
//         {Users.filter((asd) =>
//           asd.first_name.toLowerCase().includes(query)
//         ).map((user) => (
//           <li className="listItem" key={user.id}>
//             {user.first_name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// 2) options to search
// function App() {
//   const [searchValue, setSearchValue] = useState('');
//   const keys = ['first_name', 'last_name', 'email'];

//   const searchAndFilter = (data) => {
//     return data.filter((item) =>
//       keys.some((key) => item[key].toLowerCase().includes(searchValue))
//     );
//   };

//   return (
//     <div className="app">
//       <input
//         type="text"
//         placeholder="Search"
//         className="search"
//         onChange={(e) => setSearchValue(e.target.value)}
//         value={searchValue}
//       />
//       <Table data={searchAndFilter(Users)} />
//     </div>
//   );
// }

// 3) options with fetching
function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const keys = ['first_name', 'last_name', 'email'];

  const searchAndFilter = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:3004/users?q=${query}`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [query]);

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search"
        className="search"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <Table data={searchAndFilter(data)} />
    </div>
  );
}

export default App;
