import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { parseISO } from "date-fns";

import EpisodeService from "../../services/rest/EpisodeService";
import { convertDurationToTimeString } from "../../utils/duration";

import styles from "./style.module.scss";

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
  episode: Episode;
}

export default function Episode(props: HomeProps) {
  const router = useRouter();

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnail}>
        <button type="button" onClick={() => router.back()}>
          <img src="/assets/imgs/arrow-left.svg" alt="Voltar" />
        </button>

        <Image width={700} height={170} src={props.episode.thumbnail} objectFit="cover" />

        <button type="button">
          <img src="/assets/imgs/play_arrow.svg" alt="Play" />
        </button>
      </div>

      <header>
        <h1>{props.episode.title}</h1>
        <span>{props.episode.members}</span>
        <span>{props.episode.publishedAt}</span>
        <span>{props.episode.durationString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: props.episode.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;

  const episodeService = new EpisodeService();
  const { data } = await episodeService.getEpisode(String(id));
  const episode = data;

  return {
    props: {
      episode: {
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
      },
    },
    revalidate: 1440,
  };
};
