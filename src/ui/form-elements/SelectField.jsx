import Select from "react-select";

export default function SelectField({
  label,
  icon,
  hint,
  id,
  isMulti = false,
  placeholder,
  onChange,
  options,
  value,
  isLoading
}) {
  const handleSelectChange = (selectedOption) => {
    if (isMulti) {
      onChange({
        target: {
          name: id,
          value: selectedOption ? selectedOption.map((opt) => opt.value) : []
        }
      });
    } else {
      onChange({
        target: { name: id, value: selectedOption ? selectedOption.value : "" }
      });
    }
  };

  return (
    <div className="input-field">
      <label htmlFor={id}>
        {icon} {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isLoading={isLoading}
        required={true}
        isSearchable={true}
        isMulti={isMulti}
        id={id}
        name={id}
        placeholder={placeholder}
        value={
          isMulti
            ? options?.filter((opt) => value?.includes(opt.value))
            : options?.find((opt) => opt.value === value) || null
        }
        onChange={handleSelectChange}
        options={options}
      />
    </div>
  );
}
