interface SelectOption {
    value: string | number;
    label: string;
}

export interface ISelectProps {
    name: string;
    label: string;
    options: SelectOption[];
    className?: string
    isRequired?: boolean
}