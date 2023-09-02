import { app } from "./app.service";

/*  */app.listen(process.env.PORT, () => console.log("online"));
app.listen(3333, () => console.log("online"));
