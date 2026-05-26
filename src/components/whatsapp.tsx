import whatsappIcon from "./assets/whatsapp.png";

export const WhatsAppIcon = ({ size = 20, className }) => {
  return (
    <img
      src={whatsappIcon}
      alt="WhatsApp"
      width={size}
      height={size}
      className={className}
    />
  );
};
