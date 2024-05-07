import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedBy, setSortedBy] = useState('name');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers');
      const data = await response.json();
      setCustomers(data._embedded.customers);
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (column) => {
    setSortedBy(column);
    const sortedCustomers = [...customers].sort((a, b) => {
      if (a[column].toLowerCase() < b[column].toLowerCase()) return -1;
      if (a[column].toLowerCase() > b[column].toLowerCase()) return 1;
      return 0;
    });
    setCustomers(sortedCustomers);
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      (customer.firstname || '')
        .toLowerCase()
        .includes(searchTerm) ||
      (customer.lastname || '')
        .toLowerCase()
        .includes(searchTerm) ||
      customer.email?.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Customers</h1>
      <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search by name or email" />
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => handleSort('name')}>Name</button>
            </th>
            <th>
              <button onClick={() => handleSort('email')}>Email</button>
            </th>
            <th>
              <button onClick={() => handleSort('created_at')}>Created At</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{`${customer.firstname || ''} ${customer.lastname || ''}`}</td>
              <td>{customer.email || ''}</td>
              <td>{dayjs(customer.created_at).format('DD.MM.YYYY HH:mm')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;