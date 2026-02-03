import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail, Phone, MapPin, User, } from "lucide-react";

// Import components
import Breadcrumb from "../components/contact/Breadcrumb";
import FormField from "../components/contact/FormField";
import ContactInfoCard from "../components/contact/ContactInfoCard";
import SuccessMessage from "../components/contact/SuccessMessage";
import SubmitButton from "../components/contact/SubmitButton";

// Schema
const contactSchema = yup.object({
  name: yup.string().required("Vui lòng nhập họ tên"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  message: yup.string().required("Vui lòng nhập nội dung"),
}).required();

type ContactFormData = yup.InferType<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Điện thoại",
      details: ["1900 1234"],
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: ["support@educourse.vn"],
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Địa chỉ",
      details: ["Tầng 5, Toà nhà Innovate, TP.HCM"],
    },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Liên hệ" },
  ];

  const onSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
      
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Liên Hệ</h1>
          <p className="text-gray-600">Chúng tôi sẽ phản hồi trong thời gian sớm nhất</p>
        </div>

        {/* Success Message */}
        <SuccessMessage 
          message="Tin nhắn đã được gửi thành công" 
          isVisible={isSubmitted} 
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Gửi tin nhắn</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField 
                label="Họ và tên" 
                name="name" 
                error={errors.name} 
                required
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </FormField>

              <FormField 
                label="Email" 
                name="email" 
                error={errors.email} 
                required
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="example@gmail.com"
                  />
                </div>
              </FormField>

              <FormField 
                label="Nội dung" 
                name="message" 
                error={errors.message} 
                required
              >
                <textarea
                  {...register("message")}
                  rows={4}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nội dung tin nhắn..."
                />
              </FormField>

              <SubmitButton isLoading={isSubmitting} />
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, idx) => (
                <ContactInfoCard
                  key={idx}
                  icon={info.icon}
                  title={info.title}
                  details={info.details}
                />
              ))}
            </div>

            {/* Map Card */}
            <div className="border rounded-xl overflow-hidden">
              <div className="h-48 bg-emerald-50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                  <p className="text-gray-600 font-medium">Bản đồ vị trí</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">Địa chỉ văn phòng</h3>
                <p className="text-gray-600">
                  Tầng 5, Toà nhà Innovate, Quận 1, TP.HCM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;