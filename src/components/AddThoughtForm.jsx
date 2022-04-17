import React, { useState } from 'react';
import { generateId, getNewExpirationTime } from '../utils/utils';

export function AddThoughtForm({ addThought }) {
  const [text, setText] = useState('');

  const handleTextChange = ({ target }) => {
    const { value } = target;
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length) {
      setTimeout(() => {
        const thought = {
          id: generateId(),
          text: text,
          expiresAt: getNewExpirationTime(),
        };
        addThought(thought);
        setText('');
      }, 500);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='AddThoughtForm'>
      <input
        role='input'
        type='text'
        placeholder="What's on your mind?"
        value={text}
        onChange={handleTextChange}
      />
      <input role='submit' type='submit' value='Add' />
    </form>
  );
}
