import { Router } from "express";
import { getLibraryInfo, setLibrayInfo } from "../controllers/libraryInfo.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const info = await getLibraryInfo();
    if (info.length > 0) {
      return res.status(200).send({ info: info[0] });
    }
    return res.status(404).send({ message: "Library info not found" });
  } catch (error) {}
});
router.post("/", async (req, res) => {
  //   return res.send(req.body);
  try {
    const { result, message } = await setLibrayInfo(req.body);
    console.log(result, message);
    if (result.affectedRows > 0) {
      res.status(201).send({
        info: req.body,
        message,
      });
    } else {
      res.status(404).send({ message: "Library info not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
