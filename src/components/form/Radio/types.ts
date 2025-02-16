interface RadioOption {
    value: string | number;
    label: string;
}

export interface IRadioProps {
    name: string
    options: RadioOption[]
    defaultValue?: string | number
    isRequired?: boolean
}