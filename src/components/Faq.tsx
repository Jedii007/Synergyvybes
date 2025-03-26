import { client } from "@/sanity/lib/client";
import { Container } from "@/components/Container";

type FaqData = {
  question: string;
  answer: string;
};

async function getFaqs() {
  return await client.fetch<FaqData[]>(
    `*[_type == "faq"] | order(_createdAt desc) {
      question,
      answer
    }`,
    {},
    {
      next: {
        revalidate: 0
      }
    }
  );
}

export default async function Faq() {
  const faqs = await getFaqs();

  if (!faqs) return null;

  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="mb-5 rounded-lg bg-gray-50 dark:bg-trueGray-800 group"
          >
            <summary className="flex cursor-pointer items-center justify-between px-4 py-4 text-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-trueGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-indigo-100">
              {item.question}
              <svg
                className="w-5 h-5 text-indigo-500 transform transition-transform duration-200 group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </summary>
            <div className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </Container>
  );
}