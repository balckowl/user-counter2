"use client"

import Filed from "@/app/components/filed";
import { Textarea } from "@/components/ui/textarea";
import { Fragment, useState } from "react";
import { auth } from "@/lib/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaBox, FaChair, FaDesktop, FaLaptop } from "react-icons/fa";
import { SiSensu } from "react-icons/si";
import { RiSofaFill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import ModeSwitch from "@/components/ui/mode-switch";

export default function Page() {

    const [fieldValues, setFieldValues] = useState([
        { fieldName: "ボックス席", eName: "box", value: 0 },
        { fieldName: "モニター席", eName: "monitor", value: 0 },
        { fieldName: "PC席", eName: "pc", value: 0 },
        { fieldName: "畳", eName: "tatami", value: 0 },
        { fieldName: "ソファ（左上）", eName: "sofaA", value: 0 },
        { fieldName: "ハイチェア", eName: "highchair", value: 0 },
        { fieldName: "可動席", eName: "movable", value: 0 },
        { fieldName: "ソファ（右上）", eName: "sofaC", value: 0 },
        { fieldName: "ソファ（左下）", eName: "sofaB", value: 0 },
        { fieldName: "ソファ（右下）", eName: "sofaD", value: 0 },
        { fieldName: "編集（win）", eName: "editorA", value: 0 },
        { fieldName: "編集（mac）", eName: "editorB", value: 0 },
        { fieldName: "静音", eName: "silent", value: 0 }
    ]);

    const [memoText, setMemoText] = useState("");

    const handleFieldValueChange = (fieldName: string, value: number | string) => {
        const updatedFieldValues = [...fieldValues];
        const index = updatedFieldValues.findIndex(
            (field) => field.fieldName === fieldName
        );

        const numericValue = Number(value); // 値を明示的に数値型に変換

        if (index !== -1) {
            updatedFieldValues[index].value = numericValue;
        } else {
            const foundField = fieldValues.find((field) => field.fieldName === fieldName);
            if (foundField) {
                updatedFieldValues.push({ ...foundField, value: numericValue });
            }
        }

        setFieldValues(updatedFieldValues);
    };

    const router = useRouter()

    const signOutWithGoogle = async () => {
        await signOut(auth)
        router.push("/")
    }

    const sendData = async () => {
        toast.loading("送信中...");

        const baseUrl = "https://script.google.com/macros/s/AKfycbypqaKM8QC98cu3a6Ntka8xclr-_6Xi71Y0Gb2OfOeMmgKKEQ2b1oqG3EcPI-tECF0D/exec";

        const payload = {
            createdAt: new Date().toISOString(),
            contents: {
                countList: fieldValues.reduce((acc, field) => {
                    acc[field.eName] = Number(field.value); // 確実に数値に変換
                    return acc;
                }, {} as Record<string, number>),
                comment: memoText,
            },
        };

        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                toast.dismiss();
                toast.success("送信しました😃");

                // 3秒後にログアウト
                // setTimeout(() => {
                //     signOutWithGoogle();
                // }, 3000);
            } else {
                throw new Error("送信に失敗しました");
            }
        } catch {
            toast.dismiss();
            toast.error("送信に失敗しました😭");
        }
    };

    const [user, loading, error] = useAuthState(auth)

    if (loading) {
        return <p>ログイン状態を確認しています</p>
    }

    if (error) {
        return <p>エラーが発生しました: {error.message}</p>
    }

    if (!user) {
        return <p>認証してください</p>
    }

    return (
        <div className="flex h-screen">
            <div className="flex-[2] xl:flex justify-between flex-col border-r hidden">
                <div>
                    <div className="flex items-center px-5 py-4 border-b gap-3">
                        <Image src="/images/logo.png" width={30} height={30} alt="logo" className="rounded-sm" />
                        <h1 className="font-bold text-[18px] relative">
                            利用者集計くん
                        </h1>
                    </div>
                    <ul className="px-4 py-4 space-y-2">
                        <li>
                            <Button asChild variant="ghost">
                                <Link href="#map">集計マップ</Link>
                            </Button>
                        </li>

                        <li>
                            <Button asChild variant="ghost">
                                <Link href="/analytics" target="_blank">統計</Link>
                            </Button>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="flex justify-center mb-3">
                        <ModeSwitch />
                    </div>
                    <div className="border-t flex items-center justify-between py-4 px-5">
                        <div className="flex items-center gap-3">
                            <Fragment>
                                <Avatar className="size-[30px]">
                                    <AvatarImage src={user.photoURL!} />
                                    <AvatarFallback>{user.displayName}</AvatarFallback>
                                </Avatar>
                                <p className="font-bold">{user.displayName}</p>
                            </Fragment>
                        </div>
                        <Popover>
                            <PopoverTrigger>
                                <BsThreeDots />
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-[200px] p-0">
                                <ul>
                                    <li className="px-5 py-4 flex items-center gap-3" onClick={signOutWithGoogle}>
                                        <FiLogOut />
                                        ログアウト
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="flex-[9] xl:overflow-y-scroll h-full relative">
                <Toaster />
                {/* <div className="absolute top-5 left-10 font-bold">ver2.0.0</div> */}
                <div className="flex justify-center">
                    <div className="xl:w-[80%] w-[90%]">
                        <div className="py-[70px] border-b flex justify-center items-center lg:h-screen" id="map">
                            <div className="w-full">
                                <div className="flex justify-between mb-[15px]">
                                    <h2 className="text-left font-bold text-[25px]">集計マップ</h2>
                                    <Button onClick={sendData}>送信する</Button>
                                </div>
                                <div>
                                    <Textarea className="resize-none h-[100px] mb-[13px] focus:outline-none" placeholder="気づきがあれば、ここにお書きください。" onChange={(e) => setMemoText(e.target.value)} />
                                </div>

                                <div className="lg:grid lg:grid-cols-12 grid-rows-4 gap-4 mb-[50px] lg:space-y-0 space-y-4 ">
                                    <Filed className="col-span-3" filedName="ボックス席" onValueChange={handleFieldValueChange} maxSeats={3} icon={<FaBox />} />
                                    <Filed className="col-span-2 col-start-4" filedName="モニター席" onValueChange={handleFieldValueChange} maxSeats={1} icon={<FaDesktop />} />
                                    <Filed className="col-span-4 col-start-6" filedName="PC席" onValueChange={handleFieldValueChange} maxSeats={7} icon={<FaLaptop />} />
                                    <Filed className="col-span-3 col-start-10" filedName="畳" onValueChange={handleFieldValueChange} maxSeats={3} icon={<SiSensu />} />
                                    <Filed className="col-span-3 row-start-2" filedName="ソファ（左上）" onValueChange={handleFieldValueChange} maxSeats={6} icon={<RiSofaFill />} />
                                    <Filed className="col-span-3 col-start-4 row-start-2" filedName="ハイチェア" onValueChange={handleFieldValueChange} maxSeats={8} icon={<FaChair />} />
                                    <Filed className="col-span-3 col-start-7 row-start-2" filedName="可動席" onValueChange={handleFieldValueChange} maxSeats={11} />
                                    <Filed className="col-span-3 col-start-10 row-start-2" filedName="ソファ（右上）" onValueChange={handleFieldValueChange} maxSeats={6} icon={<RiSofaFill />} />
                                    <Filed className="col-span-3 row-start-3" filedName="ソファ（左下）" onValueChange={handleFieldValueChange} maxSeats={6} icon={<RiSofaFill />} />
                                    <Filed className="col-span-3 col-start-10 row-start-3" filedName="ソファ（右下）" onValueChange={handleFieldValueChange} maxSeats={6} icon={<RiSofaFill />} />
                                    <Filed className="col-span-2 col-start-7 row-start-4" filedName="編集（win）" onValueChange={handleFieldValueChange} maxSeats={2} />
                                    <Filed className="col-span-2 col-start-9 row-start-4" filedName="編集（mac）" onValueChange={handleFieldValueChange} maxSeats={2} />
                                    <Filed className="col-span-2 col-start-11 row-start-4" filedName="静音" onValueChange={handleFieldValueChange} maxSeats={1} />
                                </div>


                                {/* <div className="flex items-center gap-3">
                                    <IoArrowDownCircle />スクロールすると、サイトの使い方やメンテナンスを見ることができます。
                                </div> */}
                            </div>
                        </div>
{/* 
                        <div className="border-b py-[70px] h-screen" id="use">
                            <h2 className="font-bold text-[25px] mb-[15px]">サイトの使い方</h2>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
