// In your @/types/song.ts file
export interface Song {
    id: number;
    name: string;
    artist: string;
    previewUrl: string;
    artworkUrl: string;
    albumName: string;
    releaseDate: Date; // Add this property
  }