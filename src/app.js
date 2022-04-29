import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { startSetExpenses } from './actions/expenses';
import configureStore from './store/configureStore';
import './styles/styles.scss';
import './firebase/firebase';

const store = configureStore();

const jsx = (
    <React.StrictMode>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});

