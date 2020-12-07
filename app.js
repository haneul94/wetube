import express from "express"; //const express = require('express');
import morgan from "morgan";    //로그 남기기 위해 사용
import helmet from "helmet";    //node.js 보안 관련
import cookieParser from "cookie-parser";   //cookie를 사용할수 있게
import bodyParser from "body-parser";   //body로 부터 정보를 얻을수 있게 도와줌
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
//미들웨어 사용
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev")); 

app.use(localsMiddleware);


app.use(routes.home, globalRouter); 
app.use(routes.users, userRouter);  //app.use("/users", userRouter);
app.use(routes.videos, videoRouter);

export default app;  //app변수를 다른곳에서 사용할수 있게 해줌