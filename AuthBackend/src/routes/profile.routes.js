import { Router } from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controller.js";

const router = Router();

router.post("/", protect, createProfile);

router.get("/", protect, getProfile);

router.patch("/", protect, updateProfile);

router.delete("/", protect, deleteProfile);

export default router;