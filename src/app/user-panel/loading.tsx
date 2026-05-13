import nisaLoadingLogo from "@/lib/assets/images/nisa-loading-logo.webp";
import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="m-auto h-fit w-fit">
      <div className="flex flex-col items-center gap-y-4">
        <Image
          priority
          className="w-52"
          src={nisaLoadingLogo}
          alt="nisa-loading-logo"
        />
        <>
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      </div>
    </div>
  );
}
