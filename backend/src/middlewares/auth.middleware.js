import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
   try {
      if (!req.auth.userId) {
         return res
            .status(401)
            .json({ message: "Unauthorized - You must be logged in" });
      }

      next();
   } catch (error) {
      console.log("Error in protectRoute", error);
      next(error);
   }
};

export const requireAdmin = async (req, res, next) => {
   try {
      const currentUser = await clerkClient.users.getUser(req.auth.userId);
      const isAdmin =
         process.env.ADMIN_EMAIL ===
         currentUser.primaryEmailAddress.emailAddress;

      if (!isAdmin) {
         return res
            .status(403)
            .json({ message: "Unauthorized - You must be an admin" });
      }

      next();
   } catch (error) {
      console.log("Error in requireAdmin", error);
      next(error);
   }
};
