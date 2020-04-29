import * as Koa from "koa"
import * as koaBody from "koa-body"
import { validateRequest } from "./origins"
import { router } from "./routes"


const app = new Koa()
    .use(validateRequest)
    .use(koaBody())
    .use(router.routes())


export const start = () => {
  const host = process.env.HOST ?? "0.0.0.0"
  const port = Number.parseInt(process.env.PORT ?? "4000")
  app.listen(port, host, () => console.log(`Server running on ${ host }:${ port }`))
}
