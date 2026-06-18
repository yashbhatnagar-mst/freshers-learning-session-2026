import {
  createProfileService,
  getProfileService,
  updateProfileService,
  deleteProfileService,
} from "../services/profile.service.js";
import apiError from "../utils/apiError.js";

import apiResponse from "../utils/apiResponse.js";

export const createProfile = async (req, res, next) => {
  try {
    const tokenData = req.user;
    const { userId } = tokenData;
    const profile = await createProfileService(userId, req.body);

    res
      .status(201)
      .json(
        apiResponse(201, "Profile Created Successfully", { profile: profile }),
      );
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const profile = await getProfileService(req.user.userId);

    if (!profile) {
      return res
        .status(200)
        .json(
          apiError(404, "Profile not found. Please create a profile first."),
        );
    }

    res
      .status(200)
      .json(
        apiResponse(200, "Profile Fetched Successfully", { profile: profile }),
      );
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profile = await updateProfileService(req.user.userId, req.body);

    if (!profile) {
      return res
        .status(200)
        .json(
          apiError(404, "Profile not Updated. Please create a profile first."),
        );
    }

    res
      .status(200)
      .json(
        apiResponse(200, "Profile updated successfully", { profile: profile }),
      );
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    const profile = await deleteProfileService(req.user.userId);

    res
      .status(200)
      .json(
        apiResponse(200, "Profile Deleted Successfully", { profile: profile }),
      );
  } catch (error) {
    next(error);
  }
};
