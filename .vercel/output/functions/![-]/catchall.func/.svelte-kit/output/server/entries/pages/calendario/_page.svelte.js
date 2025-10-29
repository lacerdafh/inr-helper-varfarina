import { $ as ensure_array_like, U as attr_class, V as stringify, _ as bind_props, W as store_get, a0 as head, Z as attr, Y as unsubscribe_stores } from "../../../chunks/index2.js";
import { g as gerarCalendarioMensal, d as distribuirDTSemana } from "../../../chunks/CalendarioDoses.svelte_svelte_type_style_lang.js";
import { f as fallback, e as escape_html } from "../../../chunks/context.js";
import { p as perfilStore } from "../../../chunks/consultas.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function CalendarioDoses($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let calendario;
    let distribuicao = $$props["distribuicao"];
    let dataConsulta = fallback($$props["dataConsulta"], void 0);
    const hoje = /* @__PURE__ */ new Date();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();
    const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ];
    function renderizarPictograma(fracao) {
      if (fracao === 0) return "";
      const circulo = `<circle cx="16" cy="16" r="14" fill="#60a5fa" stroke="#2563eb" stroke-width="2"/>`;
      if (fracao === 0.25) {
        return `<svg viewBox="0 0 32 32" class="w-8 h-8">
        ${circulo}
        <line x1="16" y1="2" x2="16" y2="30" stroke="white" stroke-width="2"/>
        <line x1="2" y1="16" x2="30" y2="16" stroke="white" stroke-width="2"/>
        <path d="M 16 16 L 16 2 A 14 14 0 0 1 30 16 Z" fill="white" opacity="0.7"/>
      </svg>`;
      } else if (fracao === 0.5) {
        return `<svg viewBox="0 0 32 32" class="w-8 h-8">
        ${circulo}
        <line x1="16" y1="2" x2="16" y2="30" stroke="white" stroke-width="2"/>
        <path d="M 16 2 A 14 14 0 0 1 16 30 Z" fill="white" opacity="0.7"/>
      </svg>`;
      } else if (fracao === 0.75) {
        return `<svg viewBox="0 0 32 32" class="w-8 h-8">
        ${circulo}
        <line x1="16" y1="2" x2="16" y2="30" stroke="white" stroke-width="2"/>
        <line x1="2" y1="16" x2="30" y2="16" stroke="white" stroke-width="2"/>
        <path d="M 16 16 L 30 16 A 14 14 0 0 1 16 30 Z" fill="white" opacity="0.7"/>
      </svg>`;
      } else if (fracao === 1) {
        return `<svg viewBox="0 0 32 32" class="w-8 h-8">
        ${circulo}
      </svg>`;
      } else if (fracao === 1.25) {
        return `<svg viewBox="0 0 32 32" class="w-10 h-8">
        <circle cx="10" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="22" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="22" y1="8" x2="22" y2="24" stroke="white" stroke-width="1.5"/>
        <line x1="14" y1="16" x2="30" y2="16" stroke="white" stroke-width="1.5"/>
        <path d="M 22 16 L 22 8 A 8 8 0 0 1 30 16 Z" fill="white" opacity="0.7"/>
      </svg>`;
      } else if (fracao === 1.5) {
        return `<svg viewBox="0 0 32 32" class="w-10 h-8">
        <circle cx="10" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="22" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="22" y1="8" x2="22" y2="24" stroke="white" stroke-width="1.5"/>
        <path d="M 22 8 A 8 8 0 0 1 22 24 Z" fill="white" opacity="0.7"/>
      </svg>`;
      } else if (fracao === 1.75) {
        return `<svg viewBox="0 0 32 32" class="w-10 h-8">
        <circle cx="10" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="22" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="22" y1="8" x2="22" y2="24" stroke="white" stroke-width="1.5"/>
        <line x1="14" y1="16" x2="30" y2="16" stroke="white" stroke-width="1.5"/>
        <path d="M 22 16 L 30 16 A 8 8 0 0 1 22 24 Z" fill="white" opacity="0.7"/>
      </svg>`;
      } else if (fracao === 2) {
        return `<svg viewBox="0 0 32 32" class="w-10 h-8">
        <circle cx="10" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="22" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
      </svg>`;
      } else if (fracao === 2.25) {
        return `<svg viewBox="0 0 40 32" class="w-12 h-8">
        <circle cx="8" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="20" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="32" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="32" y1="10" x2="32" y2="22" stroke="white" stroke-width="1.5"/>
        <line x1="26" y1="16" x2="38" y2="16" stroke="white" stroke-width="1.5"/>
        <path d="M 32 16 L 32 10 A 6 6 0 0 1 38 16 Z" fill="white" opacity="0.7"/>
      </svg>`;
      } else if (fracao === 2.5) {
        return `<svg viewBox="0 0 40 32" class="w-12 h-8">
        <circle cx="8" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="20" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="32" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="32" y1="10" x2="32" y2="22" stroke="white" stroke-width="1.5"/>
        <path d="M 32 10 A 6 6 0 0 1 32 22 Z" fill="white" opacity="0.7"/>
      </svg>`;
      }
      return `<svg viewBox="0 0 32 32" class="w-8 h-8">
      ${circulo}
      <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${fracao}</text>
    </svg>`;
    }
    calendario = gerarCalendarioMensal(anoAtual, mesAtual, distribuicao.dias, dataConsulta);
    $$renderer2.push(`<div class="bg-white p-6 rounded-lg border-2 border-gray-300"><h3 class="text-center font-bold text-xl text-gray-800 mb-4">${escape_html(meses[mesAtual - 1])} de ${escape_html(anoAtual)}</h3> <div class="grid grid-cols-7 gap-2 mb-2"><!--[-->`);
    const each_array = ensure_array_like(diasSemana);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let dia = each_array[$$index];
      $$renderer2.push(`<div class="text-center font-semibold text-gray-600 text-sm">${escape_html(dia)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(calendario.semanas);
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let semana = each_array_1[$$index_2];
      $$renderer2.push(`<div class="grid grid-cols-7 gap-2"><!--[-->`);
      const each_array_2 = ensure_array_like(semana.dias);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let dia = each_array_2[$$index_1];
        $$renderer2.push(`<div${attr_class(`aspect-square border rounded-lg flex flex-col items-center justify-center p-1 ${stringify(dia.isConsulta ? "border-green-500 bg-green-50 border-2" : dia.dia ? "border-gray-300 bg-gray-50" : "border-transparent")}`)}>`);
        if (dia.dia) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="text-xs font-semibold text-gray-700 mb-1">${escape_html(dia.dia)}</div> <div class="flex items-center justify-center">${html(renderizarPictograma(dia.fracao))}</div> <div class="text-xs text-gray-500 mt-1">${escape_html(dia.fracao)}</div> `);
          if (dia.isConsulta) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="text-xs text-green-600 font-bold mt-1">✓ Consulta</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-6 p-4 bg-gray-50 rounded-lg"><h4 class="font-semibold text-sm text-gray-700 mb-3">Legenda:</h4> <div class="grid grid-cols-4 gap-3 text-xs"><div class="flex items-center gap-2">${html(renderizarPictograma(0.25))} <span>1/4</span></div> <div class="flex items-center gap-2">${html(renderizarPictograma(0.5))} <span>1/2</span></div> <div class="flex items-center gap-2">${html(renderizarPictograma(0.75))} <span>3/4</span></div> <div class="flex items-center gap-2">${html(renderizarPictograma(1))} <span>1</span></div> <div class="flex items-center gap-2">${html(renderizarPictograma(1.5))} <span>1 1/2</span></div> <div class="flex items-center gap-2">${html(renderizarPictograma(2))} <span>2</span></div></div></div> <button type="button" class="btn-secondary w-full mt-4 svelte-x5wm88">🖨️ Imprimir Calendário</button></div>`);
    bind_props($$props, { distribuicao, dataConsulta });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let distribuicao, dataConsultaParsed;
    let dts = 35;
    let dataConsulta = "";
    distribuicao = distribuirDTSemana(dts, store_get($$store_subs ??= {}, "$perfilStore", perfilStore).mgComprimido);
    dataConsultaParsed = void 0;
    head("1wq69bv", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Calendário de Doses - INR Helper</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div><h1 class="text-3xl font-bold text-gray-900 mb-2">Calendário de Doses</h1> <p class="text-gray-600">Visualize e imprima o calendário mensal de doses de varfarina</p></div> <div class="card"><h2 class="text-xl font-bold text-gray-800 mb-4">Configurações</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label for="dts" class="label">Dose Total Semanal (mg/semana)</label> <input id="dts" type="number" step="0.5"${attr("value", dts)} class="input" min="1" max="100"/></div> <div><label for="mgComprimido" class="label">Dosagem do Comprimido (mg)</label> <input id="mgComprimido" type="number" step="0.5"${attr("value", store_get($$store_subs ??= {}, "$perfilStore", perfilStore).mgComprimido)} class="input" min="1" max="10"/></div> <div><label for="dataConsulta" class="label">Data da Próxima Consulta (opcional)</label> <input id="dataConsulta" type="date"${attr("value", dataConsulta)} class="input"/></div></div></div> `);
    CalendarioDoses($$renderer2, { distribuicao, dataConsulta: dataConsultaParsed });
    $$renderer2.push(`<!----> <div class="card bg-blue-50 border border-blue-200"><h3 class="font-bold text-blue-900 mb-3">📌 Instruções de Uso</h3> <ul class="text-sm text-blue-800 space-y-2 list-disc list-inside"><li>Ajuste a Dose Total Semanal (DTS) conforme orientação médica</li> <li>Os pictogramas indicam a fração do comprimido a tomar cada dia</li> <li>Marque a data da próxima consulta para facilitar o acompanhamento</li> <li>Use o botão "Imprimir" no calendário para ter uma cópia física</li> <li>Mantenha o calendário em local visível para não esquecer de tomar a medicação</li></ul></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
