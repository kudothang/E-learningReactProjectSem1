import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ShoppingCart, User, ChevronDown, Bell, LogOut } from "lucide-react";
import { useCourseFilterStore } from "../../../stores/courseFilterStore";
import HeaderSearch from "./HeaderSearch";

interface UserData {
  fullName: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

function Header() {
  const [user, setUser] = useState<UserData | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const { search, setSearch, resetSearch } = useCourseFilterStore();

  const location = useLocation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const notificationCount = 0;
  
  // Kiểm tra xem có phải đang ở trang khóa học chi tiết không
  const isCourseDetailPage = pathname.includes("/courses/") && pathname !== "/courses";

  useEffect(() => {
    if (pathname !== "/courses") {
      resetSearch();
    }
  }, [pathname, resetSearch]);

  // Kiểm tra đăng nhập
  useEffect(() => {
    const checkLoggedInUser = () => {
      const loggedInUser = localStorage.getItem('currentUser');
      if (loggedInUser) {
        try {
          const userData = JSON.parse(loggedInUser);
          if (userData.isLoggedIn) {
            setUser(userData);
          } else {
            setUser(null);
            localStorage.removeItem('currentUser');
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem('currentUser');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkLoggedInUser();
    window.addEventListener('storage', checkLoggedInUser);
    return () => window.removeEventListener('storage', checkLoggedInUser);
  }, [location]);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showUserDropdown && !(e.target as Element).closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
      if (showSearchSuggestions && searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showUserDropdown, showSearchSuggestions]);

  const navItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/courses", label: "Khóa học" },
    { path: "/my-courses", label: "Khóa học của tôi" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Liên hệ" },
  ];

  const getUserInitial = () => {
    if (!user || !user.fullName) return "U";
    return user.fullName.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white border-b"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-4">
              {/* Hamburger (mobile) */}
              <button
                className="md:hidden"
                onClick={() => setOpenMenu(true)}
                aria-label="Menu"
              >
                <Menu size={26} className="text-gray-700 hover:text-emerald-600" />
              </button>

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2"
              >
                <div className="h-10 w-10 bg-linear-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EC</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-emerald-700 tracking-tight whitespace-nowrap">
                    Edu<span className="text-emerald-900">Course</span>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">Học tập thông minh</div>
                </div>
              </Link>
            </div>

            {/* Menu desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-all text-sm whitespace-nowrap ${location.pathname === item.path
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Sử dụng visibility hidden thay vì ẩn hoàn toàn */}
            <div className={`flex-1 max-w-2xl mx-4 ${isCourseDetailPage ? 'invisible' : ''}`}>
              <HeaderSearch />
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search mobile - ẩn nhưng vẫn giữ khoảng cách */}
              <button
                className={`lg:hidden p-2 text-gray-600 hover:text-emerald-600 whitespace-nowrap ${isCourseDetailPage ? 'invisible' : ''}`}
                onClick={() => navigate('/courses')}
                title="Tìm kiếm khóa học"
              >
                <Search size={20} />
              </button>

              {/* Notification */}
              <button className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
              >
                <ShoppingCart size={20} />
              </Link>

              {/* User/Auth */}
              {!user ? (
                <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
                  <Link
                    to="/login"
                    className="px-3 py-2 text-emerald-700 hover:text-emerald-800 font-medium transition-colors text-sm whitespace-nowrap"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 bg-linear-to-r from-emerald-600 to-emerald-700 text-white rounded-full hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap"
                  >
                    Đăng ký
                  </Link>
                </div>
              ) : (
                <div className="relative user-dropdown whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserDropdown(!showUserDropdown);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {getUserInitial()}
                      </span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* User dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-sm text-gray-900 truncate">{user.fullName}</p>
                        <p className="text-xs text-gray-500 mt-1 truncate">{user.email}</p>
                        <div className="mt-2 flex items-center">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full whitespace-nowrap">
                            {user.role === "student" ? "Học viên" : user.role}
                          </span>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 whitespace-nowrap"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <User size={16} className="mr-3" />
                        Hồ sơ của tôi
                      </Link>
                      <Link
                        to="/my-courses"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 whitespace-nowrap"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <span className="mr-3">📚</span>
                        Khóa học của tôi
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 whitespace-nowrap"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <ShoppingCart size={16} className="mr-3" />
                        Giỏ hàng
                      </Link>

                      <div className="border-t mt-2 pt-2">
                        <button
                          className="flex items-center w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 text-sm whitespace-nowrap"
                        >
                          <LogOut size={16} className="mr-3" />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Auth mobile */}
              {!user && (
                <Link
                  to="/login"
                  className="md:hidden px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm whitespace-nowrap"
                >
                  <User size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* SIDEBAR MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Link
            to="/"
            onClick={() => setOpenMenu(false)}
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 bg-linear-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">EC</span>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-700 whitespace-nowrap">EduCourse</div>
              <div className="text-xs text-gray-500 whitespace-nowrap">Học tập thông minh</div>
            </div>
          </Link>
          <button
            onClick={() => setOpenMenu(false)}
            className="p-2 hover:bg-gray-100 rounded-lg whitespace-nowrap"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Search mobile in menu - ẩn nhưng vẫn giữ khoảng cách nếu là trang chi tiết */}
        {!isCourseDetailPage && (
          <div className="p-6 border-b">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (search.trim()) {
                setSearch(search.trim());
                navigate("/courses");
                setOpenMenu(false);
              }
            }}>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (search.trim()) {
                        setSearch(search.trim());
                        navigate("/courses");
                        setOpenMenu(false);
                      }
                    }
                  }}
                  placeholder="Tìm khóa học..."
                  className="w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <Search
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400 cursor-pointer"
                  onClick={() => {
                    if (search.trim()) {
                      setSearch(search.trim());
                      navigate("/courses");
                      setOpenMenu(false);
                    }
                  }}
                />
              </div>
            </form>
          </div>
        )}

        {/* Menu items */}
        <div className="p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpenMenu(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${location.pathname === item.path
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="px-4 text-sm font-semibold text-gray-500 mb-3 whitespace-nowrap">TÀI KHOẢN</h3>
            {!user ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setOpenMenu(false)}
                  className="block px-4 py-3 rounded-lg border border-emerald-600 text-emerald-600 text-center hover:bg-emerald-50 font-medium whitespace-nowrap"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpenMenu(false)}
                  className="block px-4 py-3 rounded-lg bg-emerald-600 text-white text-center hover:bg-emerald-700 font-medium whitespace-nowrap"
                >
                  Đăng ký tài khoản
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 whitespace-nowrap"
                >
                  <User className="h-4 w-4 mr-3" />
                  Hồ sơ của tôi
                </Link>
                <Link
                  to="/my-courses"
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 whitespace-nowrap"
                >
                  <span className="mr-3">📚</span>
                  Khóa học của tôi
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 whitespace-nowrap"
                >
                  <ShoppingCart className="h-4 w-4 mr-3" />
                  Giỏ hàng
                </Link>
                <button
                  className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 flex items-center whitespace-nowrap"
                >
                  <span className="mr-3">🚪</span>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          {/* Contact info */}
          <div className="mt-8 px-4">
            <p className="text-sm text-gray-500 mb-2 whitespace-nowrap">📞 Hotline: 1900 1234</p>
            <p className="text-sm text-gray-500 whitespace-nowrap">✉️ support@educourse.vn</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;