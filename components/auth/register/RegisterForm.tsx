"use client";

import RegisterFields from "./RegisterFields";
import RegisterSocial from "./RegisterSocial";
import RegisterLogoHeader from "./RegisterLogoHeader";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterForm() {
  const {
    formData,
    handleChange,
    handleSubmit,
    error,
    errors,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
  } = useRegister();

  return (
    <div className="bg-gradient-to-l from-[#12141D] to-[#12151F] rounded-lg shadow-xl p-6 md:p-8 w-full">
      <RegisterLogoHeader />

      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <RegisterFields
          formData={formData}
          errors={errors}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          togglePassword={togglePassword}
          toggleConfirmPassword={toggleConfirmPassword}
          handleChange={handleChange}
        />

        <Button
          type="submit"
          disabled={isSubmitting || Object.values(errors).some(Boolean)}
          className="w-full btn-primary text-black font-medium rounded-md py-2 px-4 mt-4 hover:bg-[#96826b] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Registering...</span>
            </div>
          ) : (
            "Register"
          )}
        </Button>
      </form>
      <RegisterSocial />
    </div>
  );
}
