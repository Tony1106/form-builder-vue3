import { h, createApp, VNode, reactive, Component } from "vue";
import VInput from "../components/VInput.vue";
import _ from "lodash";
import validate from "validate.js";
import Wrapper from "../components/Wrapper.vue";
import { Vue, VueConstructor, VueWithProps } from "vue-class-component";
type IOption = { title: string; value: string };
type IFormData = {
  [key: string]: any;
};
type IConstraints = {
  [fieldName: string]: any;
};
type IChildNode = {
  component: Component;
  visibility: boolean;
  props: {
    value?: string | null;
    options?: IOption[];
    [key: string]: any;
  };
  error: string[] | boolean;
};
export type IBlueprint = {
  [key: string]: {
    component: () => Component;
    props: () => {
      value?: string | null;
      options?: IOption[];
      [key: string]: any;
    };
    visibility?: () => boolean;
    validation?: () => Object;
    required?: () => boolean;
    utils?: () => {
      errorMessage?: string;
    };
  };
};
type IFormBuilderOptions = {
  initFormData?: IFormData;
  validateOnChange?: boolean;
};
export type IErrors = {
  [fieldPath: string]: string[];
};
export default class FormBuilder {
  private blueprint: IBlueprint;
  private formData: IFormData = {};
  private validateContraints: IConstraints = {};
  private errors: IErrors = {};
  private options: IFormBuilderOptions = {
    validateOnChange: false,
  };
  private Component: VNode | null = null;
  private idx: number = 0;
  constructor(blueprint: IBlueprint, options?: IFormBuilderOptions) {
    this.blueprint = blueprint;

    this.initBuilderOption(options);
    this.makeInitialFormData();
    this.makeFormConstraints();
    this.giveContext();
  }
  initBuilderOption(options?: IFormBuilderOptions) {
    if (options) {
      this.options.initFormData = options.initFormData;
      this.options.validateOnChange = options.validateOnChange;
    }
  }
  giveContext() {
    console.log(this.validateContraints, "cos");
  }
  makeInitialFormData() {
    if (this.options.initFormData) return (this.formData = this.options.initFormData);
    for (const fieldName in this.blueprint) {
      this.formData[fieldName] = null;
    }
  }
  makeFormConstraints() {
    for (const fieldPath in this.blueprint) {
      const isRequired = this.blueprint[fieldPath].required?.() ?? true;
      const schema = this.blueprint[fieldPath].validation?.() || {};
      let constraint: IConstraints = {
        presence: isRequired,
        ...schema,
      };
      this.validateContraints[fieldPath] = constraint;
    }
  }
  getFieldDataByPath(path: string) {
    return _.get(this.formData, path);
  }
  updateFormData(fieldPath: string, value: string) {
    return _.setWith(this.formData, fieldPath, value);
  }
  makeComponent(arg?: any) {
    console.log(arg, "arg");
    const state = reactive({
      index: 0,
    });

    let childs: IChildNode[] = [];
    let domNode = [];
    const WrapperComponent = this.makeWrapperComponent();
    for (const fieldName in this.blueprint) {
      const fieldAttr = this.blueprint[fieldName];
      const component = fieldAttr.component();
      const props = fieldAttr.props();
      const fieldData = this.getFieldDataByPath(fieldName);
      const error = this.getFieldError(fieldName);
      const visibility = fieldAttr.visibility?.() ?? true;
      domNode.push(h(component));
      childs.push({
        component,
        visibility,
        props: {
          value: fieldData,
          name: fieldName,
        },
        error,
      });
    }

    this.Component = h(
      WrapperComponent,
      {
        class: "input-group",
        handleInput: this.handleInputGroupChange.bind(this),
        childs,
        value: this.formData,
      },
      domNode
    );
    return this.Component;
  }
  makeWrapperComponent(): (props: any, context: any) => VNode {
    return (props: any, context: any) => {
      console.log(props, "props");

      return h(`div`, context.attrs, context.slots);
    };
  }
  getFieldError(fieldPath: string) {
    return this.errors[fieldPath];
  }
  handleInputGroupChange(e: any) {
    const fieldPath: string = e.target.name;
    const value: string = e.target.value;

    this.updateFormData(fieldPath, value);
    console.log(this.formData, " this");
    if (this.options.validateOnChange) {
      this.validate();
    }
  }
  validate() {
    const errors = validate(this.formData, this.validateContraints);
    this.errors = errors;
    this.idx++;
    this.makeComponent();
  }
}
