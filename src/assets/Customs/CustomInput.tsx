
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  className = '',
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label htmlFor={name} className="text-sm font-medium">{label}</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`border border-gray-300 rounded-md px-3 py-2 outline-none  ${className}`}
   
      />
    </div>
  );
};

export default CustomInput;
