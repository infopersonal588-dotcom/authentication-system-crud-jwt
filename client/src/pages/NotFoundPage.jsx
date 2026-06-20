import { Link } from 'react-router-dom';
import FormCard from '../components/FormCard.jsx';

const NotFoundPage = () => (
  <FormCard title="Page not found">
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <Link to="/dashboard">
      <button type="button">Return to dashboard</button>
    </Link>
  </FormCard>
);

export default NotFoundPage;
