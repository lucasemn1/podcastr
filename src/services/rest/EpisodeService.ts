import axios, { AxiosInstance } from "axios";
import ServiceResponse from "../../interfaces/ServiceResponse";

interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
}

class EpisodeService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3333/episodes",
    });
  }

  public async getEpisodes(): Promise<ServiceResponse<Episode[]>> {
    try {
      const response = await this.api.get(
        "?limit=12&_sort=published_at&_order=desc"
      );

      return {
        status: true,
        data: response.data,
        response,
      };
    } catch (err) {
      return {
        status: false,
        data: err.response.data,
        response: err.response,
      };
    }
  }

  public async getEpisode(id: string): Promise<ServiceResponse<Episode>> {
    try {
      const response = await this.api.get(`/${id}`);

      return {
        status: true,
        data: response.data,
        response,
      };
    } catch (err) {
      return {
        status: false,
        data: err.response.data,
        response: err.response,
      };
    }
  }
}

export default EpisodeService;
