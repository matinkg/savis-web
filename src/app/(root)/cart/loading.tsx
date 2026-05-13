import nisaLoadingLogo from "@/lib/assets/images/nisa-loading-logo.webp";
import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center gap-y-6">
        <Image
          priority
          className="w-72"
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
