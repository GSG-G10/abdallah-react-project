import React, { useState, useEffect } from "react";

function Home() {

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks') || '[]'));

    function addToBookmarks(image) {
        setBookmarks((prev) => [...prev, image.urls.regular]);
    }

    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const imagesList = images && images.map(image =>
        <img
            key={image.id}
            src={image.urls.regular}
            style={{ width: '25%' }}
            alt={image.alt_description}
            onClick={() => addToBookmarks(image)}
        />
    );

    useEffect(() => {
        setPage(1);
    }, [search]);

    useEffect(() => {
        const abortController = new AbortController();
        if (search) {
            if (page === 1) { setLoading(true); }
            fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=TwvKJh4prHYcX8rjZdWBMDAHv0-h5ceFoB0Gg3irklI&page=${page}`)
                .then(res => res.json())
                .then(data => {
                    setLoading(false);
                    setImages((prevImages) => page > 1 ? [...prevImages, ...data.results] : data.results);
                })
                .catch(err => {
                    setLoading(false);
                });
        } else {
            fetch(`https://api.unsplash.com/photos?client_id=TwvKJh4prHYcX8rjZdWBMDAHv0-h5ceFoB0Gg3irklI&page=${page}`)
                .then(res => res.json())
                .then(data => {
                    setLoading(false);
                    setImages((prevImages) => [...prevImages, ...data]);
                })
                .catch(err => {
                    setLoading(false);
                });
        }

        return () => {
            abortController.abort();
        }

    }, [page, search]);

    return (
        <div>
            <div>
                <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} />
            </div>
            <div>
                {loading ? <h1>loading.....</h1> : imagesList}
            </div>
            <button onClick={() => { setPage(page + 1) }}>more</button>
        </div>
    );
}

export default Home;