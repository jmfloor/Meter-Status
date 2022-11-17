<template>
  <!-- <navbar btn-background="bg-gradient-primary" /> -->
  <div
    class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg"
    :style="{
      backgroundImage:   `url(${bgImg})`,
    }"
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-auto">
          <img
              src="../assets/img/logo_rayz_light.png"
              alt="rayz-logo"
              class=""
            />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-1 mb-2 text-white">Welcome!</h1>
          <p class="text-white text-lead">
            Enter your customer code to view your consumption metrics.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
          <div class="card z-index-0">
            <div class="pt-4 text-center card-header">
              <h5>Customer Code</h5>
            </div>
            
            <div class="card-body">
              <form role="form" method="dialog" @submit="viewMeter">
                <div class="mb-3">
                  <vsud-input type="text" name="code" placeholder="Customer Code" aria-label="Name" value="" />
                  <p class="text-danger text-sm">{{ validationErrorMessage }}</p>
                </div>
                <div class="text-center">
                  <vsud-button color="dark" full-width variant="gradient" class="my-4 mb-2">View</vsud-button>
                </div>
                <p class="text-sm mt-3 mb-0">
                  What is my code?
                  <a
                    href="javascript:;"
                    class="text-dark font-weight-bolder"
                  >Contact Us</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- <app-footer /> -->
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudButton from "@/components/VsudButton.vue";
import bgImg from "@/assets/img/galaxy_bg.png"
import axios from "axios";

export default {
  name: "Home",
  components: {
    Navbar,
    AppFooter,
    VsudInput,
    VsudButton,
  },
  
  data() {
    return {
      bgImg,
      textInput: '',
      validationErrorMessage: ''
    }
  },
  // created() {
  //   this.$store.state.hideConfigButton = true;
  //   this.$store.state.showNavbar = false;
  //   this.$store.state.showSidenav = false;
  //   this.$store.state.showFooter = false;
  // },
  // beforeUnmount() {
  //   this.$store.state.hideConfigButton = false;
  //   this.$store.state.showNavbar = true;
  //   this.$store.state.showSidenav = true;
  //   this.$store.state.showFooter = true;
  // },
  methods: {
    
    async viewMeter(e) {
      const form = e.target;
      const formData = new FormData(form);
      let customerCode = formData.get('code');

      const config = {
          method: 'get',
          url: `https://s0qtw4yb57.execute-api.af-south-1.amazonaws.com/v1/validate?customercode=${customerCode}`,
          headers: {
              'Accept': '*',
              'Access-Control-Allow-Origin': '*',
              'authorizationToken': '584abbe0928f4ba684e52118fdebc41d'
            }
        }

      try {
        const response = await axios(config);
        // JSON responses are automatically parsed.
      } catch (error) {
        console.log(error.response.data)
        this.validationErrorMessage = error.response.data.title
        return
      } 
      this.validationErrorMessage = ''
      window.location.href = '#/meter/' + customerCode;
     
    }
  },
  
};
</script>
