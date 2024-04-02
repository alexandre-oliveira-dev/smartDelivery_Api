import { Router } from "express";
import { OrdersResolver } from "./smd-orders/orders.resolver";
import { OrdersFinishedResolver } from "./smd-finishedOrders/ordersFinished.resolver";
import { ClientsResolver } from "./smd-clients/clients.resolver";
import { CompaniesSubsResolver } from "./smd-companys/companies-subs.resolver";
import { SinginCompanyResolver } from "./smd-sing-inCompanys/company-login.resolver";
import { MenuResolver } from "./smd-menuCompanys/menu.resolver";

export const route = Router();

route.get("/", (req,res)=> res.send('olaaaa'));
//COMPANYS
route.post("/create", new CompaniesSubsResolver().subscriber);
route.put("/update/:id", new CompaniesSubsResolver().updateCompanie);
route.get("/findall", new CompaniesSubsResolver().getAll);
route.get("/find/:args", new CompaniesSubsResolver().getAllForArgs);
route.get("/findbyname", new CompaniesSubsResolver().getByName);
route.delete("/remove/:id", new CompaniesSubsResolver().removeCompanie);

//LOGIN COMPANYS
route.post("/singin", new SinginCompanyResolver().login);
route.delete("/singout/:id", new SinginCompanyResolver().logout);
route.get("/getuser/:id", new SinginCompanyResolver().getUser);

//MENUCOMPANYS
route.post("/createmenu", new MenuResolver().create);
route.get("/getallmenu/:companiesId", new MenuResolver().findMany);
route.delete("/deletemenu/:id", new MenuResolver().del);
route.put("/updatemenu/:id", new MenuResolver().update);

//ORDERS
route.post("/orders", new OrdersResolver().create);
route.put("/orders/:id", new OrdersResolver().update);
route.put("/allordersbystatus", new OrdersResolver().updateAllOrdersByStatus);
route.get("/findorders", new OrdersResolver().findOrder);
route.get("/findallorders", new OrdersResolver().findAllOrdersFinished);
route.delete("/deleteorder", new OrdersResolver().del);

//FINISHEDORDERS
route.post("/ordersFinished", new OrdersFinishedResolver().create);
route.get("/ordersFinished", new OrdersFinishedResolver().find);

//CLIENTS
route.post("/clients", new ClientsResolver().create);
