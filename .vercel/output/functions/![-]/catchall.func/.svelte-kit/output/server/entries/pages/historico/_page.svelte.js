import { W as store_get, a0 as head, $ as ensure_array_like, Y as unsubscribe_stores } from "../../../chunks/index2.js";
import { c as consultasStore } from "../../../chunks/consultas.js";
import "jspdf";
import "jspdf-autotable";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let consultas;
    function formatarData(data) {
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(data);
    }
    function contarFatoresRisco(risco) {
      return Object.values(risco).filter(Boolean).length;
    }
    consultas = store_get($$store_subs ??= {}, "$consultasStore", consultasStore);
    head("vrmrcd", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Histórico de Consultas - INR Helper</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div><h1 class="text-3xl font-bold text-gray-900 mb-2">Histórico de Consultas</h1> <p class="text-gray-600">Visualize e exporte seus registros de ajuste de INR</p></div> `);
    if (consultas.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-wrap gap-3"><button class="btn-primary">📊 Exportar CSV</button> <button class="btn-primary">📄 Exportar PDF</button> <button class="btn-danger ml-auto">🗑️ Limpar Histórico</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (consultas.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card text-center py-12"><svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> <h3 class="text-xl font-semibold text-gray-700 mb-2">Nenhuma consulta registrada</h3> <p class="text-gray-500 mb-4">Comece calculando uma conduta na página inicial e salve o plano.</p> <a href="/" class="btn-primary">Ir para Calculadora</a></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="space-y-4"><!--[-->`);
      const each_array = ensure_array_like(consultas);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let consulta = each_array[$$index];
        $$renderer2.push(`<div class="card hover:shadow-lg transition-shadow"><div class="flex items-start justify-between mb-4"><div><div class="flex items-center gap-3 mb-2"><span class="text-2xl font-bold text-primary-600">INR: ${escape_html(consulta.entrada.inr)}</span> `);
        if (consulta.resultado.emergencia) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">EMERGÊNCIA</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (consulta.entrada.sangramento !== "nenhum") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">${escape_html(consulta.entrada.sangramento === "risco_morte" ? "Sangramento Grave" : "Sangramento Menor")}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <p class="text-sm text-gray-500">${escape_html(formatarData(consulta.data))} • ${escape_html(consulta.usuario === "profissional" ? "👨‍⚕️ Profissional" : "👤 Paciente")}</p></div> <button class="text-red-600 hover:text-red-800" title="Remover"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><h4 class="font-semibold text-gray-700 mb-2">Dados da Consulta</h4> <ul class="text-sm space-y-1 text-gray-600"><li><strong>Alvo:</strong> ${escape_html(consulta.entrada.alvoMin)} - ${escape_html(consulta.entrada.alvoMax)}</li> <li><strong>Fatores de Risco:</strong> ${escape_html(contarFatoresRisco(consulta.entrada.risco) || "Nenhum")}</li> `);
        if (consulta.entrada.dtsAtual) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<li><strong>DTS Atual:</strong> ${escape_html(consulta.entrada.dtsAtual)} mg/semana</li>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (consulta.entrada.alteracaoIsolada) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<li class="text-blue-600">⚠️ Alteração isolada marcada</li>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></ul></div> <div><h4 class="font-semibold text-gray-700 mb-2">Conduta</h4> <p class="text-sm text-gray-800 font-medium mb-2">${escape_html(consulta.resultado.conduta)}</p> `);
        if (consulta.resultado.ajusteDTS) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-sm text-gray-600"><strong>DTS Sugerida:</strong> ${escape_html(consulta.resultado.ajusteDTS.sugestoes[1].dts)} mg/semana
									(${escape_html(consulta.resultado.ajusteDTS.sugestoes[1].percent > 0 ? "+" : "")}${escape_html(consulta.resultado.ajusteDTS.sugestoes[1].percent)}%)</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <p class="text-sm text-gray-600"><strong>Retorno:</strong> ${escape_html(consulta.resultado.followup)}</p></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
