import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const TrainingsList = () => {
  const [trainings, setTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedBy, setSortedBy] = useState('date');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
        const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings');
        const data = await response.json();
        const trainingsWithCustomerName = data._embedded?.trainings.map((training) => {
          const customer = data._embedded?.customers?.find((c) => c.id === training.customerId);
          return { ...training, customerName: `${customer?.firstname} ${customer?.lastname}` };
        });
        setTrainings(trainingsWithCustomerName || []);
        setLoading(false);
      };

    fetchTrainings();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (column) => {
    setSortedBy(column);
  };

  const filteredTrainings = trainings.filter((training) => {
    return (
      training.activity.toLowerCase().includes(searchTerm) ||
      dayjs(training.date).format('DD.MM.YYYY').toLowerCase().includes(searchTerm)
    );
  });

  const sortedTrainings = filteredTrainings.sort((a, b) => {
    if (a[sortedBy] < b[sortedBy]) return -1;
    if (a[sortedBy] > b[sortedBy]) return 1;
    return 0;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Trainings</h1>
      <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => handleSort('activity')}>Activity</button>
            </th>
            <th>
              <button onClick={() => handleSort('date')}>Date</button>
            </th>
            <th>
              <button>Duration</button>
            </th>
            <th>
                <button>Customer</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTrainings.map((training) => (
            <tr key={training.id}>
              <td>{training.activity}</td>
              <td>{dayjs(training.date).format('DD.MM.YYYY')}</td>
              <td>{training.duration}</td>
              <td>{training.customerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingsList;