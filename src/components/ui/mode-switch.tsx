"use client"

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Switch } from "./switch";
import { Moon, Sun } from "lucide-react";

export default function ModeSwitch() {
    const { theme, setTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 初期のテーマに応じてスイッチの状態を設定
    useEffect(() => {
        setIsDarkMode(theme === "dark");
    }, [theme]);

    const handleCheckedChange = (checked: boolean) => {
        setIsDarkMode(checked);
        setTheme(checked ? "dark" : "light");
    };

    return (
        <div className="flex items-center gap-3">
            <Sun className="h-[1.2rem] w-[1.2rem]"/>
            <Switch
                checked={isDarkMode}
                onCheckedChange={handleCheckedChange}
            />
            <Moon className="h-[1.2rem] w-[1.2rem]"/>
        </div>
    );
}
