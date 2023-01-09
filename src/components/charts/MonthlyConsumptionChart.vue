<template>
  <div class="py-3 bg-gradient-dark border-radius-lg pe-1">
    <div class="chart">
      <canvas id="chart-bars" class="chart-canvas" height="250"></canvas>
    </div>
  </div>
  <!-- <h6 class="mt-4 mb-0 ms-2">Monthly Consumption</h6>
  <h6 class="mt-4 mb-0 ms-2">{{ chartData.data }}</h6>
  <p class="text-sm ms-2">
    (<span class="font-weight-bolder">+99%</span>) than last month
  </p> -->

</template>
<script>
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  name: "MonthlyConsumptionChart",
  props: {
    customerCode: {
      type: String,
      required: true
    }
  },

  // chartData: {
  //   labels: [],
  //   data: []
  // },

  computed: {
    barChartData() {
      return this.chartData
    }
  },

  data() {
    return {
      chartData: {
        labels: ["Jan","Feb","Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    }
  },

  methods: {
    async getChartData() {
        try {
          const config = {
            method: 'get',
            url: `https://s0qtw4yb57.execute-api.af-south-1.amazonaws.com/v1/chart?customercode=${this.$route.params.id}&chart=monthly`,
            headers: {
              'Accept': '*',
              'Access-Control-Allow-Origin': '*',
              'authorizationToken': '584abbe0928f4ba684e52118fdebc41d'
            }
          }
          const response = await axios(config);
          // JSON responses are automatically parsed.
          this.chartData = response.data;
        } catch (error) {
          console.log(error);
        }
        this.renderBarChart();
      },

    convertDate(dateString) {
      // Parse the date string
      const date = new Date(Date.parse(dateString));

      // Get the month and year
      const month = date.getMonth();
      const year = date.getFullYear();

      // Create an array of month names
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      // Get the month name
      const monthName = monthNames[month];
       // Extract the last two digits of the year
      const yearString = year.toString().slice(-2);

      // Return the result in the MMM-YYYY format
      return `${monthName} '${yearString}`;
    },
    renderBarChart() {
      var ctx = document.getElementById("chart-bars").getContext("2d");
      
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.barChartData.labels.map(this.convertDate),
          datasets: [
            {
              label: "kWh",
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
              backgroundColor: "#fff",
              data: this.barChartData.import.map((num, index) => num - this.barChartData.export[index]),
              maxBarThickness: 10,
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 500,
                beginAtZero: true,
                padding: 15,
                font: {
                  size: 14,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                display: true,
              },
            },
          },
        },
      });
    }
  },

  mounted() {
    this.getChartData();

    // this.renderBarChart();
  },
  watch: {
    data() {
      this._chart.destroy;
      this.renderBarChart();
    }
  }

  
};
</script>
