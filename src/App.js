import { useState } from 'react';
import { generateId, getNewExpirationTime } from './utils/utils';
import { AddThoughtForm } from './components/AddThoughtForm';

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

  const addThought = (thought) => {
    setThoughts((thoughts) => [...thoughts, thought]);
  };

  return (
    <div className='App'>
      <header>
        <h1>Passing Thoughts</h1>
      </header>
      <main>
        <AddThoughtForm addThought={addThought} />
        <ul>
          {thoughts.map((thought) => (
            <li key={thought.id}>
              <div>{thought.text}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
