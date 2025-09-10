import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RootState, AppDispatch } from "../appstore/store";
import { logout } from "../slices/authSlice";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
      if (
        userRef.current &&
        !userRef.current.contains(event.target as Node)
      ) {
        setIsUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-xl font-bold text-green-600">
            FreelancingApp
          </Link>
        </div>

        {/* Middle Section */}
        <div className="flex items-center space-x-6">
          <Link to='/dashboard' className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">Dashboard</Link>

          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                Menu
              </button>
              {isMenuOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40 z-50">
                  {user.role === "Seller" && (
                    <>
                    <Link
                      to="/gigs"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View Gigs
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View Orders
                    </Link>
                    </>
                  )}
                  {user.role === "Buyer" && (
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View Purchases
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setIsUserOpen((prev) => !prev)}
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            {user?.name || "User"}
          </button>
          {isUserOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-50">
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
