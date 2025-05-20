// components/login/LoginFields.tsx
import { IoIosEyeOff ,IoMdEye } from "react-icons/io";

type Props = {
  email: string;
  password: string;
  errors: { email?: string; password?: string };
  showPassword: boolean;
  _isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePassword: () => void;
};

export default function LoginFields({
  email,
  password,
  errors,
  showPassword,
  _isLoading,
  handleChange,
  togglePassword,
}: Props) {
  return (
    <>
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={handleChange}
          placeholder="user@example.com"
          className={`mt-1 block w-full rounded-md bg-[#1F2937] border ${
            errors.email ? "border-red-500 animate-shake" : "border-gray-700"
          } text-white shadow-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
            placeholder="At least 8 characters long"
            className={`block w-full rounded-md bg-[#1F2937] border ${
              errors.password ? "border-red-500 animate-shake" : "border-gray-700"
            } text-white shadow-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePassword}
          >
            {showPassword ? <IoIosEyeOff className="h-5 w-5 text-gray-400" /> : <IoMdEye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
      </div>
    </>
  );
}

