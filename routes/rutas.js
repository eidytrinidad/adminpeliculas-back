const {Router}= require('express')
const { getPeliculas, createPeliculas,getPeliculaById,deletePelicula, updatePelicula} = require('../controllers/peliculasControllers')
const { getActores, getActor, createActor, deleteActor, updateActor} = require('../controllers/actoresControllers')
const router=Router()

//--Rutas Peliculas

//ruta para todas las peliculas
router.get("/peliculas",getPeliculas)
//ruta para una pelicula
router.get("/peliculas/:id",getPeliculaById)
//ruta para borrar pelicula
router.delete("/peliculas/:id",deletePelicula)
//ruta para actualizar Pelicula
router.put("/peliculas/:id",updatePelicula)
//ruta para crear Pelicula
router.post("/peliculas",createPeliculas)

//---Rutas Actores

//ruta para todas los Actores
router.get('/actores',getActores)
//ruta para un Actor
router.get('/actores/:id',getActor)
//ruta para borrar actor
router.delete('/actores/:id',deleteActor)
//ruta para actualizar actor
router.put("/actores/:id",updateActor)
//ruta para crear actor
router.post('/actores',createActor)


module.exports=router