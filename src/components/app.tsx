import { MainPage } from '../pages/main/main-page';

type AppProps = {
  limit: number;
};

export function App(props: AppProps): JSX.Element {
  const { limit } = props;
  return <MainPage limit={limit} />;
}
