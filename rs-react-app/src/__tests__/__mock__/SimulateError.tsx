import React from 'react';

export class SimulateError extends React.Component<{ simulate: boolean }> {
  render() {
    if (this.props.simulate) {
      throw new Error('Error simulated');
    }
    return <div>No error</div>;
  }
}
