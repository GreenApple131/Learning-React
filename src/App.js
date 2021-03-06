import React from 'react';
import './App.css';


const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
}, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
    );

  // ---- callback handler ---- A callback function gets introduced (A), is used elsewhere (B), but “calls back” to the place it was introduced (C).
  // A
  const handleSearch = event => {
    // C
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>My Hacker Stories</h1>
      
      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />
      
      {/* creating an instance of List component */}
      <List list={searchedStories} />

    </div>
  );
}


const Search = props => {

  const [searchTerm, setSearchTerm] = React.useState('');
  
  const handleChange = event => {
    setSearchTerm(event.target.value);

    // B
    props.onSearch(event);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" 
        type="text" 
        value={props.search}
        onChange={props.onSearch} />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </div>
  );
};



const List = ({ list }) =>
  list.map(item => <Item key={item.objectID} item={item} />);

const Item = ({
  item: {
    title,
    url,
    author,
    num_comments,
    points,
  },
}) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
);


export default App;
