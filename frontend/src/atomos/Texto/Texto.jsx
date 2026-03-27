export const Texto = (function ({ como = "p", referencia, children }) {

      const atributos = como === "a" ? { href: referencia } : {};

    const Tag = como;
    return (<Tag {...atributos}>
        {children}
    </Tag>);
});