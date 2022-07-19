import Paper from "@material-ui/core/Paper";
import randomColor from "randomcolor";
import Typography from "@material-ui/core/Typography";
import { VictoryBar, VictoryChart, VictoryContainer } from "victory";

import { Slate } from "../Slate";
import { useBiweeklyCount, useCaloriesAvg } from "@/apiHooks/useReports";
import { useStyles } from "./styles";

const style = {
  data: {
    fill: () => randomColor({ luminosity: "bright", hue: "blue" }),
  },
};

export const PageReport = () => {
  const classes = useStyles();
  const { data: count, error: countError } = useBiweeklyCount();
  const { data: averages, error: avgError } = useCaloriesAvg();

  return (
    <main className={classes.root}>
      <Paper className={classes.chart}>
        <Typography className={classes.title}>
          Number of added entries
        </Typography>
        <Slate data={count} error={countError}>
          <VictoryChart
            padding={{ left: 40, bottom: 35, top: 10, right: 20 }}
            domainPadding={{ x: 100, y: 50 }}
            height={400}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryBar
              barWidth={150}
              labels={({ datum }) => datum.y}
              data={[
                { x: "Last 7 Days", y: count?.currentWeek },
                { x: "Week before that", y: count?.lastWeek },
              ]}
              style={style}
            />
          </VictoryChart>
        </Slate>
      </Paper>
      <Paper className={classes.chart}>
        <Typography className={classes.title}>
          Average number of calories in last 7 days
        </Typography>
        <Slate data={averages} error={avgError}>
          <VictoryChart
            padding={{ left: 160, bottom: 35, top: 10, right: 20 }}
            domainPadding={15}
            height={400}
            width={750}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryBar
              horizontal
              labels={({ datum }) => datum.y}
              data={averages}
              style={style}
            />
          </VictoryChart>
        </Slate>
      </Paper>
    </main>
  );
};
