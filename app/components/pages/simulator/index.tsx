import CtaButton from "../../buttons/ctaButton";
import MouseScrollIndicator from "../../global/mouseScrollIndicator";
import TextAnimation from "../../tatukaComponents/textAnimation/TextAnimation";
import style from "./style.module.css";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SimulatorPage() {
  return (
    <div className={style.simulatorPage}>
      {/* Right Menu */}
      <div
        className={
          "w-[25vw] h-screen fixed right-0 hidden sm:flex justify-center items-center "
        }
      >
        <CtaButton
          className="custom-font-2 font-bold text-xl sm:text-lg "
          onClick={() => {}}
          label="Open Simulator"
        />
      </div>
      {/* Left Menu */}
      <div
        className={
          "w-[25vw] h-screen fixed left-0 hidden sm:flex justify-center items-center "
        }
      >
        <CtaButton
          className="custom-font-2 font-bold text-xl sm:text-lg "
          onClick={() => {}}
          label="Sign Up"
        />
      </div>
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
              colors: ["#FFA700"],
            }}
            text="Simulator"
          />
        </div>
        {/* Text */}
        <h3 className="custom-font-2 mt-4 text-lg sm:text-sm">
          Maybe you are a YouTuber or someone who has a passion for making
          football content. This simulator is for you!
        </h3>

        {/* Youtube Image */}
        <div className=" w-[100%] sm:w-[50%] min-h-[50%] relative grayscale">
          <Image
            fill
            src="/website/images/pageAssets/youtube-icon.png"
            sizes="100vw"
            alt="youtube-icon"
          />
        </div>

        <h3 className="custom-font-2 mt-4 text-lg sm:text-sm">
          Here you can choose your desired teams, set parameters, then start
          recording your screen and make awesome content for your YouTube
          channel!
        </h3>

        <h2 className=" text-yellow-600 custom-font-2 font-bold text-3xl text-center mt-[100px]">
          Tournaments Feature
        </h2>

        <div>
          <h3 className="custom-font-2 mt-4 text-lg sm:text-sm">
            But not only that, you can also create{" "}
            <span className=" text-xl font-bold text-yellow-600">
              TOURNAMENTS
            </span>
            . In Tournament mode, you can choose 10 teams for each league and
            generate schedules. This will give you the possibility to create
            more interesting and{" "}
            <span className=" text-xl font-bold text-yellow-600">
              long-term
            </span>{" "}
            football content, or simply make it just for fun
          </h3>
        </div>

        {/*  Image 2 */}
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
            src="/website/images/pageAssets/image-2.png"
            sizes="100vw"
            alt="youtube-icon"
          />
        </motion.div>

        <p className="custom-font-2 mt-4 text-lg sm:text-sm h-fit">
          Here is the{" "}
          <Link
            target="_blank"
            className="font-bold text-blue-500 h-[20vh] underline text-xl cursor-pointer"
            href={"https://www.youtube.com/@Marb1eArena/videos"}
          >
            link
          </Link>{" "}
          to our YouTube channel, where you can explore a variety of examples
          showcasing our content. We invite you to browse through the videos and
          enjoy the diverse range of content we have to offer
        </p>

        <h2 className=" text-yellow-600 custom-font-2 font-bold text-3xl text-center mt-[100px]">
          How To Start
        </h2>

        <p className="custom-font-2 mt-4 text-lg sm:text-sm h-fit">
          while you will start, first at all you need to sign up, then you can
          open the simulator and choose your desired mode.
          <br></br>
          1. quiq match
          <br></br>
          2. tournament
          <br></br>
          If you choose a quick match, you will need to fill out a form. You
          will input the names of the first and second teams, set parameters,
          tactics, and icons before clicking the start button
        </p>

        {/*  Image 3 */}
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
            src="/website/images/pageAssets/image-3.png"
            sizes="100vw"
            alt="youtube-icon"
          />
        </motion.div>

        <CtaButton
          className="custom-font-2 text-xl sm:text-lg font-bold mt-7 sm:hidden"
          onClick={() => {}}
          label="Sign Up"
        />

        <h2 className=" text-yellow-600 custom-font-2 font-bold text-3xl text-center mt-[100px]">
          what you can set as a parameters
        </h2>

        <p className="custom-font-2 mt-4 text-lg sm:text-sm h-fit">
          This is the main concept that makes the simulator more interesting.
          You can set parameters such as:
          <span className="flex justify-center text-start">
            <br></br>
            1.Pass speed
            <br></br>
            2.Pass accuracy
            <br></br>
            3.Shoot speed
            <br></br>
            4.Shoot accuracy
            <br></br>
            5.Players motion speed
            <br></br>
            6.Goalkeepers motion speed
            <br></br>
            7.Pass delay
            <br></br>
            8.Formation of footballers
            <br></br>
          </span>
          <br></br>
          Additionally, you can set only the strength parameter, and all other
          parameters will be calculated automatically according to strength.
        </p>

        <CtaButton
          className="custom-font-2 font-bold mt-7 text-xl sm:text-lg "
          onClick={() => {}}
          label="Open Simulator"
        />

        <h2 className=" text-yellow-600 custom-font-2 font-bold text-3xl text-center mt-[100px]">
          A Short History and Future Prospects
        </h2>

        <p className="custom-font-2 mt-4 text-lg sm:text-sm h-fit">
          Initially, this project started out very simply. My cousin just wanted
          to make YouTube videos featuring quick matches, mostly between Premier
          League teams.
        </p>

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

        <p className="custom-font-2 mt-4 text-lg sm:text-sm h-fit">
          It was initially envisioned as a one-time project solely for recording
          videos, not as a full-fledged game or anything of the sort. After the
          first demo version was ready, the idea emerged that it had the
          potential to become a manager game. In this game, your mission would
          be to manage your team and make it the best in the world, with the
          main emphasis not on visuals but on strategy and tactics. However, the
          simulator aspect also proved to be quite intriguing. It became a
          realistic simulator where you could try to predict real match scores
          based on FIFA team ratings.
        </p>

        <p className="custom-font-2 mt-4 text-lg sm:text-sm h-fit">
          soon I will be adding more features, shaping it to be more suitable
          for content creators on social media platforms
        </p>

        <div className=" w-[10%] sm:w-[2%] fixed z-50 left-[0%] sm:left-[25%] bottom-[10%] sm:bottom-[40px]">
          <MouseScrollIndicator />
        </div>
      </div>
    </div>
  );
}
