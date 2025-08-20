import React from "react";

const Contact = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Contact Us
      </h1>

      {/* Intro Text */}
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto text-center">
        We’d love to hear from you! Use the form below to get in touch or reach out to us via email or phone.
      </p>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Our Contact Details</h2>
          <p className="text-gray-600">📍 123 Book Street, Library City, 12345</p>
          <p className="text-gray-600">📞 +1 (555) 123-4567</p>
          <p className="text-gray-600">✉️ support@bookstore.com</p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
