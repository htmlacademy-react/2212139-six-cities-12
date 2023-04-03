import {Link} from 'react-router-dom';
import styles from './full-page-error.module.css';

function FullPageError() {
  return (
    <div className={styles.container_error}>
      <h2>Something went wrong...</h2>
      <Link to={'/'}>
        <button className={styles.btn_error} type="button">Restart</button>
      </Link>
    </div>
  );
}

export default FullPageError;
