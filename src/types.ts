export interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {};
}

export interface Hero {
  title: string;
  desc: string;
  image: string;
  buttons: { text: string; href: string; className: string }[];
}
