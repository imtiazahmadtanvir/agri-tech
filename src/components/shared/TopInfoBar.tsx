import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Container from "./max-w-container/Container";

const TopInfoBar = () => {
  return (
    <section className="bg-[#0D401C] ">
      <Container className="flex items-center px-5 justify-between text-white py-5">
        <div className="bg-[#FFFFFF17] w-fit flex items-center gap-4 py-2 px-5 font-normal text-sm rounded-3xl">
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
                  style={{ width: "auto", height: "auto" }}
                ></Image>
              </div>

              <p className="font-normal text-sm">+1 987 654 3210</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-[#F8C32C] rounded-full w-fit">
                <Image
                  width={15}
                  height={15}
                  alt="phone icon"
                  src={"/icons/mail.svg"}
                  style={{ width: "auto", height: "auto" }}
                ></Image>
              </div>

              <p className="font-normal text-sm">Donalfarms@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-2 bg-[#F8C32C] rounded-full w-fit">
                <Image
                  width={15}
                  height={15}
                  alt="phone icon"
                  style={{ width: "auto", height: "auto" }}
                  src={"/icons/location.svg"}
                ></Image>
              </div>

              <p className="font-normal text-sm">
                Prinsengracht 250, Amsterdam Netherlands
              </p>
            </div>
          </div>
          {/* social icon */}
          <div className="bg-[#FFFFFF17] py-2 px-5  w-fit flex items-center rounded-3xl gap-4">
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
