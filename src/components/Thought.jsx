import React, { useEffect } from 'react';

export const Thought = ({ thought, removeThought }) => {
  const handleRemoveClick = () => {
    removeThought(thought.id);
  };

  useEffect(() => {
    const timesUp = setTimeout(() => {
      removeThought(thought.id);
    }, thought.expiresAt - Date.now());

    return () => {
      clearTimeout(timesUp);
    };
  }, [thought, removeThought]);

  return (
    <li className='Thought' key={thought.id}>
      <button
        aria-label='Remove thought'
        className='remove-button'
        onClick={handleRemoveClick}
      >
        &times;
      </button>
      <div>{thought.text}</div>
    </li>
  );
};
