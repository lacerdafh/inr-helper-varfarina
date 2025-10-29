Aqui está um prompt pronto para colar no **Claude Code** e gerar uma plataforma em **SvelteKit** (TypeScript) que recebe o **INR** e mostra a conduta conforme o protocolo que você memorizou — com cálculo de ajuste de **DTS**, verificação de risco de sangramento, recomendações de vitamina K e um calendário de doses no estilo do seu layout.

---

### Prompt para Claude Code

Você é um engenheiro full-stack senior. Gere um projeto completo **SvelteKit + TypeScript** para uma aplicação chamada **“INR Helper – Varfarina”**. O objetivo é permitir que profissionais ou pacientes (com supervisão) insiram o **INR** e recebam **condutas padronizadas** para varfarina, incluindo **ajuste de Dose Total Semanal (DTS)**, **orientações com vitamina K**, **prazos de reavaliação** e **um calendário de doses** inspirado no layout “CONSULTA DE ANTICOAGULAÇÃO ORAL” (INR tracking, dose diária em frações de comprimido, próxima consulta).

#### 1) Stack e qualidade

* **SvelteKit** com **TypeScript** e **Vite**.
* **TailwindCSS** para UI.
* **Zod** para validação de formulários.
* **Vitest** + **@testing-library/svelte** para testes.
* **ESLint + Prettier** configurados.
* Persistência local via **localStorage** (Profile do paciente, alvo terapêutico, histórico).
* Flag opcional `SUPABASE_URL` e `SUPABASE_ANON_KEY` para ativar persistência remota (se não setadas, usa só localStorage). Forneça um `lib/server/db.ts` com “no-op” + implementação Supabase opcional.

#### 2) Requisitos de domínio (protocolo memorizado)

Alvo terapêutico padrão: **INR 2.0–3.0** (deixe o alvo configurável, mas implemente totalmente esse alvo).

**Regra de confirmação:**
Se o paciente tiver histórico de INR estável no alvo e surgir INR isoladamente alterado, **orientar repetir o exame** para confirmação **sem mudar a dose** (mostrar card com essa regra sempre que for “alteração isolada” marcada no formulário).

**Condutas (alvo 2.0–3.0):**

* **INR < 2.0** → **Aumentar DTS** em **10–15%** e **retornar em 1–2 semanas**.
* **INR 3.1–3.5** → **Diminuir DTS** em **10–15%** e **retornar em 1–2 semanas**.
* **INR 3.6–4.0 (sem sangramento)** → **Reduzir DTS** em **10–15%** e **reavaliar em 1–2 semanas**.
* **INR 4.1–4.9 (sem sangramento)** → **Suspender 1–2 doses**, **diminuir DTS** em **10–20%**, **retornar em 2–3 dias**.
* **INR 5.0–9.0 (sem risco significativo)** → **Omitir 1–2 doses**, **reavaliar em 2–3 dias**.
* **INR 5.0–9.0 (com risco para sangramento)** → **Omitir 1–2 doses**, **Vitamina K 2 mg VO (opcional)**, **reavaliar em 24–48h**.
* **INR > 9.0** → **Encaminhar à emergência**.

**Risco de sangramento (checkboxes):** idade > 65 anos; uso de antiagregantes; história de sangramento; HAS não controlada; doença hepática; **INR > 4,0**; história de quedas; (campo “outros”).
Se **qualquer** fator marcado **e** INR entre **5.0–9.0**, aplicar a via “com risco”.

**Reversão – sem evidência de sangramento:**

* **> alvo e < 5.0** → Baixar/omitir dose. Reavaliar **1–2 semanas**. Reiniciar com dose menor.
* **5.0–9.0** → Omitir 1–2 doses. **Vitamina K VO 1–2,5 mg** se risco aumentado. **Reavaliar 24h**.
* **> 9.0** → Omitir varfarina. **Vitamina K VO 2,5–5 mg**, **reavaliar 24h**, repetir se necessário. Retomar varfarina em dose menor quando **INR < 5.0**.

