type Ikey = "a" | "b";
export type IBlueprint<T> = {
  [key in keyof T]: {
    value?: T;
    component: () => Component;
    props: () => {
      value?: string | null;
      options?: IOption[];
      [key: string]: any;
    };
    visibility?: () => boolean;
    validation?: () => Object;
    required?: () => boolean;
    width?: () => string;
    utils?: () => {
      errorMessage?: string;
    };
  };
};
export type IOption = { title: string; value: string };
export type IFormData = {
  [key: string]: any;
};
export type IConstraints = {
  [fieldName: string]: any;
};
export type IChildNode = {
  component: Component;
  visibility: boolean;
  width: string;
  props: {
    value?: string | null;
    options?: IOption[];
    error: string[] | boolean;
    [key: string]: any;
  };
};

export type IErrors = {
  [fieldPath: string]: string[];
};

export type LoginPayload = {
  email: string;
  password: string;
  otherName?: string;
};
export type Address = {
  buildingName?: string | null;
  postalCode?: string | null;
  state?: string | null;
  streetName?: string | null;
  streetNumber?: string | null;
  streetType?: string | null;
  suburb?: string | null;
  town?: string | null;
  unitNumber?: string | null;
  country?: string | null;
};
