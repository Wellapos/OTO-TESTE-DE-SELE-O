import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE,
  params: { api_key: API_KEY },
  timeout: 10000,
});

export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  overview?: string;
  genres?: { id: number; name: string }[];
  release_date?: string;
  revenue?: number;
};

export async function getTopRated(page = 1) {
  const res = await tmdb.get("/movie/top_rated", { params: { page } });
  return res.data;
}

export async function getMovieDetails(id: number) {
  const res = await tmdb.get(`/movie/${id}`);
  return res.data as Movie;
}

export const imageUrl = (path?: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : undefined;
