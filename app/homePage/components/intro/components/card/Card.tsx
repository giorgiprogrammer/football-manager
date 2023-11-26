import style from "./style.module.css";

import ball from "@/app/assets/images/ball.png";

export default function Card() {
  return (
    <div>
      <a
        href="https://www.theguardian.com/football/blog/2023/aug/17/time-wasting-in-football-is-ugly-maddening-and-absolutely-vital"
        target="_blank"
      >
        <div className={style.card}>
          <div className={style.wrapper}>
            <img
              src="https://pbs.twimg.com/media/DonL130W0AA_iA_.jpg:large"
              className={style.coverImage}
            />
          </div>
          {/* <img
            src="https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415908615571"
            className={style.title}
          /> */}
          <img
            src="https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415908615571"
            className={style.character}
          />
        </div>
      </a>
    </div>
  );
}
