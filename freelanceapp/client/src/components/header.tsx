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
    <header className="bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      
      {/* Left Section - Branding */}
      <div className="flex items-center space-x-4">
        <Link
          to="/dashboard"
          className="text-2xl font-extrabold text-white tracking-wide hover:opacity-90 transition"
        >
          Work<span className="text-yellow-300">ify</span>
        </Link>
      </div>

      {/* Middle Section - Nav Links */}
      <div className="flex items-center space-x-6">
        <Link
          to="/dashboard"
          className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
        >
          Dashboard
        </Link>

        {user?.id && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              Menu ▾
            </button>

            {isMenuOpen && (
              <div className="absolute left-0 mt-3 bg-white shadow-xl rounded-lg w-44 z-50 overflow-hidden">
                {user.role === "Seller" && (
                  <>
                    <Link
                      to="/gigs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      View Gigs
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      View Orders
                    </Link>
                  </>
                )}
                {user.role === "Buyer" && (
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    View Purchases
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section - User Dropdown */}
      {user?.id && (
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setIsUserOpen((prev) => !prev)}
            className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            {user?.name || "User"} ▾
          </button>

          {isUserOpen && (
            <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-lg w-44 z-50 overflow-hidden">
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </header>

  );
}

export default Header;
