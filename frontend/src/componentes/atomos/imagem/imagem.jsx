export const Imagem = ({ caminho, classe, como = "img" }) => {
  if (como === "svg") {
    return (
      <div className={classe}>
        {caminho}
      </div>
    );
  }
  return <img loading="lazy" src={caminho} className={classe} alt=""/>;
};