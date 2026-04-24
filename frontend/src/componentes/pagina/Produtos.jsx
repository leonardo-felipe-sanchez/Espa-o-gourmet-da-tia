import { useEffect, useState } from "react";
import { Link, useParams, Outlet } from "react-router";

export const Produtos = () => {
  const [resultado, setResultado] = useState(null);
  
  // O useParams deve ficar aqui sempre
  const { produtoId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tarefas');
        const result = await response.json();
        setResultado(result);
      } catch (error) {
        console.error("Erro ao pegar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-5">
      {produtoId ? (
        // Se existir ID na URL, mostra apenas o Outlet (o componente filho)
        <Outlet />
      ) : (
        // Se NÃO existir ID, mostra a lista normalmente
        <>
          <h1 className="text-2xl uppercase">{resultado?.msg}</h1>
          {resultado?.tarefas.map((tarefa) => (
            <div key={tarefa.id} className="flex flex-col items-center">
              <p className="text-lg">{tarefa.name}</p>
              <button className=" text-white px-4 py-2 rounded">
                <Link to={`/produtos/${tarefa.id}`}>Editar</Link>
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};