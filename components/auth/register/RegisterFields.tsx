import React from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

type Props = {
  formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    univId: string;
  };
  errors: Record<string, string | undefined>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RegisterFields({
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  togglePassword,
  toggleConfirmPassword,
  handleChange,
}: Props) {
  return (
    <>
      <Field
        id="fullName"
        label="Full Name"
        type="text"
        value={formData.fullName}
        error={errors.fullName}
        onChange={handleChange}
      />

      <Field
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
      />

      <Field
        id="univId"
        label="University ID"
        type="text"
        value={formData.univId}
        error={errors.univId}
        onChange={handleChange}
      />

      <Field
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        error={errors.password}
        onChange={handleChange}
        showToggle
        onToggle={togglePassword}
        isVisible={showPassword}
      />

      <Field
        id="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        value={formData.confirmPassword}
        error={errors.confirmPassword}
        onChange={handleChange}
        showToggle
        onToggle={toggleConfirmPassword}
        isVisible={showConfirmPassword}
      />
    </>
  );
}

function Field({
  id,
  label,
  type,
  value,
  error,
  onChange,
  showToggle = false,
  onToggle,
  isVisible,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  onToggle?: () => void;
  isVisible?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-400">
        {label}
      </label>
      <div className="mt-1 relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={`block w-full rounded-md bg-[#1F2937] border ${
            error ? "border-red-500 animate-shake" : "border-gray-700"
          } text-white shadow-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {showToggle && onToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={onToggle}
          >
            {isVisible ? (
              <IoIosEyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <IoMdEye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
