interface IAuthConfig {
  driver: "jwt";
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default {
  driver: process.env.AUTH_PROVIDER,
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
    expiresIn: "id",
  },
} as IAuthConfig;
