import express from "express";
import auth from "../../middleware/auth.js";
import { setFavourite,retrievePokemonForUser, retrievePokemonById } from "../../db/pokemon-dao.js";

const router = express.Router();

// Get all pokemon for the authenticated user
router.get("/", auth, async (req, res) => {
  const pokemons = await retrievePokemonForUser(req.user._id);
  return res.json(pokemons);
});

// Get a single pokemon owned by the authenticated user
router.get("/:id", auth, async (req, res) => {
  const pokemon = await retrievePokemonById(req.params.id);
  if (!pokemon) return res.sendStatus(404);
  if (!pokemon.owner.equals(req.user._id)) return res.sendStatus(404);
  return res.json(pokemon);
});

//处理添加favorite Pokeman
router.patch("/:id/setFavourite", auth, async (req, res) => {
  const pokemon = await retrievePokemonById(req.params.id);
  if (!pokemon) return res.sendStatus(404);
  if (!pokemon.owner.equals(req.user._id)) return res.sendStatus(404);

  const isFavourite = req.body.isFavourite;

  if (typeof isFavourite !== 'boolean') return res.sendStatus(422);
  
  try {
    await setFavourite(req.user._id, pokemon._id, isFavourite);
    return res.status(204).send({ isFavourite: isFavourite });
  } catch (error) {
    if(error.message === 'Not_Found'){
      return res.sendStatus(404)
    }else{
      console.error(error);
      return res.sendStatus(500)
    }
  }
})

export default router;
