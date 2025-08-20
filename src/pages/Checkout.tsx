import React, { useState } from "react";

type CheckoutFormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
};

export default function CheckoutForm() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // simple validation
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    // Here you would normally send the form data to a backend / payment API
    console.log("Checkout Data:", formData);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Order Successful!
        </h2>
        <p className="text-gray-700">Thank you for your purchase, {formData.name}.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <div>
        <label className="block font-medium">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Address *</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium">ZIP Code</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          placeholder="1234 5678 9012 3456"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
      >
        Place Order
      </button>
    </form>
  );
}
