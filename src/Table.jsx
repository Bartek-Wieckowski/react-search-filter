function Table({ data }) {
  return (
    <table>
      <tbody>
        <tr>
          <th>No.</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>E-mail</th>
        </tr>
        {data.map((item, i) => (
          <tr key={item.id}>
            <td>{i + 1}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
