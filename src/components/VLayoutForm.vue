<template>
  <div class="form">
    <div class="left">
      <slot />
    </div>
    <div class="right">
      <div class="title">Form Data</div>
      {{ formData }}
      <div class="title">Error</div>
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    formData: Object,
    error: Object,
  },
})
export default class VLayoutForm extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.form {
  display: flex;
  align-items: flex-start;
}
.left {
  margin-right: 50px;
}
</style>
