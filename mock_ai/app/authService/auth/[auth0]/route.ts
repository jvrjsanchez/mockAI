// /service/auth/[auth].ts
import {
  handleAuth,
  handleLogin,
  handleLogout,
  handleCallback,
  handleProfile,
} from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res);
  },
  async logout(req, res) {
    try {
      await handleLogout(req, res, {
        returnTo: "/",
      });
    } catch (error) {
      console.log(error);
      res.status(error.status || 400).end(error.message);
    }
  },

  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        afterCallback: async (req, res, session, state) => {
          const { profile } = session;
          session.user = {
            id: profile.sub,
            email: profile.email,
            name: profile.name,
            picture: profile.picture,
          };

          return session;
        },
      });
    } catch (error) {
      console.log(error);
      res.status(error.status || 400).end(error.message);
    }
  },

  async profile(req, res) {
    try {
      await handleProfile(req, res, {
        refetch: true, // Optional: refetch user profile from Auth0
        afterRefetch: async (req, res, session) => {
          // Ensure the function returns a Session object
          return session;
        },
      });
    } catch (error) {
      console.log(error);
      res.status(error.status || 400).end(error.message);
    }
  },
});
