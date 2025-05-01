"use client";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Github, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md relative overflow-hidden backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
        {/* Morphism effect elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/30 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500/30 blur-3xl"></div>

        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Welcome back
          </CardTitle>
          <p className="text-slate-300 text-center">
            Sign in to your account to continue
          </p>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Social Login Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
              onClick={() =>
                signIn("google", {
                  callbackUrl:
                    "https://my-nextjs-portfolio-murex.vercel.app/dashboard",
                })
              }
            >
              <Mail className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
              onClick={() =>
                signIn("github", {
                  callbackUrl:
                    "https://my-nextjs-portfolio-murex.vercel.app/dashboard",
                })
              }
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/20"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
              Sign In
            </Button>
          </div>
          {/*
          <div className="text-center">
            <a href="#" className="text-sm text-slate-300 hover:text-white">
              Forgot your password?
            </a>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
