import { useState } from 'react';
import { getNewExpirationTime, generateId } from './utils/utils';

const App = () => {
  const [thoughts, setThoughts] = useState([
    {
      id: generateId(),
      text: 'This is a place for your passing thoughts.',
      expiresAt: getNewExpirationTime(),
    },
    {
      id: generateId(),
      text: "They'll be removed after 15 seconds.",
      expiresAt: getNewExpirationTime(),
    },
  ]);

  return (
    <div className='App'>
      <header>
        <h1>Passing Thoughts</h1>
      </header>
    </div>
  );
};

export default App;
