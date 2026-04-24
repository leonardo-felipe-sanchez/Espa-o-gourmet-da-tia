import { Link } from "react-router";

export const Texto = function ({ como = "p", referencia, children, classe }) {
  const atributos = como === "a" ? { href: referencia } : {};

  const Tag = como;

  return (
    
    como != "a" ? 
        (<Tag {...atributos} className={classe}>
      {children}
    </Tag>) :
    (<Link to={referencia} className={classe}>
      {children}
    </Link>)
    
  );
};
