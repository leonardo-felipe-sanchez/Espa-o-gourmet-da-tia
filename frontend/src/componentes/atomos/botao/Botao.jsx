export const Botao = ({ texto, classe }) => {
  return (
    <button className={classe}>
      {texto}
    </button>
  );
};