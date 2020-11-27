//Variables entorno
require("dotenv").config()

//Manejador Base de Datos
const {Pool} = require('pg');


//Manejador Base de Datos
const pool = new Pool({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB_NAME}`,
    port:process.env.DB_PORT,
  });


//Trae Todas las peliculas de la base de datos
const getPeliculas = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM peliculas");
    res.json(response.rows);
  } catch (error) {
    res.status(500).json({
      message: `Error ${error}`,
    });
  }
};

//Trae una pelicula por id
const getPeliculaById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("SELECT * FROM peliculas where id=$1", [
      id,
    ]);

    if (response.rowCount === 0) {
      return res.status(404).json({
        message: `No Existe Pelicula con ese ID`,
      });
    }
    res.json(response.rows);
  } catch (error) {
    res.status(500).json({
      message: `Error ${error}`,
    });
  }
};

//Borrar una Pelicula por id
const deletePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("DELETE FROM peliculas where id=$1", [
      id,
    ]);
    if (response.rowCount === 0) {
      return res.status(404).json({
        message: `No Existe Pelicula con ese ID`,
      });
    }
    res.json({
      message: "Pelicula Borrada Con exito",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error ${error}`,
    });
  }
};

//Actualiza una pelicula por id
const updatePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, genero, fechadeestreno, foto } = req.body;
    const response = await pool.query(
      "UPDATE peliculas SET titulo=$1,genero=$2,fechadeestreno=$3,foto=$4 where id=$5",
      [titulo, genero, fechadeestreno, foto, id]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({
        message: `No Existe Pelicula con ese ID`,
      });
    }
    res.json({
      message: "Pelicula Actualizada con exito",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error ${error}`,
    });
  }
};

//Crea una pelicula
const createPeliculas = async (req, res) => {
  try {
    const { titulo, genero, fechadeestreno, foto } = req.body;

    const resultado= await pool.query(`SELECT * FROM peliculas where titulo=$1`,[titulo]);

   
    if (resultado.rowCount>=1) {
      res.json({
        ok:false,
        message: "Ya Existe Una Pelicula con ese titulo"
        
        })
    } else {
      const response = await pool.query(
        "INSERT INTO peliculas (titulo,genero,fechadeestreno,foto) VALUES($1,$2,$3,$4)",
        [titulo, genero, fechadeestreno, foto]
      );
      console.log(response);
      res.json({
        message: "Pelicula Agregada con Exito",
        body: {
          pelicula: { titulo, genero, fechadeestreno, foto },
        },
      });
    }


  } catch (error) {
    res.status(500).json({
      message: `Error ${error}`,
    });
  }
};

module.exports = {
  getPeliculas,
  getPeliculaById,
  deletePelicula,
  updatePelicula,
  createPeliculas,
};
