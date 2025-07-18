import React from 'react';

export class SimulateError extends React.Component {
  render() {
    throw new Error('Error simulated');
    return <div></div>;
  }
}
