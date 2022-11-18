<template>
  <footer class="py-5 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between sticky-bottom">
        <div class="mb-0 col-lg-0 mb-lg-0">
          <div class="text-sm text-center copyright text-muted">
            ©
            {{ new Date().getFullYear() }}, built for <a
                href="https://www.enova.africa"
                class="text-muted font-weight-bold"
                target="_blank"
                >Enova</a
              > by
            <a
              href="https://www.flowcraft.cloud"
              class="font-weight-bold text-muted"
              target="_blank"
              >Flowcraft.cloud</a
            >.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
