import { W as store_get, Z as attr, Y as unsubscribe_stores, _ as bind_props, $ as ensure_array_like, U as attr_class, V as stringify, a0 as head } from "../../chunks/index2.js";
import { p as perfilStore, m as modoStore } from "../../chunks/consultas.js";
import { d as distribuirDTSemana, a as decidirConduta } from "../../chunks/CalendarioDoses.svelte_svelte_type_style_lang.js";
import { e as escape_html } from "../../chunks/context.js";
function FormINR($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let onSubmit = $$props["onSubmit"];
    let inr = 2.5;
    let sangramento = "nenhum";
    let dtsAtual = void 0;
    let alteracaoIsolada = false;
    let risco = {};
    let perfil = store_get($$store_subs ??= {}, "$perfilStore", perfilStore);
    perfil = store_get($$store_subs ??= {}, "$perfilStore", perfilStore);
    $$renderer2.push(`<div class="card"><h2 class="text-2xl font-bold text-gray-800 mb-6">Cálculo de Conduta INR</h2> <form class="space-y-6"><div class="bg-blue-50 p-4 rounded-lg"><h3 class="font-semibold text-blue-900 mb-3">Alvo Terapêutico</h3> <div class="grid grid-cols-2 gap-4"><div><label for="alvoMin" class="label">INR Mínimo</label> <input id="alvoMin" type="number" step="0.1"${attr("value", perfil.alvoMin)} class="input" required/></div> <div><label for="alvoMax" class="label">INR Máximo</label> <input id="alvoMax" type="number" step="0.1"${attr("value", perfil.alvoMax)} class="input" required/></div></div></div> <div><label for="inr" class="label">INR Atual *</label> <input id="inr" type="number" step="0.1"${attr("value", inr)} class="input text-2xl font-bold" required placeholder="2.5"/></div> <div><label class="label">Presença de Sangramento</label> <div class="space-y-2"><label class="flex items-center"><input type="radio"${attr("checked", sangramento === "nenhum", true)} value="nenhum" class="w-4 h-4 text-primary-600"/> <span class="ml-2">Nenhum</span></label> <label class="flex items-center"><input type="radio"${attr("checked", sangramento === "menor", true)} value="menor" class="w-4 h-4 text-primary-600"/> <span class="ml-2">Sangramento Menor</span></label> <label class="flex items-center"><input type="radio"${attr("checked", sangramento === "risco_morte", true)} value="risco_morte" class="w-4 h-4 text-primary-600"/> <span class="ml-2 text-red-600 font-semibold">Sangramento com Risco de Morte</span></label></div></div> <div><label class="label">Fatores de Risco para Sangramento</label> <div class="space-y-2 bg-yellow-50 p-4 rounded-lg"><label class="flex items-center"><input type="checkbox"${attr("checked", risco.idade65, true)} class="w-4 h-4 text-primary-600"/> <span class="ml-2">Idade > 65 anos</span></label> <label class="flex items-center"><input type="checkbox"${attr("checked", risco.antiagregante, true)} class="w-4 h-4 text-primary-600"/> <span class="ml-2">Uso de antiagregantes (AAS, clopidogrel)</span></label> <label class="flex items-center"><input type="checkbox"${attr("checked", risco.sangPrevio, true)} class="w-4 h-4 text-primary-600"/> <span class="ml-2">História de sangramento</span></label> <label class="flex items-center"><input type="checkbox"${attr("checked", risco.hasNaoControlada, true)} class="w-4 h-4 text-primary-600"/> <span class="ml-2">HAS não controlada</span></label> <label class="flex items-center"><input type="checkbox"${attr("checked", risco.doencaHepatica, true)} class="w-4 h-4 text-primary-600"/> <span class="ml-2">Doença hepática</span></label> <label class="flex items-center"><input type="checkbox"${attr("checked", risco.quedas, true)} class="w-4 h-4 text-primary-600"/> <span class="ml-2">História de quedas</span></label> <label class="flex items-center"><input type="checkbox"${attr("checked", risco.outros, true)} class="w-4 h-4 text-primary-600"/> <span class="ml-2">Outros fatores de risco</span></label></div></div> <div><label for="dtsAtual" class="label">Dose Total Semanal Atual (mg/semana) <span class="text-sm text-gray-500">(Opcional, necessário para calcular ajuste)</span></label> <input id="dtsAtual" type="number" step="0.5"${attr("value", dtsAtual)} class="input" placeholder="35"/></div> <div><label for="mgComprimido" class="label">Dosagem do Comprimido (mg)</label> <input id="mgComprimido" type="number" step="0.5"${attr("value", perfil.mgComprimido)} class="input" required/></div> <div><label class="flex items-center cursor-pointer"><input type="checkbox"${attr("checked", alteracaoIsolada, true)} class="w-5 h-5 text-primary-600"/> <span class="ml-2 font-medium">Alteração isolada do INR após período estável? <span class="block text-sm text-gray-500">(Se sim, será recomendado repetir o exame sem alterar a dose)</span></span></label></div> <button type="submit" class="btn-primary w-full text-lg py-3">Calcular Conduta</button></form></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { onSubmit });
  });
}
function AjusteDTSCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let distribuicao;
    let ajuste = $$props["ajuste"];
    let dtsEscolhida = ajuste.sugestoes[1].dts;
    distribuicao = distribuirDTSemana(dtsEscolhida, store_get($$store_subs ??= {}, "$perfilStore", perfilStore).mgComprimido);
    $$renderer2.push(`<div class="card bg-indigo-50 border-2 border-indigo-300"><h3 class="font-bold text-indigo-900 mb-4 text-lg">📊 Ajuste de Dose Total Semanal (DTS)</h3> <div class="space-y-4"><div class="bg-white p-4 rounded-lg"><p class="text-sm text-gray-600 mb-2">Ajustar entre <strong class="text-indigo-700">${escape_html(ajuste.faixa[0] > 0 ? "+" : "")}${escape_html(ajuste.faixa[0])}%</strong> e <strong class="text-indigo-700">${escape_html(ajuste.faixa[1] > 0 ? "+" : "")}${escape_html(ajuste.faixa[1])}%</strong></p> <div class="grid grid-cols-3 gap-3 mt-4"><!--[-->`);
    const each_array = ensure_array_like(ajuste.sugestoes);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let sugestao = each_array[i];
      $$renderer2.push(`<button type="button"${attr_class(`p-3 rounded-lg border-2 transition-all ${stringify(dtsEscolhida === sugestao.dts ? "border-indigo-600 bg-indigo-100" : "border-gray-300 hover:border-indigo-400")}`)}><div class="text-xs text-gray-600">${escape_html(i === 0 ? "Mínimo" : i === 1 ? "Médio" : "Máximo")}</div> <div class="text-sm font-semibold text-indigo-700">${escape_html(sugestao.percent > 0 ? "+" : "")}${escape_html(sugestao.percent)}%</div> <div class="text-lg font-bold text-gray-800">${escape_html(sugestao.dts)} mg</div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white p-4 rounded-lg"><label for="dtsCustom" class="label">Ou escolha uma DTS personalizada:</label> <input id="dtsCustom" type="number" step="0.5"${attr("value", dtsEscolhida)} class="input" min="1" max="100"/></div> <div class="bg-white p-4 rounded-lg"><h4 class="font-semibold text-gray-700 mb-3">Distribuição Semanal (${escape_html(distribuicao.total.toFixed(1))} mg/semana)</h4> <div class="grid grid-cols-7 gap-2 text-center text-sm"><!--[-->`);
    const each_array_1 = ensure_array_like(distribuicao.dias);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let dia = each_array_1[$$index_1];
      $$renderer2.push(`<div class="p-2 bg-indigo-100 rounded"><div class="font-semibold text-xs text-indigo-900">${escape_html(dia.label.slice(0, 3))}</div> <div class="text-lg font-bold text-indigo-700">${escape_html(dia.fracao)}</div> <div class="text-xs text-gray-600">${escape_html(dia.mg)} mg</div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <button type="button" class="btn-secondary w-full">${escape_html("▼ Ver")} Calendário Mensal</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { ajuste });
  });
}
function ResultadoConduta($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let modoProfissional;
    let resultado = $$props["resultado"];
    modoProfissional = store_get($$store_subs ??= {}, "$modoStore", modoStore) === "profissional";
    $$renderer2.push(`<div class="space-y-4">`);
    if (resultado.alertaConfirmacao) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="alert-info"><div class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg> <div><h3 class="font-bold text-lg mb-2">Repetir Exame</h3> <p>${escape_html(resultado.conduta)}</p></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (resultado.emergencia) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="alert-danger animate-pulse"><div class="flex items-start"><svg class="w-8 h-8 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> <div><h3 class="font-bold text-2xl mb-2">EMERGÊNCIA</h3> <p class="text-lg">${escape_html(resultado.conduta)}</p></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (!resultado.alertaConfirmacao && !resultado.emergencia) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-green-50 border-2 border-green-200"><div class="flex items-start"><svg class="w-8 h-8 mr-3 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <div class="flex-1"><h3 class="font-bold text-xl text-green-900 mb-2">Conduta</h3> <p class="text-lg font-semibold text-green-800">${escape_html(resultado.conduta)}</p></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (resultado.suspenderDoses && resultado.suspenderDoses > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-orange-50 border border-orange-200"><h3 class="font-bold text-orange-900 mb-2">⏸️ Suspender Doses</h3> <p class="text-orange-800">Omitir <strong>${escape_html(resultado.suspenderDoses)}</strong> ${escape_html(resultado.suspenderDoses === 1 ? "dose" : "doses")} de varfarina.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (resultado.ajusteDTS) {
      $$renderer2.push("<!--[-->");
      AjusteDTSCard($$renderer2, { ajuste: resultado.ajusteDTS });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (resultado.vitaminaK) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-purple-50 border border-purple-200"><h3 class="font-bold text-purple-900 mb-3 text-lg">💊 Vitamina K</h3> <div class="space-y-2"><p class="text-purple-800"><strong>Via:</strong> ${escape_html(resultado.vitaminaK.via === "VO" ? "Oral (VO)" : "Endovenosa (EV - lenta, 30 min)")}</p> <p class="text-purple-800"><strong>Dose:</strong> ${escape_html(resultado.vitaminaK.doseMg)} mg</p> `);
      if (resultado.vitaminaK.observacao) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-3 p-3 bg-purple-100 rounded"><p class="text-sm text-purple-900">${escape_html(resultado.vitaminaK.observacao)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (modoProfissional) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded"><p class="text-sm font-semibold text-yellow-900">⚠️ Observações de Segurança:</p> <ul class="text-sm text-yellow-800 list-disc list-inside mt-2 space-y-1"><li>Preferir via oral sempre que possível</li> <li>Via EV pode causar anafilaxia - usar com cautela</li> <li>Para doses menores: diluir ampola 10 mg/ml em 9 ml de água (10 ml = 10 mg, 1 ml = 1 mg)</li></ul></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="card bg-blue-50 border border-blue-200"><h3 class="font-bold text-blue-900 mb-2">📅 Prazo de Reavaliação</h3> <p class="text-blue-800 text-lg font-semibold">${escape_html(resultado.followup)}</p></div> `);
    if (modoProfissional) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-gray-50 border border-gray-300"><h3 class="font-bold text-gray-700 mb-2">📋 Justificativa Clínica</h3> <p class="text-gray-600 text-sm">${escape_html(resultado.justificativa)}</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { resultado });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let resultado = null;
    function handleSubmit(entrada) {
      resultado = decidirConduta(entrada);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>INR Helper - Calculadora de Ajuste de Varfarina</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-8"><div class="text-center"><h1 class="text-4xl font-bold text-gray-900 mb-2">Calculadora de Ajuste de Varfarina</h1> <p class="text-gray-600">Calcule a conduta adequada baseada no valor do INR e fatores de risco</p></div> `);
    FormINR($$renderer2, { onSubmit: handleSubmit });
    $$renderer2.push(`<!----> `);
    if (resultado) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><hr class="border-t-2 border-gray-300"/> <div class="flex items-center justify-between"><h2 class="text-3xl font-bold text-gray-900">Resultado da Avaliação</h2> <button class="btn-secondary">🔄 Nova Consulta</button></div> `);
      ResultadoConduta($$renderer2, { resultado });
      $$renderer2.push(`<!----> <div class="flex gap-4"><button class="btn-primary flex-1">💾 Salvar Plano</button> <a href="/historico" class="btn-secondary flex-1 text-center">📋 Ver Histórico</a></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
