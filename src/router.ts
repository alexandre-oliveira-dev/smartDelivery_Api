import { Router } from "express";
import { CompaniesSubsResolver } from "./companies/subscriber/companies-subs.resolver";

export const route = Router();

route.post("/create", new CompaniesSubsResolver().subscriber);
route.put("/update/:id", new CompaniesSubsResolver().updateCompanie);
route.get("/findall", new CompaniesSubsResolver().getAll);
route.get("/find/:args", new CompaniesSubsResolver().getAllForArgs);
route.delete("/remove/:id", new CompaniesSubsResolver().removeCompanie);
