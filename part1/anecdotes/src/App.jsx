import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const selectRandom = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomInt);
  }

  const vote = (id) => {
    const newVotes = [...votes];
    newVotes[id] += 1;
    setVotes(newVotes);
  }

  const getMostVoted = () => {
    return votes.indexOf(Math.max(...votes));
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      Votes: {votes[selected]}
      <br />
      <button onClick={() => vote(selected)}>Vote</button>&nbsp;
      <button onClick={selectRandom}>Next anecdote</button>
      <br />
      <h2>Anecdote with most votes</h2>
      {anecdotes[getMostVoted()]}
      <br />
      Votes: {votes[getMostVoted()]}
    </div>
  )
}

export default App
