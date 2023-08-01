import { Router } from "express";
import { CompaniesSubsResolver } from "./companys/subscriberCompanys/companies-subs.resolver";
import { SinginCompanyResolver } from "./companys/sing-inCompanys/company-login.resolver";
import { MenuResolver } from "./companys/menuCompanys/menu.resolver";
import { OrdersResolver } from "./orders/orders.resolver";
import { OrdersFinishedResolver } from "./finishedOrders/ordersFinished.resolver";

export const route = Router();

route.post("/create", new CompaniesSubsResolver().subscriber);
route.put("/update/:id", new CompaniesSubsResolver().updateCompanie);
route.get("/findall", new CompaniesSubsResolver().getAll);
route.get("/find/:args", new CompaniesSubsResolver().getAllForArgs);
route.get("/findbyname", new CompaniesSubsResolver().getByName);
route.delete("/remove/:id", new CompaniesSubsResolver().removeCompanie);
route.post('/singin', new SinginCompanyResolver().login)
route.delete('/singout/:id', new SinginCompanyResolver().logout)
route.get('/getuser/:id', new SinginCompanyResolver().getUser)
route.post('/createmenu', new MenuResolver().create)
route.get('/getallmenu/:companiesId', new MenuResolver().findMany)
route.delete('/deletemenu/:id', new MenuResolver().del)
route.put('/updatemenu/:id', new MenuResolver().update)
route.post('/orders', new OrdersResolver().create)
route.put('/orders/:id', new OrdersResolver().update)
route.put("/allordersbystatus", new OrdersResolver().updateMany);
route.get('/findorders', new OrdersResolver().findOrder)
route.get('/findallorders', new OrdersResolver().findAllOrdersFinished)
route.delete('/deleteorder', new OrdersResolver().del)
route.post('/ordersFinished', new OrdersFinishedResolver().create)
route.get('/ordersFinished', new OrdersFinishedResolver().find)
