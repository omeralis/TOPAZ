interface JsonFormValidators {
    min?: number;
    max?: number;
    required?: boolean;
    requiredTrue?: boolean;
    email?: boolean;
    minLength?: boolean;
    maxLength?: boolean;
    pattern?: string;
    nullValidator?: boolean;
  }
  interface JsonFormControlOptions {
    min?: string;
    max?: string;
    step?: string;
    icon?: string;
  }
  export interface JsonFormControls {
    name: string;
    id: string;
    event:Event;
    label: string;
    value: string;
    type: string;
    class:string;
    options?: JsonFormControlOptions;
    required: boolean;
    validators: JsonFormValidators;
  }
  export interface JsonFormData {
    controls: JsonFormControls[];
  }