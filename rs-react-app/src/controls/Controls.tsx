import React from 'react';

export class Controls extends React.Component {
  render() {
    return (
      <div className="flex  p-6 rounded-lg border-2 max-w-sm text-center">
        <input
          type="text"
          placeholder="Search Input Field"
          className="border-2 rounded-l-sm "
        />
        <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded ">
          Search
        </button>
      </div>
    );
  }
}
