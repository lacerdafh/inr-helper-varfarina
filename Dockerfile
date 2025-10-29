# Dockerfile para INR Helper
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Imagem de produção
FROM node:20-alpine

WORKDIR /app

# Copiar apenas o necessário para produção
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expor porta
EXPOSE 3000

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Executar aplicação
CMD ["node", "build"]
