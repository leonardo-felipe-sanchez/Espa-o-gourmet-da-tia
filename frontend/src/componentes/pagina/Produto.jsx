import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function UmProduto() {
const [resultado, setResultado] = useState(null);
    let { produtoId } = useParams();

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/tarefas/${produtoId}`);
        const result = await response.json();
        setResultado(result);
      } catch (error) {
        console.error("Erro ao pegar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Detalhes do produto:</h2>
      <p>Exibindo informações: <strong>{produtoId}</strong>.</p>
      {resultado && (
        <div>
          <p><strong>Nome:</strong> {resultado.msg}</p>
        </div>
      )}

    </div>
  );
}

export default UmProduto;