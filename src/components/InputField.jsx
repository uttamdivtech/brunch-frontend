export const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  onBlur,
  onError,
}) => (
  <div className="text-left w-full">
    <label htmlFor={name} className="block text-sm font-medium text-white">
      {label}
    </label>
    <div className="mt-1 flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:outline-indigo-500">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none lg:text-sm"
      />
    </div>
    <p className="text-red-500 text-sm ml-1">{onError}</p>
  </div>
);
