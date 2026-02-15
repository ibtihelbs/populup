import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  token: process.env.SANITY_WRITE_TOKEN,
});
export const HOME_QUERY = `
*[_type == "home"][0]
`;
export const ACTIVE_THEME_QUERY = `
*[_type == "theme" && active == true][0]{
  name,
  month,
  description,
  primaryColor,
  secondaryColor,
  accentColor,
  headingFont->{
    name,
    fontFamily
  },
  bodyFont->{
    name,
    fontFamily
  }
}
`;
export const UPCOMING_EVENTS_QUERY = `
*[_type == "event" &&
 (
   (isOneTimeEvent == true && date >= now()) ||
   (isOneTimeEvent == false && endDate >= now())
 )
] | order(coalesce(date, startDate) asc){
 _id,
  title,
  isOneTimeEvent,
  date,
  startDate,
  endDate,
  category,
  shortDescription,
  googleFormUrl,
  coverImage
}
`;
export const PAST_EVENTS_QUERY = `
*[_type == "event" &&
 (
   (isOneTimeEvent == true && date < now()) ||
   (isOneTimeEvent == false && endDate < now())
 )
] | order(coalesce(date, startDate) desc)
`;
export const FONTS_QUERY = `
*[_type == "font"]
`;
export const SPONSORS_QUERY = `*[_type == "sponsor"] | order(priority asc){
    name,
    website,
    description,
    "logo": logo.asset->url
  }`;
