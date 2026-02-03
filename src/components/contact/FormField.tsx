// components/contact/FormField.tsx
import React from "react";

interface FormError {
  message?: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  error?: FormError;
  children: React.ReactNode;
  required?: boolean;
}

const FormField = ({ 
  label, 
  name, 
  error, 
  children, 
  required = false 
}: FormFieldProps) => {
  return (
    <div>
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error?.message && (
        <p className="mt-1.5 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default FormField;