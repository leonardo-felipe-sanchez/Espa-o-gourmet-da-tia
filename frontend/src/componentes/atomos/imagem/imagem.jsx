export const Imagem = ({ caminho, classe, como = "img" }) => {
  if (como === "svg") {
    return (
      <div className={classe}>
        {caminho}
      </div>
    );
  }
  return <img src={caminho} className={classe} alt="" />;
};