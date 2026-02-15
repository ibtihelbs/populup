import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityConfig";

const { projectId, dataset } = sanityClient.config();
const builder = imageUrlBuilder({ projectId, dataset });
const urlFor = (source) => (source ? builder.image(source) : null);

export { urlFor };
