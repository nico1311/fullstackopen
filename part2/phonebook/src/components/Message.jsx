import React from 'react';

const Message = ({text, style}) => {
  return (
    <div className={`message ${style ? style : ''}`}>
      {text}
    </div> 
  );
}

export default Message;
