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
// function App() {
//   const [query, setQuery] = useState('');
//   const [data, setData] = useState([]);
//   const keys = ['first_name', 'last_name', 'email'];

//   const searchAndFilter = (data) => {
//     return data.filter((item) =>
//       keys.some((key) => item[key].toLowerCase().includes(query))
//     );
//   };
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3004/users?q=${query}`);
//         setData(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUsers();
//   }, [query]);

//   return (
//     <div className="app">
//       <input
//         type="text"
//         placeholder="Search"
//         className="search"
//         onChange={(e) => setQuery(e.target.value)}
//         value={query}
//       />
//       <Table data={searchAndFilter(data)} />
//     </div>
//   );
// }

// 4) fetching and infinite scroll
function App() {
  const [searchValue, setSearchValue] = useState('');
  const [visibleUsers, setVisibleUsers] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);

  const keys = ['first_name', 'last_name', 'email'];

  const filteredUsers = Users.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(searchValue))
  );

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const contentHeight = document.body.offsetHeight;

    if (scrollPosition >= contentHeight && !isLoading) {
      setIsLoading(true);
      setShouldShowMore(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (shouldShowMore) {
      setTimeout(() => {
        setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 10);
        setIsLoading(false);
        setShouldShowMore(false);
      }, 1000);
    }
  }, [shouldShowMore]);

  return (
    <>
      <div className="app" style={{ opacity: isLoading ? 0.5 : 1 }}>
        <input
          type="text"
          placeholder="Search"
          className="search"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        {/* <Table data={searchAndFilter(Users)} /> */}
        <Table data={filteredUsers.slice(0, visibleUsers)} />
      </div>
      {isLoading && <div className="spinner">Loading...</div>}
    </>
  );
}

export default App;
