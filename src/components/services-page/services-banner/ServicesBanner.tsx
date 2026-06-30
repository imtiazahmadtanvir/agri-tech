import React from "react";
import { FaLeaf, FaDollarSign, FaTools, FaAppleAlt } from "react-icons/fa";

const services = [
    { icon: <FaAppleAlt />, title: "100% Organic Products", description: "Ultrices sagittis orci a scelerisque purus semper eget duis at. Sollicitudin nibh sit amet."},
    { icon: <FaTools />, title: "Absolute Quality", description: "Ultrices sagittis orci a scelerisque purus semper eget duis at. Sollicitudin nibh sit amet."},
    { icon: <FaLeaf />, title: "Environmentally Friendly", description: "Ultrices sagittis orci a scelerisque purus semper eget duis at. Sollicitudin nibh sit amet."},
    { icon: <FaDollarSign />, title: "Reasonable Price", description: "Ultrices sagittis orci a scelerisque purus semper eget duis at. Sollicitudin nibh sit amet."},
];

const ServicesBanner: React.FC = () => {
    return (
        <section className="bg-green-900 text-white py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                {services.map((service, index) => (
                    <div 
                        key={index} 
                        className={`flex flex-col items-center ${
                            index !== services.length - 1 ? "border-r-2 border-green-800 border-dashed" : ""
                        }`}
                    >
                        <div className="bg-yellow-500 text-amber-950 w-16 h-16 flex items-center justify-center rounded-full text-2xl">
                            {service.icon}
                        </div>
                        <h3 className="mt-4 font-bold text-lg">{service.title}</h3>
                        <p className="text-sm mt-2">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesBanner;
