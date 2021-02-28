<template>
  <div class="input">
    <div class="input-label" v-if="label">{{ label }}</div>
    <input
      type="text"
      :value="value"
      :name="name"
      @input="handleInput"
      :class="{ 'input-error_highlight': error }"
    />
    <div class="input-error" v-show="error" v-html="_error"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    value: String,
    label: String,
    name: String,
    error: [Boolean, Array],
  },
  emits: ["input"],
  name: "VInput",
})
export default class VInput extends Vue {
  name!: string;
  label?: string;
  error?: string[] | boolean;
  handleInput(e: any) {
    const value = e.target.value;
    this.$emit("input", { value, name: this.name });
  }
  get _error(): string | null {
    if (!this.error) return null;
    if (typeof this.error === "boolean")
      return "Default message: Please check this field";
    else return this.error?.join("<br>");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
  width: 100%;
  margin-right: 24px;
}
input {
  width: 100%;
}
.input-error_highlight {
  border-color: red;
}
.input-error {
  color: red;
  text-align: left;
}
</style>
