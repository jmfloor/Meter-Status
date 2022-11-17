<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col-lg-6">
          <ul
            class="nav nav-footer justify-content-center justify-content-lg-end"
          >
            <li class="nav-item">
              <a
                href="https://www.enova.africa"
                class="nav-link text-muted"
                target="_blank"
                >Enova.africa</a
              >
            </li>
            
          </ul>
        </div>
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div
            class="text-sm text-center copyright text-muted"
            :class="$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            ©
            {{ new Date().getFullYear() }}, built by            
            <a
              href="https://www.flowcraft.cloud"
              class="font-weight-bold"
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
