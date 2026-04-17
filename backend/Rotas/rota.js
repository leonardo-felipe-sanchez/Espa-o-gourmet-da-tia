const rotear = require("express").Router(); 

const { Dados } = require("../Controlador/Controlador");

rotear.post("/contact", Dados);

module.exports = rotear;