import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/CustomerList">Customers</Link>
        </li>
        <li>
          <Link to="/TrainingList">Trainings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;