import { connect } from "./src/db"
import { start } from "./src/server"


const run = async () => {
  console.log("application starting...")
  console.log("connecting to DB...")
  await connect()
  console.log("starting HTTP server...")
  const [host, port] = await start()
  console.log(`HTTP server listening ${ host }:${ port }`)
}


run().then(_ => console.log("application ready"))
