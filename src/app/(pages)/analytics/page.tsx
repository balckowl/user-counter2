"use client"
import { format } from 'date-fns'
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Progress } from "@/components/ui/progress"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

type DataType = {
    createdAt: string;
    contents: {
        countList: {
            sofaA: number;
            sofaB: number;
            sofaC: number;
            sofaD: number;
            box: number;
            pc: number;
            monitor: number;
            highchair: number;
            movable: number;
            tatami: number;
            silent: number;
            editorA: number;
            editorB: number;
        };
        comment?: string;
    };
};


async function fetchData(): Promise<DataType[]> {
    const url = "https://script.google.com/macros/s/AKfycbypqaKM8QC98cu3a6Ntka8xclr-_6Xi71Y0Gb2OfOeMmgKKEQ2b1oqG3EcPI-tECF0D/exec?limit=14"
    const res = await fetch(url, { cache: 'no-store' });
    return await res.json();
}

export default function Page() {
    const [data, setData] = useState<DataType[]>([]);
    useEffect(() => {
        fetchData().then((fetchedData) => {
            fetchedData.forEach(element => {
                delete element.contents.comment;
                element.createdAt = format(new Date(element.createdAt), "yyyy-MM-dd HH:mm");
            });
            setData(fetchedData);
        });
    }, []);


    const [progress, setProgress] = useState(13)
    if (data.length === 0) {
        setTimeout(() => setProgress(66), 500)

        return (
            <div className="flex min-h-screen items-center justify-center">
                <Progress value={progress} className="w-1/2" />
            </div>
        );
    }



    const today = new Date();
    const todayISO = format(today, "yyyy-MM-dd");
    let todayData = data.slice(0, 14)


    todayData = todayData.filter(element => {
        return element.createdAt.startsWith(todayISO);
    });


    const chartTodayData = todayData.reverse().map((element) => {
        return {
            date: format(element.createdAt, "HH:mm"),
            sofaA: element.contents.countList.sofaA,
            sofaB: element.contents.countList.sofaB,
            sofaC: element.contents.countList.sofaC,
            sofaD: element.contents.countList.sofaD,
            box: element.contents.countList.box,
            pc: element.contents.countList.pc,
            monitor: element.contents.countList.monitor,
            highchair: element.contents.countList.highchair,
            movable: element.contents.countList.movable,
            tatami: element.contents.countList.tatami,
            silent: element.contents.countList.silent,
            editorA: element.contents.countList.editorA,
            editorB: element.contents.countList.editorB
        };
    });

    const chartConfig = {
        sofaA: {
            label: "ソファー（左上）",
            color: "rgb(121, 134, 203)", // Indigo Lighten-1
        },
        sofaB: {
            label: "ソファー（左下）",
            color: "rgb(79, 195, 247)", // Light Blue Lighten-1
        },
        sofaC: {
            label: "ソファー（左上）",
            color: "rgb(255, 204, 128)", // Amber Lighten-2
        },
        sofaD: {
            label: "ソファー（右下）",
            color: "rgb(165, 214, 167)", // Green Lighten-3
        },
        box: {
            label: "ボックス席",
            color: "rgb(255, 171, 145)", // Deep Orange Lighten-3
        },
        pc: {
            label: "PC席",
            color: "rgb(178, 223, 219)", // Teal Lighten-4
        },
        monitor: {
            label: "モニター席",
            color: "rgb(255, 138, 101)", // Deep Orange Lighten-2
        },
        highchair: {
            label: "ハイチェア席",
            color: "rgb(197, 225, 165)", // Light Green Lighten-3
        },
        movable: {
            label: "可動席",
            color: "rgb(144, 202, 249)", // Blue Lighten-3
        },
        tatami: {
            label: "畳",
            color: "rgb(255, 238, 88)", // Yellow Accent-2
        },
        silent: {
            label: "静音",
            color: "rgb(129, 212, 250)", // Light Blue Lighten-3
        },
        editorA: {
            label: "編集MAC",
            color: "rgb(244, 143, 177)", // Pink Lighten-2
        },
        editorB: {
            label: "編集WIN",
            color: "rgb(179, 157, 219)", // Deep Purple Lighten-3
        },
    } satisfies ChartConfig;


    return (
        <div>
            <div className="mt-8 ml-4">
                <div className='text-3xl font-bold mb-4'>人数カウント統計情報</div>
                <p>PCでの閲覧推奨です</p>
            </div>
            <Card className="my-4 w-[80%] mx-auto">
                <CardHeader>
                    <CardTitle>今日の利用者数</CardTitle>
                    <CardDescription>{todayISO}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartTodayData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 5)}
                            />
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            {Object.entries(chartConfig).map(([key, value]) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    stackId="a"
                                    fill={value.color}
                                    radius={[0, 0, 0, 0]}
                                />
                            ))}
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
