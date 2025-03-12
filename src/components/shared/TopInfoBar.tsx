import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const TopInfoBar = () => {
  return (
    <div className="bg-[#0D401C] flex items-center px-4 justify-between text-white py-5">
      <div className="bg-[#235130] w-fit flex items-center gap-4 py-1 px-2 rounded-2xl">
        <h5>Welcome to AgriTech</h5>
        <span className="size-1.5 bg-[#F8C32C] rounded-full"></span>
        <h5>Agriculture & Organic Farms </h5>
      </div>
      <div className="flex items-center gap-14">
        {/* contract info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="p-2.5 bg-[#F8C32C] rounded-full w-fit">
              <Image
                width={15}
                height={15}
                alt="phone icon"
                src={"/icons/phone.svg"}
              ></Image>
            </div>
            <p>
              <p>+1 987 654 3210</p>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-[#F8C32C] rounded-full w-fit">
              <Image
                width={15}
                height={15}
                alt="phone icon"
                src={"/icons/mail.svg"}
              ></Image>
            </div>
            <p>
              <p>Donalfarms@gmail.com</p>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1.5 bg-[#F8C32C] rounded-full w-fit">
              <Image
                width={15}
                height={15}
                alt="phone icon"
                src={"/icons/location.svg"}
              ></Image>
            </div>
            <p>
              <p>Prinsengracht 250, Amsterdam Netherlands</p>
            </p>
          </div>
        </div>
        {/* social icon */}
        <div className="bg-[#235130] px-6 py-3 w-fit flex items-center rounded-3xl gap-4">
          <button>
            <FaFacebook className="text-[#8A9B8E]" />
          </button>
          <button>
            <FaTwitter className="text-[#8A9B8E]" />
          </button>
          <button>
            <FaLinkedin className="text-[#8A9B8E]" />
          </button>
          <button>
            <FaInstagram className="text-[#8A9B8E]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopInfoBar;
