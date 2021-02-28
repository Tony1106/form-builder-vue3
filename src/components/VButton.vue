<template>
  <button class="v-button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {},
  name: "VButton",
})
export default class VButton extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.v-button {
  padding: 6px 12px;
  background: #7332a8;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  border: none;
}
.v-button::hover .v-button {
  background: #ae73de;
}
</style>
