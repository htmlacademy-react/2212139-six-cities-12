import { Link } from 'react-router-dom';


export default function Page404(): JSX.Element {
  return (
    <section className="container" style={{textAlign: 'center'}}>
      <h1>404. Page not found</h1>
      <Link to="/">Вернуться на главную</Link>
    </section>
  );
}

