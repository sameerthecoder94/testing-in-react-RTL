import { useState } from 'react';
import { generateId, getNewExpirationTime } from './utils/utils';
import { AddThoughtForm } from './components/AddThoughtForm';
import { Thought } from './components/Thought';

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

  const removeThought = (thoughtIdToRemove) => {
    setThoughts((thoughts) =>
      thoughts.filter((thought) => thought.id !== thoughtIdToRemove)
    );
  };

  return (
    <div className='App'>
      <header>
        <h1>Passing Thoughts</h1>
      </header>
      <main>
        <AddThoughtForm addThought={addThought} />
        <ul className='thoughts'>
          {thoughts.map((thought) => (
            <Thought
              removeThought={removeThought}
              thought={thought}
              key={thought.id}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
