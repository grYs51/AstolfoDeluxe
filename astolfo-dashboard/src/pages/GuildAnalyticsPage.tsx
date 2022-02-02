import { useContext } from "react";
import { GuildContext } from "../utils/contexts/GuildContext";
import { useFetchGuildLogs } from "../utils/contexts/hooks/useFetchGuildLogs";
import { GuildLogsType } from "../utils/types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  Tooltip,
} from "chart.js";
import { Container, Page, Title } from "../utils/styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

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

  const prepareDate = (data: GuildLogsType[]) => {
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

  const { bans, loading, error, labels, preparedData } = useFetchGuildLogs(
    guildId,
    fromDate,
    getLabels,
    prepareDate
  );

  console.log(bans, labels, preparedData);

  return (
    <Page>
      <Container>
        <Title>ModLog Chart</Title>
        <div>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Log Analytics",
                  data: preparedData,
                  borderColor: "#fff",
                  pointBorderColor: "#ff00",
                },
              ],
            }}
            options={{
              responsive: true,
              hover: {
                mode: "nearest",
                intersect: false,
              },
            }}
          />
        </div>
      </Container>
    </Page>
  );
};
