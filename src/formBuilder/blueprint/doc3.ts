import VInput from "../../components/VInput.vue";
import { IBlueprint } from "../../type";
import VDropdown from "../../components/VDropdown.vue";

export interface IDataPayload<T> extends Document {
  documentData: T;
}
export type IDocumentType = "PASSPORT" | "DRIVER_LICENCE" | "MEDICARE" | null;
export type Document = {
  country: string;
  documentType: IDocumentType;
};
export const doc3: IBlueprint<Document> = {
  country: {
    component() {
      return VDropdown;
    },
    props() {
      return {
        label: "Country",
        options: [
          { name: "New Zealand", code: "NZL" },
          { name: "Australia", code: "AUS" },
        ],
        optionLabel: "name",
        placeholder: "Select a City",
      };
    },
    required() {
      return true;
    },
  },
  documentType: {
    component() {
      return VDropdown;
    },
    props() {
      let options = [{ name: "Passport", code: "PASSPORT" }];
      if (this.value?.country === "AUS") options = [...options, { name: "Medicare", code: "MEDICARE" }];
      if (this.value?.country === "NZL") options = [...options, { name: "Driver Licence", code: "DRIVER_LICENCE" }];
      return {
        label: "Document Type",
        options,
        optionLabel: "name",
        placeholder: "Select a document",
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
};

export interface BaseDocument {
  idNumber: string;
  expiry: string;
}

export interface Passport extends BaseDocument {}
export const passport: IBlueprint<IDataPayload<Passport>> = {
  "documentData.idNumber": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Id Number",
        placeholder: "Id number",
      };
    },
    required() {
      return true;
    },
  },
  "documentData.expiry": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Expiry date",
        placeholder: "Type in expiry date",
      };
    },

    required() {
      return false;
    },
  },
};
export interface DriverLicence extends BaseDocument {}
export const driverLicence: IBlueprint<DriverLicence> = {
  "documentData.idNumber": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Id Number",
        placeholder: "Id number",
      };
    },
    required() {
      return true;
    },
  },
  "documentData.expiry": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Expiry date",
        placeholder: "Type in expiry date",
      };
    },

    required() {
      return false;
    },
  },
};
export interface Medicare extends BaseDocument {
  nameOnCard: string;
  color: string;
  reference: string;
}
export const medicare: IBlueprint<Medicare> = {
  "documentData.idNumber": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Id Number",
        placeholder: "Id number",
      };
    },
    required() {
      return true;
    },
  },
  "documentData.expiry": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Expiry Date",
        placeholder: "Expiry Date",
      };
    },
    required() {
      return true;
    },
  },
  "documentData.nameOnCard": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Name On Card",
        placeholder: "Name On Card",
      };
    },

    required() {
      return true;
    },
  },
  "documentData.color": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Color",
        placeholder: "Color",
      };
    },

    required() {
      return true;
    },
  },
  "documentData.reference": {
    component() {
      return VInput;
    },
    props() {
      return {
        label: "Reference Number",
        placeholder: "Reference Number",
      };
    },
    validation() {
      return {
        length: { is: 1 },
      };
    },
    required() {
      return true;
    },
  },
};
