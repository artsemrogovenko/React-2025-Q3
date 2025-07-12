import React from 'react';

interface ErrorProps {
  children: React.ReactNode;
}

interface ErrorState {
  errorMessage: string;
}
export class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  state: ErrorState = {
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error): ErrorState {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, info.componentStack);
  }

  resetError = () => {
    this.setState({ errorMessage: '' });
  };

  render() {
    if (this.state.errorMessage) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">
          Произошла ошибка..
          <button
            onClick={this.resetError}
            className="ml-2 px-2 py-1 bg-red-100 hover:bg-red-200 rounded"
          >
            ОК
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
