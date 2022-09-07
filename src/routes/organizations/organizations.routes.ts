import { Express } from "express";

export const organizationsRoutes = (app: Express) => {
  app.get("/organizations");
  app.get("/organizations/:org_id");
  app.post("/organization");
  app.patch("/organization/:org_id");
};
