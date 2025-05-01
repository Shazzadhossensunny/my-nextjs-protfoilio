"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-6 text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-red-500 animate-pulse" />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-red-500">
            Something went wrong!
          </h1>

          <p className="text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10">
            {error.message}
          </p>
        </div>

        <Button
          onClick={() => reset()}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </Card>
    </div>
  );
};

export default ErrorPage;
