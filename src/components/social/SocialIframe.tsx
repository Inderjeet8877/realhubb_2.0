interface SocialIframeProps {
  src: string;
  title: string;
  height?: number;
}

const SocialIframe = ({ src, title, height = 600 }: SocialIframeProps) => {
  return (
    <div className="w-full flex justify-center">
      <iframe
        src={src}
        title={title}
        className="w-full max-w-7xl border-0"
        style={{ height }}
        loading="lazy"
      />
    </div>
  );
};

export default SocialIframe;
