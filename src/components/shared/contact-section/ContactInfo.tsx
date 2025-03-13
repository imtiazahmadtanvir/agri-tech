import { FaClock, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div>
      <img
        src="/farmer.png" // Directly reference the image in public folder
        alt="Farmer"
        className="rounded-lg w-full h-56 object-cover"
      />
      <div className="space-y-4 bg-yellow-500 shadow-lg mt-6 p-6 rounded-lg text-xs">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="bg-black/70 p-3 rounded-full w-10 h-10 text-white" />
          <div className="gap-2 text-brown-700">
            <h3 className="font-bold text-base">Farm Address</h3>
            <p className="text-gray-800 text-sm">
              Prinsengracht 250, 2501016 PM <br />
              Amsterdam, Netherlands
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="bg-black/70 p-3 rounded-full w-10 h-10 text-white" />
          <div className="gap-2 text-brown-700">
            <h3 className="font-bold text-base">Contact Us</h3>
            <p className="text-gray-800 text-sm">Donalfarms@gmail.com</p>
            <p className="text-gray-800 text-sm">Call Us: +1 987 654 3210</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="bg-black/70 p-3 rounded-full w-10 h-10 text-white" />
          <div className="gap-2 text-brown-700">
            <h3 className="font-bold text-base">Working Hours</h3>
            <p className="text-gray-800 text-sm">
              Mon - Fri: 8:00 AM - 6:00 PM <br />
              Sat: 9:00 AM - 5:00 PM <br />
              Holidays: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
