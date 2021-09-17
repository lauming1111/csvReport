import { Bar } from "react-chartjs-2";

export const Chart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={chartData}
        // height={600}
        // width={400}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Customer Monthly Usage report"
            },
            legend: {
              display: true,
              position: "bottom"
            }
          }
        }}
      />
    </div>
  );
};
