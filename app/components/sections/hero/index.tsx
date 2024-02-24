import Image from "next/image";

export default function Hero() {
  return (
    <div className=" px-10 mt-[150px] custom-font-3 text-slate-600">
      {/* 1 */}
      <div className=" grid grid-cols-1 md:grid-cols-2 text-xl md:text-base items-center">
        {/* Text Content */}
        <div>
          <p className=" text-balance  ">
            Welcome to{" "}
            <strong className=" text-orange-600">Marble Arena</strong> the
            ultimate destination for Marble League enthusiasts! Step into the
            world of competitive marble sports and immerse yourself in the
            excitement of the Marble League. Here, you'll find everything you
            need to stay on top of the action.
          </p>
          <br></br>
          <br></br>
          <p className=" text-balance  ">
            Our dedication to providing comprehensive coverage means you'll
            never miss a beat. Whether you're tracking your favorite teams'
            progress or scouting out the competition, our website is your go-to
            source for all things Marble League.
          </p>
        </div>
        {/* Image Content */}
        <div className=" mt-10 md:mt-0 flex justify-center ">
          <Image
            src={"/website/images/img-3.png"}
            alt="hero_image"
            className=" w-[100%] md:w-[60%] grayscale  box-shadow"
            width={800}
            height={700}
          />
        </div>
      </div>
      {/* 2 */}
      <div className=" mt-[100px] grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Text Content */}
        <div className=" md:order-2 text-xl md:text-base">
          <p className=" text-balance  ">
            But we're not just about keeping score – we're about building a
            community of passionate fans who share our love for marble sports.
            That's why we're more than just a website; we're a vision for the
            future of competitive gaming.
          </p>
          <br></br>
          <br></br>
          <p className=" text-balance  ">
            With your support, we aim to transform the Marble League into a
            fully immersive gaming experience, complete with interactive
            features and thrilling gameplay. Our goal? To create a platform that
            combines the excitement of sports with the thrill of gambling, where
            every match is an opportunity to test your skills and win big.
          </p>
        </div>
        {/* Image Content */}
        <div className=" order-1 mt-10 md:mt-0 flex justify-center ">
          <Image
            src={"/website/images/img-2.png"}
            alt="hero_image"
            className=" w-[100%] md:w-[90%] grayscale"
            width={800}
            height={700}
          />
        </div>
      </div>
      <h2 className=" text-center text-balance mt-16 text-3xl">
        So, join us on this journey as we strive to turn our vision into
        reality. Together, we'll shape the future of marble sports and redefine
        what it means to be a fan. Welcome to Marble League –{" "}
        <strong className="text-orange-600 font-semibold">
          {" "}
          where the game is just beginning!{" "}
        </strong>
      </h2>
    </div>
  );
}
