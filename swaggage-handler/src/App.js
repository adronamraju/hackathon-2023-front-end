import React, { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import Logo from './components/Logo';
import Dashboard from './components/Dashboard';

function App() {
    const [image, setImage] = useState(null);

    const handleImageUpload = (uploadedImage) => {
        setImage(URL.createObjectURL(uploadedImage));
    };

    return (
        <div className="App">
            <header className="App-header">
                <Logo />
                <Menu onImageUpload={handleImageUpload} />
            </header>
            <Dashboard uploadedImage={image} /> {/* Pass the image as a prop */}
        </div>
    );
}

export default App;
