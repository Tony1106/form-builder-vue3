import VInput from "../../components/VInput.vue";
import { Address, IBlueprint, LoginPayload } from "../../type";

export const doc1: IBlueprint<LoginPayload> = {
  email: {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Email",
      };
    },
    validation() {
      return {
        email: true,
      };
    },
    required() {
      return true;
    },
  },
  password: {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Password",
      };
    },
    visibility() {
      return true;
    },
    validation() {
      return {
        length: { minimum: 6, maximum: 100 },
      };
    },
    required() {
      return true;
    },
    width() {
      return "100%";
    },
  },
  otherName: {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Other  name",
      };
    },
    visibility() {
      return false;
    },
    validation() {
      return true;
    },
  },
};
