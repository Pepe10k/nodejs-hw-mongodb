import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashedPassword });
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await Session.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return { accessToken, refreshToken };
};

const refreshSession = async (oldRefreshToken) => {
  const session = await Session.findOne({ refreshToken: oldRefreshToken });
  if (!session || new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(403, 'Invalid or expired refresh token');
  }

  await Session.deleteOne({ _id: session._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  await Session.create({
    userId: session.userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return { accessToken, refreshToken };
};

const logoutUser = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });
  if (!session) {
    throw createHttpError(403, 'Invalid refresh token');
  }

  await Session.deleteOne({ _id: session._id });
};

export default {
  findUserByEmail,
  createUser,
  loginUser,
  refreshSession,
  logoutUser,
};