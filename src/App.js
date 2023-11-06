import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './Collection';

const cats = [
  { name: 'All' },
  { name: 'Georgia' },
  { name: 'Czech Republic' },
  { name: 'Austria' },
  { name: 'Vietnam' },
  { name: 'Hong Kong' },
  { name: 'Turkey' },
  { name: 'Greece' },
  { name: 'Portugal' },
];

function App() {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(
      `https://6523066ff43b179384152b1f.mockapi.io/api/pc/data?${category}&page=${page}&limit=4`
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.warn(err);
        alert('Data was not loaded');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My travel collection</h1>
      <small>Works with MockAPI</small>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li
              onClick={() => {
                setCategoryId(index);
              }}
              className={categoryId === index ? 'active' : ''}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          className="search-input"
          placeholder="Search by name"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(2)].map((_, i) => (
          <li
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