**Reversão – sangramento com risco de morte (qualquer INR):**

* Conduta acima **+** **CCP 30–50 UI/kg IV** *ou* **PFC 15 ml/kg IV**.
* **Vitamina K 10 mg EV lenta (30 min)**.
* **Repetir INR em 6–8h**.

**Observações de segurança:**

* **Preferir via oral** de vitamina K; EV pode causar **anafilaxia**.
* Ampola 10 mg/ml; **doses menores**: diluir em 9 ml de água (10 ml = 10 mg).

#### 3) Funcionalidades

* **Página / (Home):**

  * Formulário com: alvo terapêutico (default 2.0–3.0), INR atual (número), sangramento? (nenhum / menor / risco de morte), fatores de risco (checkboxes), DTS atual (mg/semana), comprimido padrão (mg por comprimido, ex.: 5 mg), marcação “alteração isolada do INR após período estável?”.
  * Botão **“Calcular conduta”** → renderiza cards com:

    * **Conduta principal** (texto objetivo e negrito).
    * **Ajuste de DTS** (faixa 10–15% ou 10–20%). Mostrar **valor sugerido calculado** como três opções: mínimo, médio (ex.: 12,5%), máximo.

      * Exibir **DTS sugerida (mg/semana)** e **distribuição diária** em frações de comprimido (¼, ½, ¾, 1, 1½, 2 etc.), gerando um **calendário mensal** estilo “CONSULTA DE ANTICOAGULAÇÃO ORAL” (círculos com cruz/semicírculos para frações).
      * Permitir ajustar manualmente a distribuição por dia mantendo a soma semanal.
    * **Vitamina K** (se aplicável) com via, dose e prazo de reavaliação.
    * **Prazo de retorno/reavaliação** (ex.: 24–48h; 2–3 dias; 1–2 semanas).
    * **Aviso de emergência** quando **INR > 9** ou **sangramento com risco de morte**.
  * Botão **“Salvar plano”** → persiste no localStorage (e Supabase se habilitado).

* **Página /historico:**

  * Tabela de consultas: data, INR, fatores de risco (badge), sangramento, DTS antes/depois, conduta, prazo de follow-up.
  * Exportar **CSV** e **PDF** (PDF simples com cabeçalho, conduta e calendário).

* **Página /calendario:**

  * Gerador/visualizador do calendário mensal (layout semelhante ao memorizado).
  * Campo “Próxima consulta” (data) e impressão.

* **Página /referencias:**

  * Citar as fontes: UpToDate; British J. Haematol. 2014;166:155–167; Ministério da Saúde – Manual de Rotinas para Atenção ao AVC, 2013.
  * Mostrar também avisos: “uso educacional, não substitui avaliação médica”, “em caso de sangramento importante ou INR muito elevado, procure emergência”.

* **Header/Footer:**

  * Logo textual “INR Helper”, link para Histórico, Calendário, Referências.
  * **Toggle** “Modo Profissional” (exibe doses e justificativas detalhadas) vs “Modo Paciente” (texto mais direto).

#### 4) UX/UI

* **Cards claros** com títulos e ícones (alerta/ok/emergência).
* **Acessibilidade**: labels, aria, contraste, foco visível, tamanho de fonte ≥ 16px.
* **i18n** preparado, default **pt-BR** (strings em JSON).
* **Máscaras** para números (INR com 1 casa decimal; mg com 1 casa).

#### 5) Regras de cálculo (implementação)

