import { Bar } from "react-chartjs-2";

export const Chart = ({ chartData }) => {
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
