"use client";

import Bound from "@/app/components/global/bound";
import BottomIndicators from "../BottomIndicators";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/context/appContext";
import TextAnimation from "@/app/components/tatukaComponents/textAnimation/TextAnimation";
import GetUserInformation from "@/app/components/global/getUserInformation";
import { useRouter } from "next/navigation";

export default function SimulatorPage() {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const [showGetUserInformation, setShowGetUserInformation] = useState(true);

  useEffect(() => {
    if (!showGetUserInformation && !appContext.userData.isLogin) {
      router.push("/");
    }
  }, [showGetUserInformation]);
  return (
    <div className="w-screen h-screen bg-slate-900">
      {showGetUserInformation && (
        <GetUserInformation
          callBack={() => {
            setShowGetUserInformation(false);
          }}
        />
      )}

      {appContext.userData.isLogin && (
        <Bound className="">
          <div className=" h-[80vh] relative overflow-y-scroll">
            {/* Cups */}
            <div>
              <div>
                <TextAnimation
                  customOptions={{ colors: ["gray"], fontSize: 40 }}
                  text="Cups"
                />
              </div>
              <div className="text-white">
                <div className="flex custom-font-2 border w-fit">
                  <h2 className="border px-3 py-2">Title : cup 1</h2>
                  <h2 className="border px-3 py-2">Teams : 23</h2>
                  <button className="border px-3 py-2 bg-green-700 text-white font-bold transition-all hover:bg-slate-800 duration-300">
                    continue
                  </button>
                  <button className="border px-3 py-2 bg-red-700 text-white font-bold transition-all hover:bg-slate-800 duration-300">
                    delete
                  </button>
                </div>
                <div className="flex custom-font-2 border w-fit">
                  <h2 className="border px-3 py-2">Title : cup 1</h2>
                  <h2 className="border px-3 py-2">Teams : 23</h2>
                  <button className="border px-3 py-2 bg-green-700 text-white font-bold transition-all hover:bg-slate-800 duration-300">
                    continue
                  </button>
                  <button className="border px-3 py-2 bg-red-700 text-white font-bold transition-all hover:bg-slate-800 duration-300">
                    delete
                  </button>
                </div>
              </div>
              <button className=" border-2 border-white mt-2 py-2 px-1 text-white custom-font-2 font-bold transition-all duration-300 hover:bg-white hover:text-black  ">
                Create New One
              </button>
            </div>

            {/* Leagues */}
            <div className=" text-white">
              <div>
                <TextAnimation
                  customOptions={{ colors: ["gray"], fontSize: 40 }}
                  text="Leagues"
                />
              </div>
              <div>
                <div className="flex custom-font-2 border w-fit">
                  <h2 className="border px-3 py-2">Title : League 1</h2>
                  <h2 className="border px-3 py-2">Teams : 23</h2>
                  <button className="border px-3 py-2 bg-green-700 text-white font-bold transition-all hover:bg-slate-800 duration-300">
                    continue
                  </button>
                  <button className="border px-3 py-2 bg-red-700 text-white font-bold transition-all hover:bg-slate-800 duration-300">
                    delete
                  </button>
                </div>
                <div className="flex custom-font-2 border w-fit">
                  <h2 className="border px-3 py-2">Title : cup 1</h2>
                  <h2 className="border px-3 py-2">Teams : 23</h2>
                  <button className="border px-3 py-2 bg-green-700 text-white font-bold transition-all hover:bg-slate-800 duration-300">
                    continue
                  </button>
                  <button className="border px-3 py-2 bg-red-700 text-white font-bold transition-all hover:bg-slate-800 duration-300">
                    delete
                  </button>
                </div>
              </div>
              <button className=" border-2 border-white mt-2 py-2 px-1 text-white custom-font-2 font-bold transition-all duration-300 hover:bg-white hover:text-black  ">
                Create New One
              </button>
            </div>
          </div>
          {/* Line */}
          <BottomIndicators />
        </Bound>
      )}
    </div>
  );
}