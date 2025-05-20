type ButtonProps = {

    classes?: string;
    isSubmit?: boolean;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    children: React.ReactNode;

};

export default function Button({ classes='', isSubmit = false, disabled = false, onClick, children}: ButtonProps) {

    return (

        <button type=
            {isSubmit ? 'submit' : 'button'}
            className={`bg-amber-400 hover:bg-amber-500 text-ellipsis text-black font-bold rounded-xl border-color w-auto px-4 py-1 text-center whitespace-nowrap ${classes}`} 
            disabled={disabled}
            onClick={onClick}
            >
            {children}
        </button>
    )
}