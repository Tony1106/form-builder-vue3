import VInput from "../../components/VInput.vue";
import { Address, IBlueprint } from "../../type";

export const doc2: IBlueprint<Address> = {
  buildingName: {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Building Name",
      };
    },
    required() {
      return true;
    },
  },
  country: {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Country",
      };
    },
    visibility() {
      return true;
    },
    validation() {
      return {
        length: { is: 3 },
      };
    },
    required() {
      return true;
    },
    width() {
      return "100%";
    },
  },
  postalCode: {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Postal Code",
      };
    },
    visibility() {
      return false;
    },
    validation() {
      return true;
    },
  },
  state: {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "State",
      };
    },
    visibility() {
      return false;
    },
    validation() {
      return true;
    },
  },
  streetName: {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Street Name",
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
