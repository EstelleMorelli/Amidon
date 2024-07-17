import ReactDOM from 'react-dom/client';

/*
-- BrowserRouter --
https://reactrouter.com/docs/en/v6/api#browserrouter
Composant de react-routeur-dom : il utilise l'HistoryAPI HTML5 pour surveiller l’historique des URL (avec un ecouteur d'event popState)  et stocke l'URL courante.
On englobe notre composant racine App avec <BrowserRouter>
*/
import { BrowserRouter } from 'react-router-dom';

/*
-- Provider --
On englobe notre composant principal avec le Store Provider pour pouvoir accéder au store et utiliser nos hooks useSelector et useDispacth dans tout nos composants.
*/
import { Provider } from 'react-redux';

// On importe notre composant principal
import App from './components/App/App';

import './styles/index.scss';
import store from './store/store';

// Je créer un root pour mon application (a partir d'un élément HTML)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// On injecte notre application dans le DOM
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
