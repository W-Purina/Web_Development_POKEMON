import express from "express";
import { User } from "../../db/schema";
import { Pokemon } from "../../db/schema";
import bcrypt from "bcrypt";
import { createStartingPokemonForUser, retrievePokemonForUser } from "../../db/pokemon-dao.js";
import { createToken } from "../../middleware/auth.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

// Create new account
router.post("/create", async (req, res) => {
  // Must send username and password
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(422);

  // Cannot have duplicate usernames
  let user = await User.findOne({ username });
  if (user) return res.sendStatus(409);

  // Create new user and some Pokemon for that user
  user = await User.create({
    username,
    passHash: await bcrypt.hash(password, 10),
  });
  await createStartingPokemonForUser(user._id);

  // Create and sign a JWT token
  const token = createToken(user._id.toString(), username);

  // Return success with a location pointing to the new user, and the token in the response
  return res.status(201).location(`/api/users/${user._id}`).json({ token });
});

// Login to existing account
router.post("/login", async (req, res) => {
  // Must send username and password
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(422);

  // User must exist
  let user = await User.findOne({ username });
  if (!user) return res.sendStatus(401);

  // Password must be correct
  const isPasswordOk = await bcrypt.compare(password, user.passHash);
  if (!isPasswordOk) return res.sendStatus(401);

  // Create and sign a JWT token
  const token = createToken(user._id.toString(), username);

  // Return success with the token in the response
  return res.status(200).json({ token });
});

// GET /api/users/:id/pokemon
router.get('/:id/pokemon', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();

    let query = { owner: user._id };

    // 如果用户在查看他人的宝可梦，或者请求参数中有 favouritesOnly=true，则只返回收藏的宝可梦
    if (req.user.id !== user._id.toString() || req.query.favouritesOnly === 'true') {
      query.isFavourite = true;
    }

    const pokemons = await Pokemon.find(query).populate('species');
    res.status(200).json(pokemons);
  } catch (err) {
    console.error(err)
    res.status(500).send();
  }
});

// GET /api/users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('username -_id');
    res.json(users);
  } catch (err) {
    res.status(500).send();
  }  
}); export default router;
