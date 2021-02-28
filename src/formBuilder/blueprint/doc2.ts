import VInput from "../../components/VInput.vue";
import VDropdown from "../../components/VDropdown.vue";
import { Address, IBlueprint } from "../../type";

export const doc2: IBlueprint<Address> = {
  country: {
    component() {
      return VDropdown;
    },
    props() {
      return {
        label: "Country",
        options: [
          { name: "New York", code: "NY" },
          { name: "Rome", code: "RM" },
          { name: "London", code: "LDN" },
          { name: "Istanbul", code: "IST" },
          { name: "Paris", code: "PRS" },
          { name: "Australia", code: "AUS" },
        ],
        optionLabel: "name",
        placeholder: "Select a City",
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
      return true;
    },
    validation() {
      return true;
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
      return this.value?.country === "AUS";
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
    required() {
      return this.value?.country === "AUS";
    },
    visibility() {
      return this.value?.country === "AUS";
    },
    validation() {
      return true;
    },
  },
};
