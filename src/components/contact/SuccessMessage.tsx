import { CheckCircle } from "lucide-react";
interface SuccessMessageProps {
  message: string;
  isVisible: boolean;
}
const SuccessMessage = ({ message, isVisible }: SuccessMessageProps) => {
  if (!isVisible) return null;

  return (
    <div className="mb-8 bg-emerald-50 border border-emerald-200 rounded-lg p-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-emerald-600" />
        <p className="text-emerald-700">{message}</p>
      </div>
    </div>
  );
};

export default SuccessMessage;