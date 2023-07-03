import { Router } from "express";
import { CompaniesSubsResolver } from "./companies/subscriber/companies-subs.resolver";
import { SinginCompanyResolver } from "./companies/sing-in/company-login.resolver";
import { MenuResolver } from "./companies/menu/menu.resolver";

export const route = Router();

route.post("/create", new CompaniesSubsResolver().subscriber);
route.put("/update/:id", new CompaniesSubsResolver().updateCompanie);
route.get("/findall", new CompaniesSubsResolver().getAll);
route.get("/find/:args", new CompaniesSubsResolver().getAllForArgs);
route.delete("/remove/:id", new CompaniesSubsResolver().removeCompanie);
route.post('/singin', new SinginCompanyResolver().login)
route.delete('/singout/:id', new SinginCompanyResolver().logout)
route.get('/getuser/:id', new SinginCompanyResolver().getUser)
route.post('/createmenu', new MenuResolver().create)
route.get('/getallmenu/:companiesId', new MenuResolver().findMany)
route.delete('/deletemenu/:id', new MenuResolver().del)
route.put('/updatemenu/:id', new MenuResolver().update)
