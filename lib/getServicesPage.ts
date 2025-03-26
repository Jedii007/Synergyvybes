import { client } from '@/sanity/lib/client';

type ServicesPageData = {
  introTitle: string;
  introText: string;
  expertiseTitle: string;
  expertiseText: string;
  videoId: string;
};

export async function getServicesPage() {
  return await client.fetch<ServicesPageData>(
    `*[_type == "servicesPage"][0]{
      introTitle,
      introText,
      expertiseTitle,
      expertiseText,
      videoId
    }`,
    {},
    {
      next: {
        revalidate: 0
      }
    }
  );
}
 

// import { client } from '@/sanity/lib/client';

// type ServiceItem = {
//   title: string;
//   description: string;
//   image: any;
// };

// type ServicesPageData = {
//   introText: ReactNode;
//   intro?: { title: string; text: string };
//   expertise?: { title: string; text: string };
//   services?: ServiceItem[];
//   videoId?: string;
//   testimonialsTitle?: string;
//   faqTitle?: string;
// };

// export async function getServicesPage() {
//   const data = await client.fetch<ServicesPageData | null>(
//     `*[_type == "servicesPage"][0]{
//       "introTitle": intro.title,
//       "introText": intro.text,
//       "expertiseTitle": expertise.title,
//       "expertiseText": expertise.text,
//       services,
//       videoId,
//       testimonialsTitle,
//       faqTitle
//     }`
//   );
//   return data ?? {}; // Return an empty object if null
// }
