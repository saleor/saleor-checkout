import { rest } from "msw"

export const mollieHandlers = [
  rest.get("https://api.mollie.com/v2/*", (req, res, ctx) => {
    console.log(req)

    return res(
      ctx.status(500)
    )
  })
]
