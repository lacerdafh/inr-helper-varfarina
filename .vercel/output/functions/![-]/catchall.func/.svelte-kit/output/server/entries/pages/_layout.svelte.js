import { U as attr_class, V as stringify, W as store_get, X as slot, Y as unsubscribe_stores } from "../../chunks/index2.js";
import { m as modoStore } from "../../chunks/consultas.js";
import { g as getContext, e as escape_html } from "../../chunks/context.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="min-h-screen flex flex-col"><div class="bg-yellow-100 border-b-2 border-yellow-300 py-2 px-4 text-center"><p class="text-sm text-yellow-900">⚠️ <strong>Conteúdo Educacional</strong> - Sempre confirme com seu médico. Em urgência,
			procure um serviço de emergência.</p></div> <header class="bg-primary-600 text-white shadow-lg"><div class="container mx-auto px-4 py-4"><div class="flex items-center justify-between"><a href="/" class="flex items-center gap-2"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> <span class="text-2xl font-bold">INR Helper</span></a> <nav class="hidden md:flex items-center gap-6"><a href="/"${attr_class(`hover:text-primary-100 transition-colors ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === "/" ? "font-bold border-b-2 border-white" : "")}`)}>Calculadora</a> <a href="/historico"${attr_class(`hover:text-primary-100 transition-colors ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === "/historico" ? "font-bold border-b-2 border-white" : "")}`)}>Histórico</a> <a href="/calendario"${attr_class(`hover:text-primary-100 transition-colors ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === "/calendario" ? "font-bold border-b-2 border-white" : "")}`)}>Calendário</a> <a href="/referencias"${attr_class(`hover:text-primary-100 transition-colors ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === "/referencias" ? "font-bold border-b-2 border-white" : "")}`)}>Referências</a> <button class="px-3 py-1 bg-white text-primary-600 rounded-full text-sm font-semibold hover:bg-primary-50 transition-colors">${escape_html(store_get($$store_subs ??= {}, "$modoStore", modoStore) === "paciente" ? "👤 Paciente" : "👨‍⚕️ Profissional")}</button></nav> <button class="md:hidden"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></header> <main class="flex-1 container mx-auto px-4 py-8 max-w-6xl"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></main> <footer class="bg-gray-800 text-gray-300 py-6 mt-auto"><div class="container mx-auto px-4 text-center"><p class="text-sm">© 2024 INR Helper - Ferramenta educacional para ajuste de dose de Varfarina</p> <p class="text-xs mt-2 text-gray-400">Versão do Protocolo: ${escape_html("1.0.0")}</p> <p class="text-sm mt-3 text-blue-300">💡 Idealizado por <strong>Dra. Carla Pires Oliveira</strong></p> <p class="text-xs mt-1 text-gray-400">Criado por <strong>Fábio Lacerda</strong> e <strong>Geyson Florencio</strong></p> <p class="text-xs mt-2 text-yellow-400">⚠️ Esta ferramenta não substitui avaliação médica profissional</p></div></footer></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
