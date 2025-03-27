"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAllTasks } from "@/services/taskServices";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

const CardActivity = () => {
  const { data: taskData, isLoading, isError } = useGetAllTasks();

  const taskNotComplete = taskData?.message?.filter((item) => !item.Completed);
  const taskComplete = taskData?.message?.filter((item) => item.Completed);
  const chartData = [
    {
      browser: "complete",
      tasks: taskComplete?.length ?? 0,
      fill: "var(--color-complete)",
    },
    {
      browser: "pending",
      tasks: taskNotComplete?.length ?? 0,
      fill: "var(--color-pending)",
    },
  ];
  const chartConfig = {
    tasks: {
      label: "Tasks",
    },
    complete: {
      label: "Complete",
      color: "hsl(var(--chart-1))",
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const totalTasks = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.tasks, 0);
  }, [taskNotComplete, taskComplete]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching</p>;
  return (
    <Card className="bg-slate-200 border-none">
      <CardHeader>
        <CardTitle className="text-center">Complete vs Pending Tasks</CardTitle>
        <CardDescription className="text-center">
          Task completion status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-white" />}
            />
            <Pie
              data={chartData}
              dataKey="tasks"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default CardActivity;
