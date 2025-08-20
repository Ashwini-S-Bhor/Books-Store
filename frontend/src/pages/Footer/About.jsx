import React from "react";

const About = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        About Us
      </h1>

      
      <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto text-center">
        Welcome to our bookstore! We are passionate about connecting readers with stories that inspire, entertain, and educate.
      </p>

      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to create a welcoming space for book lovers of all ages and backgrounds. Whether you are looking for the latest bestsellers, timeless classics, or hidden gems, we strive to provide an exceptional selection and outstanding service.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600">
            Founded in 2025, our bookstore started as a small family-run business. Over the years, we have grown into a vibrant online community of readers, authors, and publishers, while still staying true to our roots and values.
          </p>
        </div>
      </div>

      
      <div className="mt-12 text-center">
        <p className="text-gray-700 mb-4">
          Thank you for being part of our journey. We look forward to helping you discover your next great read.
        </p>
        <a
          href="/"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-md transition"
        >
          Back to Home
        </a>
      </div>
    </section>
  );
};

export default About;
