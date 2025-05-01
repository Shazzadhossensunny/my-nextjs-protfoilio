"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, LogIn, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoImg from "../../assets/images/logo_sunny.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { status } = useSession();
  const pathname = usePathname();

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ];

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  const isActive = (path: any) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const AuthButton = () => {
    if (status === "authenticated") {
      return (
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
      );
    }
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
      >
        <LogIn size={18} />
        <span>Login</span>
      </Link>
    );
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
            >
              <Image src={LogoImg} alt="Shazzad" width={150} height={150} />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? "text-white"
                        : "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                    }`}
                  >
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="activeMenuItem"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    {item.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Auth Button */}
            <div className="hidden md:block">
              <AuthButton />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="md:hidden absolute w-full bg-white dark:bg-gray-900"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <div key={item.title} className="relative">
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? "text-white relative z-10"
                    : "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isActive(item.href) && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md -z-10"
                    layoutId="activeMobileMenuItem"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                {item.title}
              </Link>
            </div>
          ))}

          {/* Mobile Auth Button */}
          <div className="px-3 py-2">
            <AuthButton />
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
