import { Link } from "react-router";
import { HashLink } from 'react-router-hash-link';

export const Texto = function ({ como = "p", referencia, children, classe, identidade=""}) {
  const Tag = como;

  if (como !== "a") {
    return <Tag className={classe}>{children}</Tag>;
  }

  if (identidade !== ""){
    return (
<HashLink smooth to={referencia+identidade}>
 {children}
</HashLink>
    )
  }

  return (
    <Link to={{pathname: referencia, hash: identidade}} className={classe} preventScrollReset>
      {children}
    </Link>
  );
};