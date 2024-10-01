import {Chart} from "./chart";
import useScreenSize from "@/hooks/useScreenSize";

const useChartOptions = (labels: string[], colors: string[]) => {

    return {
        chart: {
            background: 'transparent'
        },
        colors: colors,
        dataLabels: {
            enabled: false
        },
        labels,
        legend: {
            show: false
        },
        plotOptions: {
            pie: {
                expandOnClick: false
            }
        },
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            },
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        stroke: {
            width: 0
        },
        tooltip: {
            fillSeriesColor: false
        }
    };
};

export const TokenAllocation = (props: any) => {
    const { allocations, sx } = props;
    const labels = allocations.map((allocation: any) => allocation.title);
    const chartSeries = allocations.map((allocation: any) => allocation.percentage);
    const colors = allocations.map((allocation: any) => allocation.color);
    const chartOptions = useChartOptions(labels, colors);

    const [screen] = useScreenSize();

    const getChartHeight = (screenWidth: number) => {
        console.log(screenWidth)
        if (screenWidth <= 375){
            return 300;
        } else if (screenWidth <= 412){
            return 350;
        }
        return 500;
    }

    return (
        <Chart
            height={getChartHeight(screen.width)}
            options={chartOptions}
            series={chartSeries}
            type="donut"
            width="100%"
        />
    );
};
