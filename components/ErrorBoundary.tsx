/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error if needed
    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="px-4 sm:px-8 py-8 flex flex-col items-center justify-center min-h-[60vh] w-full">
          <div className="max-w-lg w-full bg-red-50 dark:bg-red-900 rounded-lg shadow p-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Something went wrong</h1>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4">An unexpected error occurred. Please try again or go back to the homepage.</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => window.location.href = '/'}>Go Home</button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
