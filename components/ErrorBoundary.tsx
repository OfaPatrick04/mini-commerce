"use client";
import React, { Component, ReactNode } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen w-full px-4 sm:px-8 py-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg w-full bg-red-50 dark:bg-red-900/70 border border-red-200 dark:border-red-700 shadow-lg rounded-xl p-6 text-center backdrop-blur-sm"
          >
            <AlertTriangle
              size={48}
              className="text-red-600 dark:text-red-400 mb-4 mx-auto"
            />
            <h1 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-base">
              An unexpected error occurred. You can try again or go back to the homepage.
            </p>

            <div className="flex justify-center gap-3 mt-4 flex-wrap">
              <Button
                variant="primary"
                className="gap-2"
                onClick={() => (window.location.href = "/")}
              >
                <Home size={16} /> Go Home
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={this.handleRetry}
              >
                <RotateCcw size={16} /> Try Again
              </Button>
            </div>
          </motion.div>
        </main>
      );
    }

    return this.props.children;
  }
}
