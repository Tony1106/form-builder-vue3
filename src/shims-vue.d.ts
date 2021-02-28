/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare global {
   type IBlueprint = {
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
      width?: () => string;
      utils?: () => {
        errorMessage?: string;
      };
    };
  };
}