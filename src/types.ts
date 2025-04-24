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

// types/index.ts
export interface Song {
    name: string;
    artworkUrl: string;
    previewUrl: string;
}

export interface SliderImage {
    src: string;
    alt: string;
}

export interface LyricsSong {
    id: number;
    title: string;
    lyrics: string;
}

export interface ArtistStat {
    label: string;
    value: string;
}