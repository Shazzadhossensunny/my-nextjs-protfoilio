"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Img404 from "../assets/images/404.svg";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Adding aria-label for screen readers */}
        <div
          className="relative aspect-video w-full"
          aria-label="404 error - Page not found"
        >
          <Image
            src={Img404}
            alt="404 - Page not found illustration"
            fill
            className="object-cover rounded-3xl"
            priority
            onError={(e) => {
              // Fallback to a simple text if image fails to load
              const target = e.target as HTMLElement;
              target.style.display = "none";
            }}
          />
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
