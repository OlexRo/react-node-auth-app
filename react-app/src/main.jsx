import React from 'react';
import ReactDOM from 'react-dom/client';
//Router
import {BrowserRouter as Router} from 'react-router-dom';
//Компоненты React
import {App} from './App';
//Стили React
import './asset/style/index.sass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);

