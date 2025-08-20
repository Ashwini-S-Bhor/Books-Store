import React from "react";

const Services = () => {
  const services = [
    {
      title: "Book Sales",
      description: "Explore a vast collection of books across all genres, available for purchase both in-store and online.",
      icon: "📚",
    },
    {
      title: "Book Rentals",
      description: "Rent your favorite titles for an affordable price and enjoy flexible return options.",
      icon: "📖",
    },
    {
      title: "Personalized Recommendations",
      description: "Get curated book suggestions based on your reading preferences and past purchases.",
      icon: "✨",
    },
    {
      title: "Author Events & Signings",
      description: "Attend exclusive events with your favorite authors, including book signings and talks.",
      icon: "🖊️",
    },
    {
      title: "Subscription Plans",
      description: "Subscribe and receive new releases and bestsellers delivered to your doorstep each month.",
      icon: "📦",
    },
    {
      title: "Gift Cards",
      description: "Share the joy of reading with customizable gift cards for any occasion.",
      icon: "🎁",
    },
  ];

  return (
    <div className="bg-white text-gray-800 py-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl font-bold text-center mb-4">Our Services</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Discover all the ways we bring the best reading experience to you.
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <a
          href="/"
          className="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded hover:bg-blue-700 transition"
        >
          Browse Books
        </a>
      </div>
    </div>
  );
};

export default Services;
