export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string
    className?: string
    isRequired?: boolean
}