import { formatDistanceToNow } from "date-fns";
import { BarChart2, Clock, Database } from "lucide-react";

type EventInfoProps = {
  type: "ping" | "field" | "events";
  data: Date | number | string | null;
};

const EventInfo = ({ type, data }: EventInfoProps) => {
  const iconStyle = "size-4 mr-2 text-brand-500";

  if (typeof data === "number") {
    data = data || 0;
  } else {
    data = data ? formatDistanceToNow(data) + " ago" : "Never";
  }

  return (
    <div className="flex items-center text-sm/5 text-gray-600">
      {type === "ping" ? (
        <Clock className={iconStyle} />
      ) : type === "field" ? (
        <Database className={iconStyle} />
      ) : (
        <BarChart2 className={iconStyle} />
      )}

      <span className="font-medium">
        {type === "ping"
          ? "Last ping:"
          : type === "field"
          ? "Unique fields:"
          : "Events this month:"}
      </span>
      <span className="ml-1">{data.toString()}</span>
    </div>
  );
};

export default EventInfo;
