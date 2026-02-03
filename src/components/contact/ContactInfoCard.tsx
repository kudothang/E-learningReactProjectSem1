// ContactInfoCard.tsx - Option 2
import React from "react";

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
}

const ContactInfoCard = ({ icon, title, details }: ContactInfoCardProps) => {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-xl transition duration-200 hover:shadow-md">
      <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        {details.map((detail, index) => (
          <p key={index} className="text-gray-600">{detail}</p>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoCard;