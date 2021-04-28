import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

import { format, parseISO } from "date-fns";
import { convertDurationToTimeString } from "../utils/duration";

import ptBR from "date-fns/locale/pt-BR";
import EpisodeService from "../services/rest/EpisodeService";
import styles from "./home.module.scss";

interface Episode {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  durationString: string;
  url: string;
}

interface HomeProps {
  latestEpisodes: Array<Episode>;
  allEpisodes: Array<Episode>;
}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {props.latestEpisodes.map((episode) => (
            <li key={episode.id}>
              <Image
                width={192}
                height={192}
                objectFit="cover"
                src={episode.thumbnail}
                alt={episode.title}
              />

              <div className={styles.episodeDetails}>
                <Link href={`/episode/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationString}</span>
              </div>

              <button type="button">
                <img
                  className={styles.img}
                  src="/assets/imgs/play_green.svg"
                  alt="Play"
                />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.allEpisodes.map((episode) => (
              <tr key={episode.id}>
                <td>
                  <Image
                    width={120}
                    height={120}
                    objectFit="cover"
                    alt={episode.title}
                    src={episode.thumbnail}
                  />
                </td>
                <td>
                  <Link href={`/episode/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.publishedAt}</td>
                <td>{episode.durationString}</td>
                <td>
                  <button type="button">
                    <img src="/assets/imgs/play_green.svg" alt="Play"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const episodeService = new EpisodeService();
  const { data } = await episodeService.getEpisodes();
  const episodes = data.map((episode) => ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    duration: episode.file.duration,
    durationString: convertDurationToTimeString(episode.file.duration),
    description: episode.description,
    url: episode.file.url,
  }));

  return {
    props: {
      latestEpisodes: episodes.slice(0, 2),
      allEpisodes: episodes.slice(2, episodes.length),
    },
    revalidate: 2880,
  };
};
