"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  FileText,
  FolderOpen,
  MessageSquare,
  User,
  Settings,
  LogOut,
  ChevronDown,
  PlusCircle,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

interface UserProfile {
  name: string;
  email: string;
  image: string;
}

interface SidebarProps {
  children?: React.ReactNode;
  userProfile: UserProfile;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  submenu?: {
    id: string;
    label: string;
    path: string;
    icon: React.ReactNode;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, userProfile }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      id: "blogs",
      label: "Blog Management",
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        {
          id: "create-blog",
          label: "Create Blog",
          path: "/dashboard/blogs/create",
          icon: <PlusCircle className="h-4 w-4" />,
        },
        {
          id: "blog-list",
          label: "Blog List",
          path: "/dashboard/blogs",
          icon: <ListOrdered className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "projects",
      label: "Project Management",
      icon: <FolderOpen className="h-5 w-5" />,
      submenu: [
        {
          id: "create-project",
          label: "Create Project",
          path: "/dashboard/projects/create",
          icon: <PlusCircle className="h-4 w-4" />,
        },
        {
          id: "project-list",
          label: "Project List",
          path: "/dashboard/projects",
          icon: <ListOrdered className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "messages",
      label: "Message Management",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/dashboard/messages",
    },
    // {
    //   id: "settings",
    //   label: "Settings",
    //   icon: <Settings className="h-5 w-5" />,
    //   path: "/dashboard/settings",
    // },
  ];

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b dark:border-gray-700">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Dashboard
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {item.submenu ? (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() => toggleSubmenu(item.id)}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-3">{item.label}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expandedMenus.includes(item.id) ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                      <AnimatePresence>
                        {expandedMenus.includes(item.id) && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-6 space-y-2"
                          >
                            {item.submenu.map((subitem) => (
                              <li key={subitem.id}>
                                <Button
                                  variant={
                                    pathname === subitem.path
                                      ? "default"
                                      : "ghost"
                                  }
                                  className={`w-full justify-start text-sm ${
                                    pathname === subitem.path
                                      ? "bg-purple-600 text-white hover:bg-purple-700"
                                      : ""
                                  }`}
                                  onClick={() => handleNavigation(subitem.path)}
                                >
                                  {subitem.icon}
                                  <span className="ml-2">{subitem.label}</span>
                                </Button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Button
                      variant={pathname === item.path ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        pathname === item.path
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : ""
                      }`}
                      onClick={() => item.path && handleNavigation(item.path)}
                    >
                      {item.icon}
                      <span className="ml-1">{item.label}</span>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t dark:border-gray-700 p-4">
            <div className="relative">
              <Button
                variant="ghost"
                className="w-full justify-between items-center relative"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="flex items-center min-w-0 flex-1">
                  {userProfile.image ? (
                    <img
                      src={userProfile.image}
                      alt={userProfile.name}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                  )}
                  <div className="ml-3 min-w-0 flex-1">
                    <p
                      className="text-sm font-medium truncate"
                      title={userProfile.name} // This will show full name on hover
                    >
                      {userProfile.name}
                    </p>
                    <p
                      className="text-xs text-gray-500 dark:text-gray-400 truncate"
                      title={userProfile.email} // This will show full email on hover
                    >
                      {userProfile.email}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform flex-shrink-0 ml-2 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 dark:text-red-400"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64 min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 min-h-11 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
