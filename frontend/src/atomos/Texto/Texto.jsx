export const Texto = (function ({ como = "p", referencia, children, classe}) {

      const atributos = como === "a" ? { href: referencia } : {};

    const Tag = como;
    return (<Tag {...atributos} className={classe}>
        {children}
    </Tag>);
});