import express from "express";
import { User } from "../../db/schema";
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

export default router;
