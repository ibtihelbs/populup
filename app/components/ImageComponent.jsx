import Image from "next/image";
import { urlFor } from "../sanity/imageCov";

const ImageComponent = ({ img, alt, className }) => {
  return (
    <Image
      src={urlFor(img).url()}
      alt={alt}
      fill
      sizes="100vw"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
};
export const Icons = ({ img, alt, className }) => {
  return (
    <Image
      src={urlFor(img).width(32).url()}
      alt={alt}
      className={className}
      width={32}
      height={32}
    />
  );
};

export default ImageComponent;
