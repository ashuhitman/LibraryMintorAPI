import { Router } from "express";
import { getUsers } from "../controllers/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
});

// login user

// register user

//logout user

export default router;
