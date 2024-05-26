export default function WarningModal({
  Title,
  text,
  callBack,
}: {
  Title: string;
  text: string;
  callBack: () => void;
}) {
  return (
    <div
      onClick={() => {
        callBack();
      }}
      className="z-[200] w-screen px-2 h-screen fixed bg-black opacity-90 flex justify-center items-center flex-col "
    >
      <h1 className="custom-font-1 text-3xl text-red-500">{Title}</h1>
      <p className="custom-font-2 text-center text-xl text-red-300">{text}</p>
    </div>
  );
}
