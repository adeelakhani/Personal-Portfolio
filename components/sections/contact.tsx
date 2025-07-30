"use client";

import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { BackgroundGradient } from "../ui/background-gradient";
import { useToast } from "../../hooks/use-toast";
import React from "react";

export function ContactSection() {
  const { toast } = useToast();


  const [result, setResult] = React.useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if(event.target instanceof HTMLFormElement){
    toast({
      description: "Your message has been sent."
    });
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "01e44113-d4fb-45c7-8393-e3108444da5c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    }  
  );

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  }
  };

  
  return (
    <section id="contact" className="p-8 pt-16 pb-2">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold"
      >
        Get in Touch
      </motion.h2>
      <div className="mx-auto max-w-md">
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10">
          <form
            onSubmit={onSubmit}
            action="https://api.web3forms.com/submit"
            className="space-y-6"
            id="contact-form"
          >
            <Input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="border-white/10 bg-black/50 backdrop-blur-sm"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                className="border-white/10 bg-black/50 backdrop-blur-sm"
              />
              <Textarea
                placeholder="Your Message"
                name="message"
                required
                className="min-h-[150px] border-white/10 bg-black/50 backdrop-blur-sm resize-none"
              />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
          <span>{result}</span>
        </BackgroundGradient>
      </div>
    </section>
  );
}
