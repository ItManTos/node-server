
启动静态web服务：

> ./cmd/node static
Usage: node static [port] [web path]
Sample[default]: ./cmd/node static 80 ./web



启动动态web服务：

> ./cmd/node index
Usage: node index [port] [web path] [fake js file path]
Sample[default]: ./cmd/node index 3000 ./web
Sample: ./cmd/node index 3001 ./web  ./web/fake/_urls.js
