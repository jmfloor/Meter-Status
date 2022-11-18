<template>
  <!-- <div class="pt-5 m-3 align-items-start min-vh-5 pb-11 border-radius-lg" 
    style='background-image: url("../src/assets/img/galaxy_bg.png"); height:35px'> -->
  <div>
  <div class="container my-5 mx-auto justify-content-center">
    <div class="row mb-3 justify-content-center">
      <div class="col-12 col-md-8">
        <SiteInfoCard
          :site="meterData.data.site"
          :location="meterData.data.location"
          :description="meterData.data.description"
          classIcon="fa fa-building"
        ></SiteInfoCard>
      </div>
      
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-sm-6 col-md-4 col-xl-3">
        <card
          title="this month"
          :value="meterData.data.consumption.month.total"
          percentage="kWh"
          percentageColor="text-dark"
          icon-class="fa fa-tachometer"
          icon-background="bg-gradient-warning"
          direction-reverse
          ></card>
      </div>
      <div class="col-12 col-sm-6 col-md-4 col-xl-3">
        <card
          title="previous month"
          :value="meterData.data.consumption.monthPrev.total"
          percentage="kWh"
          percentageColor="text-dark"
          icon-class="fa fa-tachometer"
          icon-background="bg-gradient-warning"
          direction-reverse
          ></card>
      </div>
      <div class="col-12 col-sm-6 col-md-4 col-xl-3">
        <card
          title="this week"
          :value="meterData.data.consumption.week"
          percentage="kWh"
          percentageColor="text-dark"
          icon-class="fa fa-tachometer"
          icon-background="bg-gradient-warning"
          direction-reverse
          ></card>
      </div>
    </div>
    <!-- chart -->
    <!-- <div class="mt-4 row">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <monthly-consumption-chart
              :customerCode="meterId"
            />
          </div>
        </div>
      </div>
    </div> -->
    

    
    <!-- <div class="row my-4">
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <projects-card />
      </div>
      <div class="col-lg-4 col-md-6">
        <Orders-card />
      </div>
    </div> -->
    <div class="row justify-content-centre">
      <!-- <div class="col col-lg-2">
      </div> -->
      <div class="text-center">
        <a
          href="@"
          class="text-muted text-center"
          ><b>Return</b>
        </a>
      </div>
      <!-- <div class="col col-lg-2">
      </div> -->
    </div>
  </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import ActiveUsersChart from "@/examples/Charts/ActiveUsersChart.vue";
import MonthlyConsumptionChart from "@/components/charts/MonthlyConsumptionChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import DefaultInfoCardVue from "@/examples/Cards/DefaultInfoCard.vue";
import SiteInfoCard from "@/components/SiteInfoCard.vue";
import axios from "axios";
import { reactive, computed, ref } from "vue";
// Vue.prototype.$http = axios;

export default {
  name: "DashboardDefault",
  components: {
    Card,
    DefaultInfoCardVue,
    ActiveUsersChart,
    MonthlyConsumptionChart,
    GradientLineChart,
    SiteInfoCard
  },

  computed:{
    meterId(){
      return this.$route.params.id
    },
    
  },
    
  data() {
    // const mid = reactive({id: this.$route.params.id})
    
    const mid = reactive({id: this.$route.params.id})
    
    let meterId = null
    return {
     
      meterData: {
        data: {
          site: '',
          location:'',
          description: '',
          consumption: {
            billMonth:{
              total:'0'
            },
            billMonthPrev:{
              total:'0'
            },
            month:{
              total:'0'
            },
            monthPrev:{
              total:'0'
            },
            week: '0'
          }
        }
      }
    };
  },

  methods: {
    
    async getData() {
      try {
        const config = {
          method: 'get',
          // url: `https://xtk1mhr7f2.execute-api.af-south-1.amazonaws.com/dev/meters/${this.$route.params.id}`,
          url: `https://s0qtw4yb57.execute-api.af-south-1.amazonaws.com/v1/meters?customercode=${this.$route.params.id}`,
          headers: {
              'Accept': '*',
              'Access-Control-Allow-Origin': '*',
              'authorizationToken': '584abbe0928f4ba684e52118fdebc41d'
            }
        }
        const response = await axios(config);
        // JSON responses are automatically parsed.
        this.meterData = response;
        // console.log(response.data)
      } catch (error) {
        console.log(error);
        window.location.href = '/';
      }
      console.log(this.meterData.data)
    },
  },

  mounted() {
    this.getData();
    document.title = 'Customer Meter '+ this.$route.params.id;
  },

  async created(){
    this.$watch(
      () => this.$route.params,
      ()=>{
        this.meterId = this.$route.params.id
      }
    )
  }
};
</script>
