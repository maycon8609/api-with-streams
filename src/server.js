import http from "node:http"

const users = []

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    request.body = null
  }

  if (url === "/users") {
    if (method === "POST") {
      const { name, email } = request.body

      console.log(request.body)

      users.push({ name, email })

      return response.writeHead(201).end()
    }

    if (method === "GET") {
      return response
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(users))
    }
  }

  return response.writeHead(404).end()
})

server.listen(3333)
