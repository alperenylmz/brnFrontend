import { useEffect, useState } from "react";
import { API_HOST } from "@/config";

type RoadMapItem = {
  title: string;
  status: 'in-active' | 'developing' | 'completed';
};

export type Roadmap = {
  quarter: string;
  items: RoadMapItem[];
};

export default function useRoadmap(): [
  Array<{ [year: string]: { quarters: Roadmap[] } }>,
  boolean,
  boolean,
  any
] {
  const [data, setData] = useState<
    Array<{ [year: string]: { quarters: Roadmap[] } }>
  >([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function getRoadmap() {
      setLoading(true);
      try {
        const request = await fetch(`http://51.20.121.61:1337/api/roadmap?populate[OverTheYears][populate][List][populate]=*`);
        const responseJson = await request.json();
        const response = responseJson;

        const roadmapData: Array<{ [year: string]: { quarters: Roadmap[] } }> =
          [];

        const years = response?.data?.attributes?.OverTheYears;
        if (Array.isArray(years)) {
          years.forEach((year: any) => {
            const yearName = year.Year || "Unknown Year";
            let quarters: Roadmap[] = [];

            if (Array.isArray(year.List)) {
              // Çeyrekleri doğrudan map'liyoruz
              quarters = year.List.map((quarterData: any) => {
                let items: RoadMapItem[] = [];

                if (Array.isArray(quarterData.List)) {
                  items = quarterData.List.map((task: any) => {
                    const title = task.Substances || "Untitled Task";
                    let status: 'in-active' | 'developing' | 'completed' =
                      'in-active';
                    if (task.isDone === true) {
                      status = 'completed';
                    } else if (task.isDone === false) {
                      status = 'developing';
                    }

                    return {
                      title,
                      status,
                    };
                  });
                }

                return {
                  quarter: `Q${quarterData.Quarter}`,
                  items,
                };
              });

              // Boş çeyrekleri filtreliyoruz
              quarters = quarters.filter((q) => q.items.length > 0);
            }

            roadmapData.push({
              [yearName]: {
                quarters,
              },
            });
          });
        }

        setData(roadmapData);
      } catch (e: any) {
        console.log(e.message);
        setHasError(true);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getRoadmap();
  }, []);

  return [data, isLoading, hasError, error];
}
