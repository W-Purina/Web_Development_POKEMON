import express from "express";
import auth from "../../middleware/auth.js";
import { retrievePokemonForUser, retrievePokemonById } from "../../db/pokemon-dao.js";

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

export default router;
