<template>
  <div class="card">
    <div class="p-3 mx-4 text-center card-header">
      <div
        :class="iconBg"
        class="icon icon-shape icon-lg bg-gradient-success shadow text-center border-radius-lg"
      >
        <i class="opacity-10" :class="classIcon" aria-hidden="true"></i>
      </div>
    </div>
    <div class="p-3 pt-0 text-center card-body">
      <h6 class="mb-0 text-center">{{ site }}</h6>
      <span class="text-xs">{{ location }}</span>
      <hr class="my-3 horizontal dark" />
      <h5 class="mb-0">{{ description }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiteInfoCard",
  props: {
    iconBg: {
      type: String,
      default: "bg-white",
    },
    classIcon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    },
    site: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    
  },
};
</script>