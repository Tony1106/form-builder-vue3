<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="wrapper">
    <div class="title">Login Form</div>
    <v-layout-form
      :formData="loginContext.formData"
      :error="loginContext.error"
    >
      <form-builder
        class="input-wrapper"
        ref="formDoc1"
        :value="loginContext.formData"
        @input="(e) => loginContext.update(e)"
        @error="loginContext.handleError"
        :blueprint="loginContext.blueprint"
      />
    </v-layout-form>

    <v-button @click="submitDoc1">Submit</v-button>
  </div>
  <div class="wrapper">
    <div class="title">Address</div>
    <v-layout-form
      :formData="addressContext.formData"
      :error="addressContext.error"
    >
      <form-builder
        class="input-wrapper"
        ref="formDoc2"
        :value="addressContext.formData"
        @input="(e) => addressContext.update(e)"
        @error="addressContext.handleError"
        :blueprint="addressContext.blueprint"
      />
      <v-button @click="submitDoc2">Submit</v-button>
    </v-layout-form>
  </div>
  <div class="wrapper">
    <div class="title">Document Selector</div>
    <v-layout-form
      :formData="documentContext.formData"
      :error="documentContext.error"
    >
      <form-builder
        class="input-wrapper"
        ref="formDoc3"
        :value="documentContext.formData"
        @input="(e) => documentContext.update(e)"
        @error="documentContext.handleError"
        :blueprint="documentContext.blueprint"
      />
      <form-builder
        class="input-wrapper"
        ref="formDoc3"
        :value="documentContext.formData"
        @input="(e) => documentContext.update(e)"
        @error="documentContext.handleError"
        :blueprint="documentContext.documentBlueprint"
      />
      <v-button @click="submitDoc3">Submit</v-button>
    </v-layout-form>
  </div>
  <div class="wrapper">
    <div class="title">Nested Data Object</div>
    <v-layout-form
      :formData="nestedContext.formData"
      :error="nestedContext.error"
    >
      <form-builder
        class="input-wrapper"
        ref="formDoc3"
        :value="nestedContext.formData"
        @input="(e) => nestedContext.update(e)"
        @error="nestedContext.handleError"
        :blueprint="nestedContext.blueprint"
      />
      <v-button @click="submitDoc3">Submit</v-button>
    </v-layout-form>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import FormBuilder from "./components/FormBuilder.vue";
import { IErrors, Address, IBlueprint } from "./type";
import { doc1 } from "./formBuilder/blueprint/doc1";
import { doc2 } from "./formBuilder/blueprint/doc2";
import {
  doc3,
  medicare,
  driverLicence,
  passport,
  IDataPayload,
  BaseDocument,
  Passport,
  DriverLicence,
  Medicare,
} from "./formBuilder/blueprint/doc3";
import { doc4 } from "./formBuilder/blueprint/doc4";

import VButton from "./components/VButton.vue";
import VLayoutForm from "./components/VLayoutForm.vue";
import { Component, ref, onMounted, reactive } from "vue";
import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
@Options({
  components: {
    FormBuilder,
    VButton,
    VLayoutForm,
  },
  data() {
    return {
      formDoc1: null,
    };
  },
})
export default class App extends Vue {
  click = false;
  ref!: any;
  errors: IErrors = {};

  $refs!: {
    formDoc1: FormBuilder | undefined;
    formDoc2: FormBuilder | undefined;
    formDoc3: FormBuilder | undefined;
  };
  loginContext = setup(() => {
    const formData = ref({ email: "", password: "" });
    const blueprint = doc1;
    const error = ref({});
    const update = (value: any) => {
      formData.value = value;
    };
    const handleError = (err: any) => {
      error.value = err;
    };
    return { formData, update, blueprint, handleError, error };
  });
  addressContext = setup(() => {
    let formData = ref({
      buildingName: null,
      postalCode: null,
      state: null,
      streetName: null,
      streetNumber: null,
      streetType: null,
      suburb: null,
      town: null,
      unitNumber: null,
      country: null,
    } as Address);
    const blueprint = doc2;
    const error = ref({});
    const handleError = (err: any) => {
      error.value = err;
    };
    const update = (value: any) => {
      formData.value = value;
    };

    return { formData, update, blueprint, handleError, error };
  });
  documentContext = setup(() => {
    let formData = ref({
      country: "",
      documentType: null,
      documentData: {
        idNumber: "",
        expiry: "",
      },
    } as IDataPayload<BaseDocument>);
    const documentBlueprint = ref<IBlueprint<any> | null>(null);
    const blueprint = doc3;
    const error = ref({});
    const handleError = (err: any) => {
      error.value = err;
    };
    const update = (
      value: IDataPayload<Passport | DriverLicence | Medicare>
    ) => {
      formData.value = value;
      updateDocumentBlueprint(value);
    };
    const updateDocumentBlueprint = (
      payload: IDataPayload<Passport | DriverLicence | Medicare>
    ) => {
      const { country, documentType } = payload;
      switch (documentType) {
        case "PASSPORT":
          documentBlueprint.value = passport;
          break;
        case "MEDICARE":
          documentBlueprint.value = medicare;
          break;
        case "DRIVER_LICENCE":
          documentBlueprint.value = driverLicence;
          break;

        default:
          break;
      }
    };

    return {
      formData,
      update,
      blueprint,
      handleError,
      error,
      documentBlueprint,
    };
  });
  nestedContext = setup(() => {
    let formData = ref({
      form: {
        driverLicence: {
          idNumber: null,
        },
        passport: {
          idNumber: null,
        },
      },
      country: null,
    });
    const blueprint = doc4;
    const error = ref({});
    const handleError = (err: any) => {
      error.value = err;
    };
    const update = (value: any) => {
      formData.value = value;
    };

    return { formData, update, blueprint, handleError, error };
  });
  submitDoc1() {
    this.$refs.formDoc1?.validate();
  }
  submitDoc2() {
    this.$refs.formDoc2?.validate();
  }
  submitDoc3() {
    this.$refs.formDoc3?.validate();
  }
  handleError(errors: IErrors) {
    this.errors = errors;
  }

  handleChangeLogin(value: any) {
    // this.loginForm = value;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 32px;
  margin-left: 32px;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-items: center;
  width: 500px;
}
.title {
  font-size: 18px;
  font-weight: 700;
  text-align: left;
}
</style>
