import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import style from "./style.module.css";
import Image from "next/image";
import { AppContext } from "@/app/context/appContext";
import AddNewTeam from "../addNewTeam";
import { deleteTeam } from "@/app/core/user";

export default function TeamSettingsModal({
  setShowTeamSettingsModal,
}: {
  setShowTeamSettingsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const appContext = useContext(AppContext);

  const [openAddNewTeam, setOpenAddNewTeam] = useState(false);

  const [openUpdateTeam, setOpenUpdateTeam] = useState(
    Object.keys(appContext.userTeams).map((team) => {
      return false;
    })
  );

  return (
    <div>
      {/* Background */}
      <div
        onClick={() => {
          setShowTeamSettingsModal(false);
        }}
        className=" w-screen h-screen bg-black opacity-80 fixed left-0 top-0 "
      ></div>
      {/* Main */}
      <div className="w-[90vw] h-[90vh] bg-white z-10 fixed ml-auto mr-auto left-0 right-0 mt-auto mb-auto top-0 bottom-0 rounded-md p-2 overflow-y-scroll ">
        {/* Top Bar */}
        <div className="flex justify-between ">
          <h2 className="font-bold text-3xl custom-font-2 text-gray-700 ">
            {" "}
            Your Teams{" "}
          </h2>
          <div className="flex items-center gap-4 ">
            <div className="w-[40px] h-[40px] relative ">
              <Image
                fill
                src="/website/images/pageAssets/done.png"
                sizes="100vw"
                alt="youtube-icon"
              />
            </div>
            <p className="text-xl custom-font-2 text-gray-700">
              {" "}
              Teams marked for the selector menu{" "}
            </p>
          </div>
        </div>
        {/* Teams */}
        <div className="mt-4 flex flex-col gap-[10px]">
          {Object.entries(appContext.userTeams).map((team, index) => {
            return (
              <div key={"team_" + index}>
                <div className=" w-fit flex items-center">
                  {/* Logo */}
                  <div className="w-[35px] h-[35px] relative px-2 ">
                    <Image
                      key={team[1].logoKey}
                      fill
                      src={`${
                        team[1].logoKey
                      }?timestamp=${new Date().getTime()}`}
                      sizes="100vw"
                      alt="youtube-icon"
                    />
                  </div>
                  {/* Name */}
                  <p className="custom-font-2 font-semibold text-gray-700 px-2 flex items-center h-[35px] ">
                    {team[1].name}
                  </p>
                  {/* Name */}
                  <p className="custom-font-2 font-semibold text-gray-700 px-2 flex items-center h-[35px] ">
                    Strength : {team[1].strength}
                  </p>
                  <button
                    onClick={() => {
                      // appContext.setUserTeams((prev) => {
                      //   const temp = { ...prev };
                      //   delete temp[team[0]];
                      //   return temp;
                      // });
                      if (Object.keys(appContext.userTeams).length <= 10) {
                        alert(" at least 10 teams must be in the list");
                        return;
                      } else {
                        deleteTeam(
                          appContext.userTeams,
                          appContext.userData.username,
                          team[0]
                        ).then((res) => {
                          console.log(res);
                          alert("Team Deleted Successfully");
                          window.location.reload();
                        });
                      }
                    }}
                    className="custom-font-2 font-semibold px-2 border-2 flex items-center h-[35px] bg-red-700 text-white duration-300 hover:bg-black"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      openUpdateTeam[index]
                        ? setOpenUpdateTeam((prev) => {
                            return prev.map((item, i) => {
                              if (i === index) {
                                return false;
                              }
                              return item;
                            });
                          })
                        : setOpenUpdateTeam((prev) => {
                            return prev.map((item, i) => {
                              if (i === index) {
                                return true;
                              }
                              return item;
                            });
                          });
                    }}
                    className="custom-font-2 font-semibold px-2 border-2 flex items-center h-[35px] bg-green-800 text-white duration-300 hover:bg-black"
                  >
                    Update
                  </button>
                  {/* Note */}
                  <div
                    onClick={() => {
                      appContext.setUserTeams((prev) => {
                        return {
                          ...prev,
                          [team[0]]: {
                            ...prev[team[0]],
                            selectedForMenu: !prev[team[0]].selectedForMenu,
                          },
                        };
                      });
                    }}
                    className="w-[35px] h-[35px] relative px-2 border-2 cursor-pointer "
                  >
                    {team[1].selectedForMenu && (
                      <Image
                        fill
                        src="/website/images/pageAssets/done.png"
                        sizes="100vw"
                        alt="note icon"
                      />
                    )}
                  </div>{" "}
                </div>
                {openUpdateTeam[index] && (
                  <AddNewTeam operationIs="update" team={team[1]} />
                )}
              </div>
            );
          })}
          {openAddNewTeam && <AddNewTeam operationIs="addNew" />}
          <div className="flex">
            <button
              onClick={() => {
                openAddNewTeam
                  ? setOpenAddNewTeam(false)
                  : setOpenAddNewTeam(true);
              }}
              className="custom-font-2 font-semibold px-2 border-2 flex items-center h-[35px] bg-green-800 text-white duration-300 hover:bg-black"
            >
              {openAddNewTeam ? "Close" : "Add New"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
