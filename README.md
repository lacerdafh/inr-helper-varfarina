# INR Helper - Varfarina 💊

Aplicação web completa para cálculo de ajuste de dose de Varfarina baseada no INR (Razão Normalizada Internacional), desenvolvida com **SvelteKit + TypeScript**.

![License](https://img.shields.io/badge/license-Educational-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

## ⚠️ Aviso Importante

**Esta ferramenta é de caráter EDUCACIONAL apenas.**

- NÃO substitui avaliação médica profissional
- NÃO deve ser usada para auto-medicação
- SEMPRE confirme as condutas com seu médico
- Em caso de sangramento importante ou INR muito elevado, procure IMEDIATAMENTE um serviço de emergência

## 🎯 Funcionalidades

### 📊 Calculadora de Conduta INR
- Entrada de INR atual e fatores de risco
- Cálculo automático de conduta baseada em protocolos médicos
- Ajuste de Dose Total Semanal (DTS) com sugestões percentuais
- Orientações sobre vitamina K quando necessário
- Prazos de reavaliação personalizados
- Alertas de emergência para situações críticas

### 📅 Calendário de Doses
- Visualização mensal com pictogramas de frações de comprimido
- Distribuição automática da DTS em doses diárias
- Marcação da data de próxima consulta
- Função de impressão para acompanhamento físico

### 📋 Histórico de Consultas
- Armazenamento local (localStorage) de todas as consultas
- Exportação em CSV e PDF
- Visualização detalhada de cada registro
- Suporte opcional para backup remoto via Supabase

### 👥 Dois Modos de Visualização
- **Modo Paciente**: Interface simplificada e direta
- **Modo Profissional**: Informações detalhadas, justificativas clínicas e observações técnicas

## 🏗️ Stack Tecnológica

- **Framework**: SvelteKit 2.x
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Validação**: Zod
- **Testes**: Vitest + @testing-library/svelte
- **Geração de PDF**: jsPDF + jspdf-autotable
- **Persistência**: localStorage + Supabase (opcional)
- **Deploy**: Docker + adapter-node

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou pnpm

### Instalação Local

```bash
# Clone o repositório
git clone <seu-repositorio>
cd safe_use_warfarin

# Instale as dependências
npm install

# Configure variáveis de ambiente (opcional)
cp .env.example .env
# Edite .env se quiser configurar Supabase

# Execute em modo desenvolvimento
npm run dev

# Acesse em http://localhost:5173
```

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm test             # Executar testes
npm run test:watch   # Testes em modo watch
npm run check        # Verificação de tipos TypeScript
npm run lint         # Linting com ESLint
npm run format       # Formatação com Prettier
```

## 🐳 Deploy com Docker

```bash
# Build da imagem
docker build -t inr-helper .

# Executar container
docker run -p 3000:3000 inr-helper

# Acesse em http://localhost:3000
```

## ☁️ Deploy em Cloud

### Render / Railway

1. Conecte seu repositório Git
2. Configure build command: `npm run build`
3. Configure start command: `node build`
4. Defina variável de ambiente `NODE_ENV=production`

### Vercel

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🗄️ Configuração do Supabase (Opcional)

Se quiser persistência remota:

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute o seguinte SQL no SQL Editor:

```sql
CREATE TABLE consultas (
  id UUID PRIMARY KEY,
  data TIMESTAMP WITH TIME ZONE NOT NULL,
  entrada JSONB NOT NULL,
  resultado JSONB NOT NULL,
  usuario TEXT NOT NULL CHECK (usuario IN ('paciente', 'profissional')),
  versao_protocolo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_consultas_data ON consultas(data DESC);
```

3. Configure as variáveis de ambiente:

```env
VITE_SUPABASE_URL=seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

## 📚 Protocolo Médico Implementado

### Alvo Terapêutico Padrão: INR 2.0-3.0

#### Condutas por Faixa de INR:

- **INR < 2.0**: Aumentar DTS 10-15%, retorno 1-2 semanas
- **INR 3.1-3.5**: Diminuir DTS 10-15%, retorno 1-2 semanas
- **INR 3.6-4.0**: Reduzir DTS 10-15%, reavaliar 1-2 semanas
- **INR 4.1-4.9**: Suspender 1-2 doses, reduzir 10-20%, retorno 2-3 dias
- **INR 5.0-9.0 (sem risco)**: Omitir 1-2 doses, reavaliar 2-3 dias
- **INR 5.0-9.0 (com risco)**: Omitir doses + Vitamina K 2mg VO, reavaliar 24-48h
- **INR > 9.0**: EMERGÊNCIA - Vitamina K 5mg VO, omitir varfarina

### Fatores de Risco para Sangramento:

- Idade > 65 anos
- Uso de antiagregantes plaquetários
- História de sangramento
- HAS não controlada
- Doença hepática
- INR > 4.0
- História de quedas

## 📖 Referências Científicas

1. **UpToDate**: Warfarin and other VKAs: Dosing and adverse effects
2. **British Journal of Haematology** (2014;166:155–167): Guidelines on oral anticoagulation with warfarin
3. **Ministério da Saúde - Brasil** (2013): Manual de Rotinas para Atenção ao AVC

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes com cobertura
npm test -- --coverage

# Testes em modo watch
npm run test:watch
```

Os testes cobrem:
- Lógica do protocolo INR (12 cenários)
- Distribuição de doses semanais
- Geração de calendário mensal
- Cálculo de ajustes de DTS

## 🎨 Estrutura do Projeto

```
src/
├── lib/
│   ├── components/        # Componentes Svelte reutilizáveis
│   │   ├── FormINR.svelte
│   │   ├── ResultadoConduta.svelte
│   │   ├── AjusteDTSCard.svelte
│   │   └── CalendarioDoses.svelte
│   ├── protocol/          # Lógica de protocolo médico
│   │   ├── inr.ts
│   │   └── inr.test.ts
│   ├── stores/            # Stores Svelte (estado)
│   │   └── consultas.ts
│   ├── server/            # Integração com Supabase
│   │   └── db.ts
│   └── i18n/              # Internacionalização
│       └── pt-BR.json
├── routes/                # Páginas da aplicação
│   ├── +layout.svelte
│   ├── +page.svelte       # Home/Calculadora
│   ├── historico/
│   ├── calendario/
│   └── referencias/
├── app.html               # HTML base
└── app.css                # Estilos globais
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Principais áreas de interesse:

- Melhorias na UX/UI
- Adição de novos protocolos (ex: alvo 2.5-3.5 para próteses valvares mecânicas)
- Tradução para outros idiomas
- Testes adicionais
- Documentação

## 📄 Licença

Este projeto é disponibilizado para fins **educacionais** apenas. Não deve ser usado para decisões clínicas sem supervisão médica adequada.

## 🔗 Links Úteis

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Vitest](https://vitest.dev/)

---

**Desenvolvido com Claude Code** 🤖

*Para suporte ou feedback, abra uma issue no repositório.*
