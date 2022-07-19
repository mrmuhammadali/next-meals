import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_KEY;

export const sign = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });

export const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decode) => {
      if (err) return reject(err);
      return resolve(decode);
    });
  });
