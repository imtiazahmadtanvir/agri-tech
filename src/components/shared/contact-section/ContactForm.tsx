const ContactForm = () => {
  return (
    <div className="bg-gray-100 shadow-lg p-6 rounded-lg">
      <h1 className="my-3 text-green-700 text-xs">Let's Cooperate Together</h1>
      <h2 className="mb-2 font-bold text-black text-2xl">Contact Us Today!</h2>
      <p className="mb-6 text-gray-600 text-xs">
        We will reply within 24 hours via email, thank you for contacting us.
      </p>

      <form className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <input
          type="text"
          placeholder="Name*"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email*"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number*"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
          required
        />
        <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full">
          <option>You need support?</option>
          <option>General Inquiry</option>
          <option>Technical Support</option>
          <option>Partnership</option>
        </select>

        <textarea
          placeholder="Message..."
          className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
          rows={4}
        ></textarea>

        <div className="flex justify-between items-center gap-2 md:col-span-2">
          <div className="flex justify-between items-center gap-2">
            <input
              className="bg-yellow-500"
              type="checkbox"
              id="terms"
              required
            />
            <label htmlFor="terms" className="text-gray-600 text-xs">
              Agree to our terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center gap-2 md:col-span-2 bg-green-900 hover:bg-green-950 px-3 py-2 rounded-lg font-semibold text-white text-xs"
          >
            Send Message
            <span className="bg-yellow-500 p-1 rounded-full text-black text-xs">
              →
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
