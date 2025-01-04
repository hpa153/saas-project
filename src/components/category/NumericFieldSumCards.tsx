import { BarChart } from "lucide-react";

import Card from "../ui/card";
import { toCapitalizedString } from "@/lib/utils";

type NumericFieldSumCardsProps = {
  numericFieldSums: Record<
    string,
    { total: number; thisWeek: number; thisMonth: number; today: number }
  >;
  activeTab: "today" | "week" | "month";
};

const NumericFieldSumCards = ({
  numericFieldSums,
  activeTab,
}: NumericFieldSumCardsProps) => {
  if (Object.keys(numericFieldSums).length === 0) return null;

  return Object.entries(numericFieldSums).map(([field, sums]) => {
    const relevantSum =
      activeTab === "today"
        ? sums.today
        : activeTab === "week"
        ? sums.thisWeek
        : sums.thisMonth;

    return (
      <Card key={field}>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm/6 font-medium">{toCapitalizedString(field)}</p>
          <BarChart className="size-4 text-muted-foreground" />
        </div>

        <div>
          <p className="text-2xl font-bold">{relevantSum.toFixed(2)}</p>
          <p className="text-xs/5 text-muted-foreground">
            {activeTab === "today"
              ? "today"
              : activeTab === "week"
              ? "this week"
              : "this month"}
          </p>
        </div>
      </Card>
    );
  });
};

export default NumericFieldSumCards;
