const rotear = require("express").Router(); 

const { Dados } = require("../Controlador/Controlador");

rotear.post("/contact", Dados);

const tarefas = [
    { id: 1, name: "Estudar Express" },
    { id: 2, name: "Fazer exercícios de Node.js" },
    { id: 3, name: "Criar uma API RESTful" }
];

rotear.get("/tarefas", async (req, res) => {
    try {
        res.status(200).json({ msg: "retornar todas as tarefas", tarefas });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
})

rotear.post("/tarefas", async (req, res) => {
try {
    const { name } = req.body
    tarefas.push({ id: tarefas.length + 1, name });
      res.status(201).send({msg:`cria uma tarefa: ${tarefas[tarefas.length - 1].name}!`})
    
} catch (error) {
  res.status(500).json({ erro: error.message });  
}
})

rotear.get('/tarefas/:id', async (req, res) =>{
try {
const { id } = req.params;

 const tarefa = tarefas.find(t => t.id === parseInt(id));

res.send(tarefa ? { msg: `retorna uma tarefa: ${tarefa.name}` } : { msg: "Tarefa não encontrada" });
} catch (error) {
 res.status(500).json({ erro: error.message });   
}})

rotear.patch("/tarefas/:id", async (req, res) =>{
try {
const id = req.params.id;
tarefa = tarefas.find(t => t.id === parseInt(id));
const tarefaAntigo = { ...tarefa };
if (!tarefa) {
return res.status(404).json({ msg: "Tarefa não encontrada" });
} else {
const { name } = req.body;
tarefa.name = name || tarefa.name;
}
res.status(200).send({msg: `modifica uma tarefa antes: ${tarefaAntigo.name} , depois: ${tarefa.name}!`})
} catch (error) {
res.status(500).json({ erro: error.message });
}})

rotear.delete("/tarefas/:id", async (req, res) =>{
try {
        const id = req.params.id;
        const tarefa = tarefas.find(t => t.id === parseInt(id));
        if (!tarefa) {
            return res.status(404).json({ msg: "Tarefa não encontrada" });
        }
        tarefas.splice(tarefas.indexOf(tarefa), 1);
        res.status(204).send({msg: `deletas uma tarefa: ${tarefa.name}`})
    
} catch (error) {
    res.status(500).json({ erro: error.message });

}})

module.exports = rotear;