<template>
  <div>
    <component
      v-for="child in childNodes"
      :is="child.component"
      :key="child.props.name"
      v-bind="child.props"
      :style="{ width: child.width }"
      @input="handleChange"
    >
    </component>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Component, ref } from "vue";
import _ from "lodash";
import validate from "validate.js";
import {
  IBlueprint,
  IChildNode,
  IFormData,
  IErrors,
  IConstraints,
  IEvent,
} from "../type";

@Options({
  name: "formBuilder",
  props: {
    value: Object,
    childs: Array,
    errors: Object,
    validateOnChange: Boolean,
    blueprint: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localErrors: null,
    };
  },
  emits: ["input"],
})
export default class FormBuilder extends Vue {
  value!: IFormData;
  blueprint!: IBlueprint<IFormData>;
  validateOnChange!: boolean;
  errors!: IErrors | null;
  localErrors: IErrors | null = this.errors;
  handleChange(e: IEvent) {
    const fieldPath: string = e.name;
    const value: string = e.value;
    console.log(e);

    this.updateFormData(fieldPath, value);
    if (this.validateOnChange) {
      this.validate();
    }
  }
  validate() {
    const constraints = this.makeFormConstraints();
    const errors = validate(this.value, constraints);
    this.updateError(errors);
  }
  updateError(errors: IErrors) {
    this.localErrors = errors;
    this.$emit("error", errors);
  }

  makeFormConstraints() {
    let validateContraints: IConstraints = {};
    for (const fieldPath in this.blueprint) {
      const visibility = this.blueprint[fieldPath].visibility?.() ?? true;
      const isRequired = this.blueprint[fieldPath].required?.() ?? true;
      const schema = this.blueprint[fieldPath].validation?.() || {};
      if (!visibility) break;
      let constraint: IConstraints = {
        presence: isRequired ? { allowEmpty: false } : false,
        ...schema,
      };

      validateContraints[fieldPath] = constraint;
    }
    return validateContraints;
  }
  get childNodes() {
    let childs: IChildNode[] = [];
    for (const fieldName in this.blueprint) {
      const fieldAttr = this.blueprint[fieldName];
      fieldAttr.value = this.value;
      const component = fieldAttr.component();
      const props = fieldAttr.props();
      const fieldData = this.getFieldDataByPath(fieldName);

      const error = this.getFieldError(fieldName);
      const visibility = fieldAttr.visibility?.() ?? true;
      const width = fieldAttr.width?.() ?? "100%";
      childs.push({
        component,
        visibility,
        width,
        props: {
          ...props,
          value: fieldData,
          name: fieldName,
          error,
        },
      });
      console.log(fieldData, fieldName);
    }

    return childs.filter((child) => !!child.visibility);
  }

  getFieldDataByPath(path: string) {
    return _.get(this.value, path);
  }
  updateFormData(fieldPath: string, value: string) {
    const formData = _.cloneDeep(this.value);
    _.setWith(formData, fieldPath, value);
    this.updateError({});
    this.$emit("input", formData);
  }
  getFieldError(fieldPath: string) {
    if (!this.localErrors) return false;
    return this.localErrors[fieldPath];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
