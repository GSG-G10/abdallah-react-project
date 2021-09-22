import React, { useState } from "react";


function Bookmark() {
    const [bookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || []);

    const imagesList = bookmarks && bookmarks.map(image =>
        <img
            key={image}
            src={image}
            style={{ width: '25%' }}
            alt={image}
        />
    );

    return (
        <div>
            {imagesList}
        </div>
    );
}

export default Bookmark;