import React from 'react';
import './App.css';
import Menu from './components/Menu';
import Logo from './components/Logo';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Logo />
                <Menu />
            </header>
            <Dashboard /> {/* Add the Dashboard component here */}
        </div>
    );
}

export default App;
