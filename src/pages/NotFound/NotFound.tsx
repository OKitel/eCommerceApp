import './styles.scss';

export const NotFound: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h2 className="title text">4</h2>
          <img className="vinyl" src="./src/assets/vinyl.png" alt="vinyl record melts" />
          <h2 className="title text">4</h2>
        </div>
        <h2 className="subtitle text">Page not found</h2>
      </div>
    </>
  );
};
