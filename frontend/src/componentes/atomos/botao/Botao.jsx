import {Form} from "react-router";

export const Botao = ({ texto, classe, forme }) => {

if (forme) {
    return (
    <Form method="post" action={forme}>
      <button className={classe} type="submit" >
      {texto}
    </button>
    </Form>
  );
} else{
    return (
    <button className={classe}>
      {texto}
    </button>
  );
}

};