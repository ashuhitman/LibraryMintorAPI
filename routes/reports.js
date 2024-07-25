import { Router } from "express";
import {
  checkInOut,
  getReports,
  getReportsByDate,
  getSummary,
} from "../controllers/reports.js";

const router = Router();

router.get("/", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    let reports;
    let today = true;
    if (startDate && endDate) {
      reports = await getReportsByDate(startDate, endDate);
      today = false;
    } else {
      reports = await getReports();
    }
    if (reports.length > 0)
      return res.send({
        reports,
        today,
        message: "reports fetched successfully",
      });
    return res.status(404).send({ message: "No reports found" });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const reports = await checkInOut(req.body.barcode);
    res.status(201).send(reports);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const summary = await getSummary();
    if (summary.length > 0)
      return res.status(200).send({
        summary: summary[0],
        message: "Data fetched successfully",
      });
    return res.status(404).send({ message: "No reports found" });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
