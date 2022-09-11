import { Express } from "express";
import { areasRoutes } from "./areas/areas.routes";
import { commentsRoutes } from "./comments/comments.routes";
import { meetingsRoutes } from "./meetings/meetings.routes";
import { organizationsRoutes } from "./organizations/organizations.routes";
import { usersRoutes } from "./users/users.routes";
import { loginRoutes } from "./login/login.routes";
import { administrationRoutes } from "./administration/administration.routes";
import postRoutes from "./posts/post.routes";
import reactionRoutes from "./reactions/reactions.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", usersRoutes());
  app.use("/organizations", organizationsRoutes());
  app.use("/meetings", meetingsRoutes());
  app.use("/comments", commentsRoutes());
  app.use("/areas", areasRoutes());
  app.use("/login", loginRoutes());
  app.use("/administration", administrationRoutes())
  app.use("/posts", postRoutes())
  app.use("/reactions", reactionRoutes())
};
