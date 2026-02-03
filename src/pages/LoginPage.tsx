import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Mail, Lock, Eye, EyeOff,} from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email")
    .trim()
    .max(100, "Email quá dài")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email không đúng định dạng"
    ),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(30, "Mật khẩu quá dài")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
    )
    .matches(
      /^[A-Za-z\d@$!%*?&]+$/,
      "Mật khẩu chỉ được chứa chữ cái, số và ký tự đặc biệt (@$!%*?&)"
    ),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Lấy redirect URL
  const getRedirectUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('redirect') || '/';
  };

  // Tự động điền email nếu đã chọn "Ghi nhớ đăng nhập"
  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (remembered === 'true' && savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setFormError("");

    setTimeout(() => {
      setIsSubmitting(false);
      
      // Lấy danh sách users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Tìm user
      const foundUser = users.find(
        (user: any) => 
          user.email === data.email && 
          user.password === data.password
      );
      
      if (foundUser) {
        // Lưu thông tin đăng nhập
        const loggedInUser = {
          id: foundUser.id,
          fullName: foundUser.fullName,
          email: foundUser.email,
          role: foundUser.role,
          isLoggedIn: true,
          token: `token_${Date.now()}`,
        };
        
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        
        // Ghi nhớ đăng nhập
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', data.email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('userEmail');
        }
        
        // Chuyển hướng
        const redirectUrl = getRedirectUrl();
        navigate(redirectUrl);
      } else {
        setFormError("Email hoặc mật khẩu không chính xác");
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chào mừng trở lại
          </h1>
          <p className="text-gray-600">
            Đăng nhập để tiếp tục học tập
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Form error */}
          {formError && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="example@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mật khẩu *
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Link 
                  to="/register" 
                  className="text-emerald-600 font-semibold hover:text-emerald-700"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;