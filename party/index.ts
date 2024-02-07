import type * as Party from 'partykit/server'
//import { verifyToken } from "@clerk/backend";
//import { DEFAULT_CLERK_ENDPOINT } from '../app.config'
import { OpenAI_API } from '../app.config'
import { AI } from './ai'

console.log('OpenAI key:', OpenAI_API.key, '\nOpenAI org:', OpenAI_API.org)

export default class Server implements Party.Server {
  ai: AI

  constructor(readonly party: Party.Party) {
    var tmparr = this.party.id.split('-')
    console.log('selected persona:', tmparr[1])
    this.ai = new AI(tmparr[1], OpenAI_API.key, OpenAI_API.org)
  }

/*
  static async onBeforeConnect(request: Party.Request, lobby: Party.Lobby) {
    try {
      // get authentication server url from environment variables (optional)
      const issuer = lobby.env.CLERK_ENDPOINT || DEFAULT_CLERK_ENDPOINT
      // get token from request query string
      const token = new URL(request.url).searchParams.get("token") ?? "";
      // verify the JWT (in this case using clerk)
      const session = await verifyToken(token, { issuer });
      // pass any information to the onConnect handler in headers (optional)
      request.headers.set("X-User-ID", session.sub);
      // forward the request onwards on onConnect
      return request;
    } catch (e) {
      // authentication failed!
      // short-circuit the request before it's forwarded to the party
      return new Response("Unauthorized", { status: 401 });
    }
  }
*/

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected:
  id: ${conn.id}
  room: ${this.party.id}
  url: ${new URL(ctx.request.url).pathname}`
    )

  }

  async onMessage(
    message: string //sender: Party.Connection
  ) {
    // let's log the message
    const data = JSON.parse(message)
    // console.log('message', message)

    await this.ai.userMessage(data.msg, data.history || [], async data => {
      // console.log('data', data._id)
      // sender.send(JSON.stringify(data))
      this.party.broadcast(JSON.stringify(data))
    })
  }
}

Server satisfies Party.Worker
