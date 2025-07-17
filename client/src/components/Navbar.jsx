import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBag, Candy, Menu, X, Plus, Home } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Common link classes
  const desktopBaseClass = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
  const desktopActiveClass = "border-rose-500 text-gray-900";
  const desktopInactiveClass = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";

  const mobileBaseClass = "block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
  const mobileActiveClass = "border-rose-500 bg-rose-50 text-rose-700";
  const mobileInactiveClass = "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800";

  return (
    <nav className="bg-white shadow-sm border-b border-fuchsia-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink 
              to="/" 
              end
              className="flex items-center text-rose-600 hover:text-rose-700 transition-colors"
            >
              <ShoppingBag className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-fuchsia-600">Sweet</span> Shop
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) => 
                `${desktopBaseClass} ${isActive ? desktopActiveClass : desktopInactiveClass}`
              }
            >
              <Candy className="h-4 w-4 mr-1" />
              My Sweets
            </NavLink>
            <NavLink
              to="/sweets/add"
              className={({ isActive }) => 
                `${desktopBaseClass} ${isActive ? desktopActiveClass : desktopInactiveClass}`
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white">
            <NavLink
              to="/sweets"
              end
              className={({ isActive }) => 
                `${mobileBaseClass} ${isActive ? mobileActiveClass : mobileInactiveClass}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                My Sweets
              </div>
            </NavLink>
            <NavLink
              to="/sweets/add"
              className={({ isActive }) => 
                `${mobileBaseClass} ${isActive ? mobileActiveClass : mobileInactiveClass}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Sweet
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;