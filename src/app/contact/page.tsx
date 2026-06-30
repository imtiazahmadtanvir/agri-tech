import MapSection from "@/components/contact-page/map-section/MapSection";
import PageCover from "@/components/shared/PageCover";
import ContactUs from "@/components/shared/contact-section/ContactUs";

const ContactPage = () => {
  return (
    <div className="space-y-5">
      <PageCover location="Home/Contact" />
      <ContactUs />
      <MapSection />
    </div>
  );
};

export default ContactPage;
