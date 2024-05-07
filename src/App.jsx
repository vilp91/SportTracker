import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TrainingsList from './components/TrainingList';
import CustomersList from './components/CustomerList';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/trainingList" element={<TrainingsList />} />
          <Route path="/customerList" element={<CustomersList />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
