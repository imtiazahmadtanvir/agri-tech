import {
  FaBell,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Container from "./max-w-container/Container";
import { RiTruckFill } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
const TopInfoBar = () => {
  return (
    <section className="bg-[#155728] ">
      <Container className="flex items-center px-5 justify-center lg:justify-between text-white py-2">
        <div className=" w-fit hidden lg:flex items-center gap-4  px-5 font-normal text-sm ">
          <span className="bg-[#336040] p-2.5 rounded-full text-[#F8C32C]">
            <FaBell />
          </span>
          <h5>Free Shipping On Order Over $120</h5>
        </div>
        <div className=" lg:flex items-center lg:gap-14">
          {/* contract info */}
          <div className="flex flex-col  md:flex-row items-center ">
            <div className="flex border-r border-dashed pr-1 border-amber-200 items-center gap-2">
              <div className="p-0.5 text-[#F8C32C] hidden md:block rounded-full w-fit">
                <RiTruckFill />
              </div>

              <p className="font-normal text-sm">Order Tracking</p>
            </div>
            <div className=" hidden md:flex items-center  ">
              <div className="px-0.5 py-2 text-[#F8C32C] rounded-full w-fit">
                <TbWorld />
              </div>

              <p className="font-normal text-sm">English</p>
            </div>
          </div>
          {/* social icon */}
          <div className="bg-[#FFFFFF17] py-2 px-5  w-fit hidden lg:flex items-center rounded-3xl gap-4">
            <button>
              <FaFacebook className="text- text-[#8A9B8E]" />
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
      </Container>
    </section>
  );
};

export default TopInfoBar;
