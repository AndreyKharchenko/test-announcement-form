export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    className?: string
    isRequired?: boolean
}