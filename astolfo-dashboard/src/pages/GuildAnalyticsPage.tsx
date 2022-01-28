import { useContext } from "react";
import { GuildContext } from "../utils/contexts/GuildContext";
import { useFetchGuildBans } from "../utils/contexts/hooks/useFetchGuildBans";
import { GuildBanLogsType } from "../utils/types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const GuildAnalyticsPage = () => {
  const { guild } = useContext(GuildContext);
  const guildId = (guild && guild.id) || "";

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 6);
  const fromDate = currentDate.toLocaleDateString();
  // const [currentDate, setCurrentDate] = useState<Date>((new Date().setDate(new Date().getDate() - 6) as Date);

  const getLabels = () => {
    const currentDate = new Date();
    const last = currentDate.getDate();
    const start = last - 6;
    const labels = [];
    for (let i = start; i <= last; i++) {
      currentDate.setDate(i);
      labels.push(`${currentDate.getMonth() + 1}/${currentDate.getDate()}`);
    }
    return labels;
  };

  const prepareDate = (data: GuildBanLogsType[]) => {
    const currentDate = new Date();
    const last = currentDate.getDate();
    const start = last - 6;
    const dataRecords = [];

    for (let i = start; i <= last; i++) {
      const records = data.filter(
        (banLog) => new Date(banLog.issuedOn).getDate() === i
      );
      dataRecords.push(records.length);
    }
    return dataRecords;
  };

  const { bans, loading, error, labels, preparedData } = useFetchGuildBans(
    guildId,
    fromDate,
    getLabels,
    prepareDate
  );

  console.log(bans, labels, preparedData);

  return (
    <div>
      <div style={{ width: "50%" }}>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: "Ban Analytics",
                data: preparedData,
                borderColor: "#fff",
                pointBorderColor: "#ff00",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
