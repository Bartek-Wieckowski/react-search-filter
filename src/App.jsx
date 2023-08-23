import { Users } from './users';
function App() {
  return (
    <div className="app">
      <input type="text" placeholder="Search" className="search" />
      <ul className="list-items">
        {Users.map((i) => (
          <li className="item">{i.first_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
