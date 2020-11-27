
//Variables entorno
require("dotenv").config


//Manejador Base de Datos
const {Pool} = require('pg');
const pool = new Pool({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB_NAME}`,
    port:process.env.DB_PORT,
  });

//Trae Todo Los Actores
const getActores=async(req,res)=>{
    try {
        const response = await pool.query('SELECT * FROM ACTORES')
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({
            message:`Error ${error}`
        })
    }
}

//Trae un  actor por ID
const getActor=async(req,res)=>{
    const {id}=req.params
    try {
        const response = await pool.query('SELECT * FROM ACTORES where id=$1',[id])
        if (response.rowCount===0) {
           return res.status(404).json({
                message:"No Existe Actor/Actriz con ese ID"
            })
        }
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({
            message:`Error ${error}`
        })
    }
}

//Borra un actor por ID
const deleteActor=async(req,res)=>{
    try {
        const {id}=req.params
        const response = await pool.query("DELETE FROM ACTORES where id=$1",[id])

        if (response.rowCount===0) {
           return res.status(404).json({
                message:"No Existe Actor/Actriz con ese ID"
            })
        }

        res.json({
            message:"Actor/Actriz borrada con Exito"
        })
        
    } catch (error) {
        res.status(500).json({
            message:`Error ${error}`
        })
    }
}

//Actualiza Actor
const updateActor=async(req,res)=>{
    try {
        const {id}=req.params
        const {nombrecompleto, fechadenacimiento, sexo,foto}=req.body
        const response= await pool.query('UPDATE ACTORES set nombrecompleto=$1, fechadenacimiento=$2, sexo=$3,foto=$4 where id=$5',[
            nombrecompleto, 
            fechadenacimiento,
            sexo,
            foto,
            id
        ])

        if (response.rowCount===0) {
            return res.status(404).json({
                 message:"No Existe Actor/Actriz con ese ID"
             })
         }

        res.json({
            message:"Actor/Actriz Actualizado con Exito"
        })
        
    } catch (error) {
        res.status(500).json({
            message:`Error ${error}`
        })
    }
}

//crea Actor
const createActor=async(req,res)=>{
    try {

        
        const {nombrecompleto, fechadenacimiento, sexo,foto}=req.body

        const resultado= await pool.query(`SELECT * FROM actores where nombrecompleto=$1`,[nombrecompleto]);
       
        if (resultado.rowCount>=1) {
           return res.json({
              ok:false,
              message: "Ya Existe Un Actor con Ese Nombre"
              
              })}
              else{
                const response= await pool.query('INSERT INTO actores (nombrecompleto, fechadenacimiento, sexo,foto) VALUES ($1,$2,$3,$4)',[
                    nombrecompleto, 
                    fechadenacimiento,
                    sexo,
                    foto
                ])
        
                res.json({
                    message:"Actor/Actriz Agregado con Exito"
                })
              }

       
        
    } catch (error) {
        res.status(500).json({
            message:`Error ${error}`
        })
    }
}

module.exports={
    getActores,
    getActor,
    createActor,
    deleteActor,
    updateActor
    
}