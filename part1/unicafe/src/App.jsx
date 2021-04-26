import React, { useState } from 'react'

const Statistic = ({name, value}) => {
  const cellStyles = {
    border: '1px solid rgb(190, 190, 190)',
    padding: 5,
    textAlign: 'center'
  }
  return (
    <tr>
      <td style={cellStyles}>{name}</td>
      <td style={cellStyles}>{value}</td>
    </tr>
  );
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad;
  let avg = (good * 1 + neutral * 0 + bad * (-1)) / total;

  if (total < 1) return <p>No feedback given.</p>;

  return (
    <table style={{border: '2px solid rgb(200, 200, 200)'}}>
      <tbody>
        <Statistic name="Good" value={good} />
        <Statistic name="Neutral" value={neutral} />
        <Statistic name="Bad" value={bad} />
        <Statistic name="Total" value={total} />
        <Statistic name="Average" value={avg} />
        <Statistic name="Positive" value={((good / total) * 100) + '%'} />
      </tbody>
    </table>
  )
}

const Button = ({label, handler}) => {
  return <button style={{marginRight: 5}} onClick={handler}>{label}</button>;
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div className="buttons">
        <Button label="Good" handler={() => setGood(good + 1)} />
        <Button label="Neutral" handler={() => setNeutral(neutral + 1)} />
        <Button label="Bad" handler={() => setBad(bad + 1)} />
      </div>

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App