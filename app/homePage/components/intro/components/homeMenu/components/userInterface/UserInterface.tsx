import TatukaButton from "@/app/components/button/TatukaButton";
import useApp from "@/app/hooks/useApp";
import { logout } from "@/app/services/supabase/user";

export default function UserInterface() {
  const { appContext } = useApp();

  return (
    <>
      <div className="absolute z-30 right-6 bottom-6">
        <TatukaButton
          onclick={() => {
            logout().then((res) => {
              if (typeof window !== "undefined") window.location.reload();
            });
          }}
          backgroundColor="white"
          paddingX={15}
          paddingY={8}
          fontSize={18}
          textColor="black"
          text="Log out"
        />
      </div>
      <h3 className=" absolute bottom-16 right-6 text-white">
        {appContext.userData?.username}
      </h3>
    </>
  );
}
