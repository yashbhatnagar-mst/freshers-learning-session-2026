import User from "../models/user.model.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import apiResponse from "../utils/apiResponse.js";

import { registerUser, loginUser } from "../services/auth.service.js";
import apiError from "../utils/ApiError.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    return res.status(200).json(
      apiResponse(201, "User registered successfully", {
        id: user._id,
        email: user.email,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const accessToken = generateAccessToken(user._id);

    // later
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;

    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    //
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json(
      apiResponse(200, "Access Token Generated Successfully", {
        accessToken,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json(apiError(401, "Unauthorized"));
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json(apiError(401, "Unauthorized"));
    }

    const accessToken = generateAccessToken(user._id);

    res.status(200).json(
      apiResponse(200, "Access Token fetched successfully", {
        accessToken: accessToken,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      const user = await User.findOne({
        refreshToken,
      });

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("refreshToken");

    res.status(200).json(apiResponse(200, "Logout Successfully"));
  } catch (error) {
    next(error);
  }
};
