<template>
  <div class="wrapper">
    <dropdown
      @change="handleInput"
      :value="value"
      :options="options"
      optionValue="code"
      optionLabel="name"
      :placeholder="placeholder"
    ></dropdown>
    <div class="country">Country: {{ value }}</div>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Dropdown from "primevue/dropdown";
import { IErrors } from "../type";
@Options({
  props: {
    value: String,
    options: Array,
    name: String,
    error: Array,
    placeholder: String,
  },
  name: "VDropdown",
  emits: ["input"],
  components: { Dropdown },
})
export default class VDropdown extends Vue {
  value!: string | null;
  name!: string | null;
  error!: IErrors | null;
  handleInput(e: any) {
    this.$emit("input", {
      value: e.value,
      name: this.name,
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.wrapper {
  width: 100%;
}
.wrapper::v-deep .p-dropdown {
  width: 100%;
}
.country {
  font-weight: 600;
}
.error {
  color: red;
}
</style>
