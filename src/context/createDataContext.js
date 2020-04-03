import React, { useReducer, createContext } from 'react';

export default (reducer, actions, initalState) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    const boundActions = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const key in actions) {
      if (Object.prototype.hasOwnProperty.call(actions, key)) {
        boundActions[key] = actions[key](dispatch);
      }
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