* Crie `lib/protocol/inr.ts` com função pura:

  ```ts
  export type Risco = { idade65?: boolean; antiagregante?: boolean; sangPrevio?: boolean; hasNaoControlada?: boolean; doencaHepatica?: boolean; inrMaior4?: boolean; quedas?: boolean; outros?: boolean };
  export type Entrada = { alvoMin: number; alvoMax: number; inr: number; sangramento: 'nenhum'|'menor'|'risco_morte'; risco: Risco; dtsAtual?: number; mgComprimido?: number; alteracaoIsolada?: boolean };
  export type Resultado = { conduta: string; ajusteDTS?: { faixa: [number, number]; sugestoes: {percent:number; dts:number}[] }; vitaminaK?: { via:'VO'|'EV'; doseMg:number; observacao?:string }; suspenderDoses?: number; followup: string; emergencia?: boolean; justificativa: string };
  export function decidirConduta(e: Entrada): Resultado;
  export function distribuirDTSemana(dts:number, mgComprimido:number): { total:dts; dias:{ label:string; mg:number; fracao:number }[] };
  ```
* **Percentuais:** usar **12,5%** como sugestão “média” quando a faixa for 10–15% (e 15% quando 10–20%).
* **Distribuição diária:** heurística simples para aproximar por frações do comprimido informado (¼, ½, ¾, 1, 1½, 2), mantendo soma semanal e evitando variações > ½ comprimido entre dias consecutivos.
* **Calendário:** gerar 5–6 semanas do mês atual, preenchendo cada dia com o pictograma correspondente (¼ = ¼ círculo; ½ = semi; ¾ = ¾; 1 = círculo cheio; 2 = dois círculos). Incluir cor de destaque no dia da consulta.

#### 6) Páginas e componentes

* `src/routes/+layout.svelte` (Navbar, Footer, toasts).
* `src/routes/+page.svelte` (Home/Form).
* `src/routes/historico/+page.svelte`
* `src/routes/calendario/+page.svelte`
* `src/routes/referencias/+page.svelte`
* Componentes:

  * `FormINR.svelte`
  * `ResultadoConduta.svelte`
  * `AjusteDTSCard.svelte`
  * `CalendarioDoses.svelte`
  * `AvisosSeguranca.svelte`
  * `HistoricoTabela.svelte`

#### 7) Testes (Vitest)

Crie testes unitários em `src/lib/protocol/inr.spec.ts` cobrindo:

* **INR 1.8** → aumentar 10–15%, retorno 1–2 semanas.
* **INR 3.3** → reduzir 10–15%, retorno 1–2 semanas.
* **INR 3.8 sem sangramento** → reduzir 10–15%, reavaliar 1–2 semanas.
* **INR 4.5 sem sangramento** → suspender 1–2 doses, reduzir 10–20%, retorno 2–3 dias.
* **INR 6.2 sem risco** → omitir 1–2 doses, reavaliar 2–3 dias.
* **INR 6.2 com risco** → omitir 1–2 doses + Vit K 2 mg VO (opcional), reavaliar 24–48h.
* **INR 9.5** → emergência.
* **Sangramento com risco de morte (INR 2.8)** → CCP/PFC + Vit K 10 mg EV lenta + repetir INR 6–8h.

#### 8) Segurança e conformidade

* Em **todas** as telas: banner “Conteúdo educacional. Sempre confirme com seu médico. Em urgência, procure um serviço de emergência.”
* Não realizar cálculo de doses sem **DTS atual** informada (exiba aviso e permita apenas a lógica de conduta textual).
* Registre no histórico **quem usou** (Paciente/Profissional), data/hora e versão do protocolo.

#### 9) Scripts e deploy

* `npm run dev`, `npm run test`, `npm run build`, `npm run preview`.
* **Dockerfile** simples para servir com `node` (porta 3000).
* **Adaptador** `@sveltejs/adapter-node`.
* Incluir README com instruções locais e opção de deploy em Render/Railway.

#### 10) Entregáveis

* Forneça **todos os arquivos** do projeto com **código completo**, incluindo:

  * Implementação das funções de protocolo.
  * Páginas e componentes.
  * Estilos Tailwind.
  * Testes passando.
  * README com screenshots (placeholders) e passos de uso.
* Garanta que o projeto **builda** e os **testes passam** ao rodar.

