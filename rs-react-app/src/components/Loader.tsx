import React from 'react';

interface MySpinnerProps {
  size?: number;
  color?: string;
}

export class MySpinner extends React.Component<MySpinnerProps> {
  static defaultProps = {
    size: 50,
    color: '#3b82f6',
  };

  render() {
    const { size, color } = this.props;
    const circleSize = Number(size) / 2;
    return (
      <div className="flex flex-col justify-center items-center">
        <svg
          data-testid="loading-spinner"
          className="animate-spin origin-center"
          style={{
            transformOrigin: `${circleSize}px ${circleSize}px`,
            animation: 'spin 1s linear infinite',
          }}
          width={size}
          height={size}
          viewBox={`0 0 14 14`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <circle
              cx="7"
              cy="7"
              r="6"
              stroke={color}
              strokeOpacity=".5"
              strokeWidth="2"
            />
            <path
              fill={color}
              fillOpacity=".5"
              fillRule="nonzero"
              d="M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z"
            />
          </g>
        </svg>
        <p>Loading...</p>
      </div>
    );
  }
}
