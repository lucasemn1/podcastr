import styles from "./styles.module.scss";

export default function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/assets/imgs/playing.svg" alt="Ícone de headphone"/>
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className="empty">
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button>
            <img src="/assets/imgs/shuffle.svg" alt="Emabaralhar" />
          </button>
          <button>
            <img src="/assets/imgs/play-previous.svg" alt="Emabaralhar" />
          </button>
          <button className={styles.playButton}>
            <img src="/assets/imgs/play.svg" alt="Emabaralhar" />
          </button>
          <button>
            <img src="/assets/imgs/play-next.svg" alt="Emabaralhar" />
          </button>
          <button>
            <img src="/assets/imgs/repeat.svg" alt="Emabaralhar" />
          </button>
        </div>
      </footer>
    </div>
  );
}