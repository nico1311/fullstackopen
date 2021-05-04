import React from 'react';

const Filter = ({filter, onChange}) => {
  return (
    <div>
      Search filter: <input value={filter} onChange={onChange} />
    </div>
  );
};

export default Filter;
