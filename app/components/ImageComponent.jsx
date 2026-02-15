import Image from "next/image";
import { urlFor } from "../sanity/imageCov";

const ImageComponent = ({ img, alt }) => {
  return (
    <Image
      src={urlFor(img).url()}
      alt={alt}
      fill
      sizes="100vw"
      style={{ objectFit: "cover" }}
    />
  );
};

export default ImageComponent;
