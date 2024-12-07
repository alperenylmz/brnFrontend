import { archivo_black } from "@/config/fonts";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FiCheck, FiLoader, FiDisc } from "react-icons/fi";

type RoadMapItem = {
  title: string;
  status: "in-active" | "developing" | "completed";
};

export type Roadmap = {
  quarter: string;
  items: Array<RoadMapItem>;
};

const RoadmapCard = (props: Roadmap) => {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen size

  return (
    <div className={`${isMobile ? "w-[320px]" : "w-[400px]"}  rounded-lg bg-opacity-10 bg-black shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-opacity-30 p-6 flex flex-col justify-between`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`${archivo_black.className} text-2xl`}>{props.quarter}</h3>
        <div className="p-3 bg-cyan-600 text-white rounded-full shadow-md">
          {props.items[0].status === "completed" ? (
            <FiCheck size={16} />
          ) : props.items[0].status === "developing" ? (
            <FiLoader size={16} className={'spin'} />
          ) : (
            <FiDisc size={16} />
          )}
        </div>
      </div>
      <div className="space-y-2">
        {props.items.map((item, index) => (
          <div key={index} className="flex gap-3 items-center justify-start text-white">
            <div
              className={`p-3 rounded-full ${
                item.status === "completed"
                  ? "bg-green-500"
                  : item.status === "developing"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            >
              {item.status === "completed" ? (
                <FiCheck size={16} />
              ) : item.status === "developing" ? (
                <FiLoader size={16} className={'spin'} />
              ) : (
                <FiDisc size={16} />
              )}
            </div>
            <p className="text-lg">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCard;
