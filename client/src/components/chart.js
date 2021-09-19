import { Bar, Line } from "react-chartjs-2";

export const Chart = ({ chartData, title }) => {
  // const chartData = {};
  // const title = '';

  return (
    <div>
      <Bar
        data={chartData}
        // height={1500}
        // width={1400}
        options={{
          // animation: {
          //   duration: 2000,
          //   onProgress: function(context) {
          //     if (context.initial) {
          //       initProgress.value = context.currentStep / context.numSteps;
          //     } else {
          //       progress.value = context.currentStep / context.numSteps;
          //     }
          //   },
          //   onComplete: function(context) {
          //     if (context.initial) {
          //       console.log('Initial animation finished');
          //     } else {
          //       console.log('animation finished');
          //     }
          //   }
          // },
          plugins: {
            title: {
              display: true,
              text: title
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
