"use client"

import { Button } from "@/components/ui/button";
import { auth, provider } from "@/lib/firebase/client";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const signInWithGoogle = async () => {
    provider.setCustomParameters({
      hd: "ima.aim.aoyama.ac.jp",
    });

    await signInWithPopup(auth, provider)
    router.push("/home")
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <Button className="flex items-center gap-3 rounded-full py-6 px-10 btn relative" variant="outline" onClick={signInWithGoogle}>
        ログインする
      </Button>
    </div>
  );
}
