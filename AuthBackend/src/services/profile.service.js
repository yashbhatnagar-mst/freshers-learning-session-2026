import Profile from "../models/profile.model.js";

export const createProfileService = async (userId, payload) => {
  const existingProfile = await Profile.findOne({
    user: userId,
  });

  if (existingProfile) {
    throw new Error("Profile already exists");
  }

  const profile = await Profile.create({
    user: userId,
    name: payload.name,
    avatar: payload.avatar || "",
    bio: payload.bio || "",
  });

  return profile;
};

export const getProfileService = async (userId) => {
  return await Profile.findOne({
    user: userId,
  }).populate("user", "email createdAt");
};

export const updateProfileService = async (userId, payload) => {
  return await Profile.findOneAndUpdate(
    {
      user: userId,
    },
    {
      $set: payload,
    },
    {
      new: true,
      runValidators: true,
    },
  ).populate("user", "email createdAt");
};

export const deleteProfileService = async (userId) => {
  const profile = await Profile.findOneAndDelete({
    user: userId,
  });

  return profile;
};
