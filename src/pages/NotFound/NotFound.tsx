import { Link } from 'react-router-dom';
import './styles.scss';

export const NotFound: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h2 className="title">4</h2>
          <img className="vinyl" src="./src/assets/images/vinyl.png" alt="vinyl record melts" />
          <h2 className="title">4</h2>
        </div>
        <h2 className="subtitle">Page not found</h2>
        <Link className="btn" to={'/'}>
          Back to main
        </Link>
      </div>
    </>
  );
};
