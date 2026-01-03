import Handlebars from "handlebars"
import type { RuntimeOptions } from "handlebars"
import indexHtml from "../html/index.html"
import { join, resolve } from "node:path"


interface CompileBody {
    template: string
    context?: {
        [key: string]: any
    },
    options?: RuntimeOptions
}


const server = Bun.serve({

    routes: {
        "/": indexHtml,

        "/static/:filename": (request) => {
            const filePath = resolve(join(import.meta.dir, "..", "static", request.params.filename))
            return new Response(Bun.file(filePath))
        },

        "/api/render": {
            POST: async (req) => {
                console.debug("/api/render")
                const data = await req.json() as CompileBody
                const template = Handlebars.compile(data.template)
                const rendered = template(data?.context ?? undefined, data?.options ?? undefined)
                return Response.json({rendered})
            },
        },
    },
})

console.log(`Server running at ${server.url}`)
