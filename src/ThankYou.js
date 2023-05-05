import { Link } from 'react-router-dom';

function ThankYou() {
  return (
    <div>
      <h2>Thank you for filling out the form!</h2>
      <p>We appreciate your feedback.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ThankYou;