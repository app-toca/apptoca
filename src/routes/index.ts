import { Express } from "express";
import { areasRoutes } from "./areas/areas.routes";
import { commentsRoutes } from "./comments/comments.routes";
import { meetingsRoutes } from "./meetings/meetings.routes";
import { organizationsRoutes } from "./organizations/organizations.routes";
import { usersRoutes } from "./users/users.routes";
import { loginRoutes } from "./login/login.routes";
import { administrationRoutes } from "./administration/administration.routes";
import postRoutes from "./posts/post.routes";
import uploadRoutes from "./uploads/upload.routes";
import reactionRoutes from "./reactions/reactions.routes";
import { schedulesRoutes } from "./schedules/schedules.routes";
import cors from 'cors'


export const appRoutes = (app: Express) => {

  const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }

  app.use(cors(corsOptions))

  app.use("/users", usersRoutes());
  app.use("/organizations", organizationsRoutes());
  app.use("/meetings", meetingsRoutes());
  app.use("/comments", commentsRoutes());
  app.use("/areas", areasRoutes());
  app.use("/login", loginRoutes());
  app.use("/administration", administrationRoutes());
  app.use("/posts", postRoutes());
  app.use("/upload", uploadRoutes());
  app.use("/reactions", reactionRoutes());
  app.use("/schedules", schedulesRoutes());
  
};
