import Image from "next/image";

const FeatureCard = () => {
    return (
        <div className="relative w-[320px] lg:w-[520px] h-[380px] lg:h-[652px]">
            <Image 
                src="/FeatureCard Cover.webp" 
                alt="Background" 
                layout="fill" 
                objectFit="cover" 
                className="rounded-lg shadow-lg"
            />
            <div className="absolute top-10 -left-12 lg:-left-20">
                <Image 
                    src="/FeatureCard Cover Token.webp" 
                    alt="Foreground" 
                    width={150} 
                    height={150} 
                    
                />
            </div>
        </div>
    );
};

export default FeatureCard;
