import VInput from "../../components/VInput.vue";
import VDropdown from "../../components/VDropdown.vue";
import { IBlueprint } from "../../type";

export const doc4: IBlueprint<any> = {
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
        placeholder: "Select a Country",
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
  "form.driverLicence.idNumber": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "IdNumber DriverLicence",
      };
    },
    required() {
      return true;
    },
  },
  "form.passport.idNumber": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "IdNumber Passport - Custom value, always uppercase the value",
        value: this.uppercaseValue,
      };
    },
    required() {
      return true;
    },
  },
};
