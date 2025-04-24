import { Song } from "@/types/song";

export async function getLatestTracks(artistId: string, limit: number = 6): Promise<Song[]> {
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=50&sort=recent`
    );
    const data = await response.json();

    if (!data.results) {
      return [];
    }

    // Get the main artist name from the first result
    const mainArtistName = data.results[0]?.artistName;
    
    if (!mainArtistName) {
      return [];
    }

    // Filter out the first result (which is the artist info) and keep only tracks where you're the primary artist
    const songs = data.results
      .slice(1)
      // Filter to only include tracks where you are the primary artist (exact match on artist name)
      .filter((track: any) => track.artistName === mainArtistName)
      // Convert to Song type with the required fields
      .map((track: any) => ({
        id: track.trackId,
        name: track.trackName,
        artist: track.artistName,
        previewUrl: track.previewUrl,
        artworkUrl: track.artworkUrl100.replace('100x100', '500x500'),
        albumName: track.collectionName,
        releaseDate: new Date(track.releaseDate),
      }))
      // Sort by release date (newest first)
      .sort((a: Song, b: Song) => b.releaseDate.getTime() - a.releaseDate.getTime());

    return songs.slice(0, limit);
  } catch (error) {
    console.error("Error fetching artist's own latest tracks:", error);
    return [];
  }
}