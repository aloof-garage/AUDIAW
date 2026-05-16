import { Component, type ErrorInfo, type ReactNode } from 'react';

// Check if we're in development mode
const isDevelopment = !import.meta.env.PROD;

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the app.
 */

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(_error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-void flex items-center justify-center p-8">
          <div className="max-w-2xl w-full bg-surface-1 rounded-lg border border-DEFAULT p-8">
            {/* Error Icon */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-500 bg-opacity-20 rounded-full">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-semibold text-primary text-center mb-4">
              Something went wrong
            </h1>

            {/* Error Message */}
            <p className="text-secondary text-center mb-6">
              The application encountered an unexpected error. Please try reloading the page.
            </p>

            {/* Error Details (Development) */}
            {isDevelopment && this.state.error && (
              <div className="mb-6 p-4 bg-surface-void rounded border border-DEFAULT">
                <h2 className="text-sm font-semibold text-red-400 mb-2">
                  Error Details:
                </h2>
                <pre className="text-xs text-secondary overflow-auto max-h-48">
                  {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <>
                      {'\n\n'}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-surface-2 hover:bg-surface-3 text-primary rounded-lg border border-DEFAULT transition-colors duration-200"
              >
                Reload Page
              </button>
            </div>

            {/* Support Info */}
            <p className="text-xs text-tertiary text-center mt-6">
              If this problem persists, please report it to the development team.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Made with Bob
