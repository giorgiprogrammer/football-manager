import Link from "next/link";
import TextAnimation from "../../tatukaComponents/textAnimation/TextAnimation";
import style from "./style.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import MouseScrollIndicator from "../../global/mouseScrollIndicator";

export default function ForInvestors() {
  return (
    <div className={style.forInvestors}>
      {/* Feed */}
      <div className={style.feed}>
        {/* Title */}
        <div className="w-full mt-4 flex justify-center items-start ">
          <TextAnimation
            customOptions={{
              symbolAnimationTime: 3,
              fontSize: 30,
              speed: 95,
              mirror: true,
              style: "loading",
              colors: ["rgb(9, 53, 78)"],
            }}
            text="For Investors"
          />
        </div>

        <div>
          <h3 className="custom-font-2 mt-4 text-lg sm:text-sm">
            If you have the financial means and are considering investing in the
            <Link
              target="_blank"
              className="font-bold text-blue-500 h-[20vh] underline text-xl cursor-pointer"
              href={
                "https://www.linkedin.com/pulse/browser-games-market-report-global-demand-insights-7mlvf/"
              }
            >
              {" "}
              browser games industry
            </Link>{" "}
            , particularly in sports or strategy games which have shown
            tremendous potential, then feel free to reach out to me. With
            extensive experience in developing online browser games, I can offer
            valuable insights and expertise to help bring your investment to
            fruition.
          </h3>
        </div>

        {/*  Image 5 */}
        <motion.div
          transition={{ duration: 0.3 }}
          whileInView={{ scale: 0.8, opacity: 1 }}
          initial={{ scale: 0.5, opacity: 0 }}
          className={
            " w-[100%] min-h-[40%] sm:min-h-[50%] relative " + style.shadow
          }
        >
          <Image
            fill
            src="/website/images/pageAssets/image-5.png"
            sizes="100vw"
            alt="youtube-icon"
          />
        </motion.div>

        <div>
          <h3 className="custom-font-2 mt-4 text-lg sm:text-sm">
            To provide some context, recent statistics from reputable sources
            like Newzoo and Statista show a significant rise in the popularity
            of browser games. The global market for browser games is expected to
            reach a value of over $10 billion by 2025, representing substantial
            growth opportunities. Within this market, sports and strategy games
            have demonstrated particularly strong performance, attracting a
            diverse and engaged player base.
          </h3>
        </div>

        <div>
          <h3 className="custom-font-2 mt-4 text-lg sm:text-sm">
            For example, data reveals that the sports gaming segment alone is
            projected to account for a significant share of the browser games
            market, with a compound annual growth rate (CAGR) exceeding 8% over
            the next few years. Similarly, strategy games continue to enjoy
            robust growth, fueled by increasing demand from both casual and
            hardcore gamers.
          </h3>
        </div>

        {/*  Image 4 */}
        <motion.div
          transition={{ duration: 0.3 }}
          whileInView={{ scale: 0.8, opacity: 1 }}
          initial={{ scale: 0.5, opacity: 0 }}
          className={
            " w-[100%] min-h-[30%] sm:min-h-[50%] relative " + style.shadow
          }
        >
          <Image
            fill
            src="/website/images/pageAssets/image-4.png"
            sizes="100vw"
            alt="youtube-icon"
          />
        </motion.div>

        <div>
          <h3 className="custom-font-2 mt-4 text-lg sm:text-sm">
            By collaborating on this project, we can harness this growing market
            demand and capitalize on the lucrative opportunities it presents.
            Together, we can create a commercial venture with immense potential
            for success.
          </h3>
        </div>

        <h2 className=" text-yellow-600 custom-font-2 font-bold text-3xl text-center mt-[100px]">
          Contact Information
        </h2>
        <div>
          <p className="custom-font-2 mt-4 text-lg sm:text-sm">
            Email : tsotnedarjania1997@gmail.com
          </p>
          <p className="custom-font-2 mt-4 text-lg sm:text-sm">
            Phone : +995 592 02 28 24
          </p>

          <p className="custom-font-2 mt-4 text-lg sm:text-sm">
            LinkedIn :{" "}
            <Link
              target="_blank"
              className="font-bold text-blue-500 h-[20vh] underline text-xl cursor-pointer"
              href={"https://www.linkedin.com/in/tsotne-darjania-58380b231/"}
            >
              {" "}
              Tsotne Darjania
            </Link>
          </p>
        </div>

        <div className=" w-[10%] sm:w-[2%] fixed z-50 left-[0%] sm:left-[25%] bottom-[10%] sm:bottom-[40px]">
          <MouseScrollIndicator />
        </div>
      </div>
    </div>
  );
}
