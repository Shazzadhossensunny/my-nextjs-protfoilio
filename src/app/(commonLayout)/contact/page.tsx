"use client";
import React from "react";
import { motion } from "framer-motion";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendMessageToUser } from "@/utils/actions/sendMessageUser";
import toast from "react-hot-toast";

export interface TMessageOnlyDataSend {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await sendMessageToUser(data as TMessageOnlyDataSend);
      if (res.success) {
        toast(
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={24} />
            <div>
              <p className="font-semibold text-lg">Message Sent!</p>
              <p className="text-sm text-gray-300">
                We'll get back to you soon.
              </p>
            </div>
          </div>,
          {
            style: {
              background: "#1f2937",
              color: "#ffffff",
              border: "1px solid #4ade80",
              padding: "12px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#4ade80",
              secondary: "#ffffff",
            },
          }
        );
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    reset();
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Gmail",
      details: "shazzadhossensunny@gmail.com",
      link: "mailto:shazzadhossensunny@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "+8801831660652",
      link: "tel:+8801831660652",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      details: "Uttara,Dhaka,Bangladesh",
      link: "https://maps.google.com",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out
            using the form below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.details}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    {...register("name")}
                    placeholder="Write name here"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">
                      {errors.name.message as string}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Write email here"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message as string}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  {...register("subject")}
                  placeholder="What's this about?"
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && (
                  <span className="text-sm text-red-500">
                    {errors.subject.message as string}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  {...register("message")}
                  placeholder="Your message..."
                  className={`min-h-[150px] ${
                    errors.message ? "border-red-500" : ""
                  }`}
                />
                {errors.message && (
                  <span className="text-sm text-red-500">
                    {errors.message.message as string}
                  </span>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
