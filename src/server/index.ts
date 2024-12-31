import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { authRouter } from "./routers/authRouter";
import { categoryRouter } from "./routers/categoryRouter";
// import { paymentRouter } from "./routers/paymentRouter";
// import { projectRouter } from "./routers/projectRouter";

const app = new Hono().basePath("/api").use(cors());

/**
 * This is the primary router for your server.
 *
 * All routers added in /server/routers should be manually added here.
 */
const appRouter = app
  .route("/auth", authRouter)
  .route("/category", categoryRouter);
// .route("/payment", paymentRouter)
// .route("/project", projectRouter);

// The handler Next.js uses to answer API requests
export const httpHandler = handle(app);

export default app;
export type AppType = typeof appRouter;
