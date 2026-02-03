import { Send } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  label?: string;
  loadingLabel?: string;
}

const SubmitButton = ({ 
  isLoading, 
  label = "Gửi tin nhắn", 
  loadingLabel = "Đang gửi..." 
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition duration-200 ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {loadingLabel}
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <Send className="h-4 w-4" />
          {label}
        </span>
      )}
    </button>
  );
};

export default SubmitButton;