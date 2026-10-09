import { RingLoader } from "react-spinners";
export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <RingLoader color="rgb(74, 175, 37)" />
    </div>
  );
}
