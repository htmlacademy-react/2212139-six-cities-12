import MainPage from '../../pages/main-page/main-page';

type AppScreenProps = {
  cardsCount: number;
}

function App({cardsCount}: AppScreenProps): JSX.Element {
  return <MainPage cardsCount={cardsCount} />;
}

export default App;
