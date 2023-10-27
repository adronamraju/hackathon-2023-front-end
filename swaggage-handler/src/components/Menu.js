import React from 'react';
import '../styles/Menu.css';

const Menu = ({ onImageUpload }) => {
    const handleFindBagClick = () => {
        document.getElementById('hidden-file-input').click();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0]);
        }
    };

    return (
        <div className="menu">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li onClick={handleFindBagClick}>Find Bag</li>
            </ul>
            <input type="file" accept="image/*" id="hidden-file-input" style={{display: 'none'}} onChange={handleFileChange} />
        </div>
    );
}

export default Menu;
