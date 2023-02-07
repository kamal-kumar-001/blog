import React from 'react';

const MessageParser = ({ children, actions }) => {
    
  const parse = (message) => {
    // console.log(message);
    // if (message) {
      actions.handleAi(message);
    // }
    // if (message.includes('hello')) {
    //     actions.handleHello();
    //   }
    //   if (message.includes('dog')) {
    //     actions.handleDog();
    //   }
    //   if (message.includes('hi')) {
    //     actions.handleCustom();
    //   }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;