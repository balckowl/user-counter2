import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-center h-[80px] border-b xl:hidden">
      <div className="w-[90%] h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" width={30} height={30} alt="logo" className="rounded-sm" />
          <h1 className="font-bold text-[18px] relative">
            利用者集計くん
          </h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
