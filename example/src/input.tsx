type InputProps = {
  value: string;
  label?: string;
  tooltip: string;
  onChange: (value: string) => void;
};

const Input = ({ label, value, onChange, tooltip }: InputProps) => (
  <div>
    {label && <label>{label}</label>}

    <input
      value={value}
      onChange={event => onChange(event.currentTarget.value)}
    />

    <span>{tooltip}</span>
  </div>
);

export { Input };
