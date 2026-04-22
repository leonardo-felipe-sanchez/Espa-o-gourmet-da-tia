export const Input = ({ placeholder, name, defaultValue, classe, id, type }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      id={id}
      className={classe}
      required
    />
  );
}