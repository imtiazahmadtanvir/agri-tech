import {
  FaRegLemon,
  FaTractor,
  FaMapMarkedAlt,
  FaBoxOpen,
} from "react-icons/fa";

const steps = [
  {
    step: 1,
    title: "STEP 01",
    description: "Choose your products",
    icon: <FaRegLemon size={60} />,
  },
  {
    step: 2,
    title: "STEP 02",
    description: "Connect nearest farm",
    icon: <FaTractor size={60} />,
  },
  {
    step: 3,
    title: "STEP 03",
    description: "Share your location",
    icon: <FaMapMarkedAlt size={60} />,
  },
  {
    step: 4,
    title: "STEP 04",
    description: "Get delivered fast",
    icon: <FaBoxOpen size={60} />,
  },
];

const ProcessStep = ({
  step,
  title,
  description,
  icon,
}: (typeof steps)[0]) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-40 h-40 flex items-center justify-center bg-white text-green-700 rounded-full relative">
        {icon}

        <div className=" bg-[#F3F0EB] p-1.5 absolute -top-6 right-2 rounded-full">
          <div className="w-12 h-12 bg-white text-green-500  font-semibold text-xl rounded-full flex items-center justify-center">
            {step}
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="text-center mt-8">
        <h1 className="font-bold">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

const OurProcess = () => {
  return (
    <div className="py-20 relative">
      <div className="zigzag-border absolute top-0 left-0 w-full h-full " />
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Our Process</h2>
        <p className="text-lg text-gray-600">
          A simple four-step process to get fresh products delivered to your
          doorstep.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step) => (
          <ProcessStep key={step.step} {...step} />
        ))}
      </div>
    </div>
  );
};

export default OurProcess;