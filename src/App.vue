<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="wrapper">
    <div class="title">Login Form</div>
    <document-builder
      class="input-wrapper"
      ref="formDoc1"
      :value="loginContext.formData"
      @input="(e) => loginContext.update(e)"
      @error="loginContext.handleError"
      :blueprint="loginContext.blueprint"
    />
    <v-button @click="submitDoc1">Submit</v-button>
  </div>
  <div class="wrapper">
    <div class="title">Address</div>
    <document-builder
      class="input-wrapper"
      ref="formDoc2"
      :value="addressContext.formData"
      @input="(e) => addressContext.update(e)"
      @error="addressContext.handleError"
      :blueprint="addressContext.blueprint"
    />
    <v-button @click="submitDoc2">Submit</v-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import DocumentBuilder from "./components/DocumentBuilder.vue";
import { IErrors, Address } from "./type";
import { doc1 } from "./formBuilder/blueprint/doc1";
import { doc2 } from "./formBuilder/blueprint/doc2";
import VButton from "./components/VButton.vue";
import { Component, ref, onMounted, reactive } from "vue";
import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
@Options({
  components: {
    DocumentBuilder,
    VButton,
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
    formDoc1: DocumentBuilder | undefined;
    formDoc2: DocumentBuilder | undefined;
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
  submitDoc1() {
    this.$refs.formDoc1?.validate();
  }
  submitDoc2() {
    this.$refs.formDoc2?.validate();
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
