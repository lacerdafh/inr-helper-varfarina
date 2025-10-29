<script lang="ts">
	import type { Resultado } from '$lib/protocol/inr';
	import { modoStore } from '$lib/stores/consultas';
	import AjusteDTSCard from './AjusteDTSCard.svelte';

	export let resultado: Resultado;

	$: modoProfissional = $modoStore === 'profissional';
</script>

<div class="space-y-4">
	<!-- Alerta de Confirmação -->
	{#if resultado.alertaConfirmacao}
		<div class="alert-info">
			<div class="flex items-start">
				<svg
					class="w-6 h-6 mr-3 flex-shrink-0"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/>
				</svg>
				<div>
					<h3 class="font-bold text-lg mb-2">Repetir Exame</h3>
					<p>{resultado.conduta}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Alerta de Emergência -->
	{#if resultado.emergencia}
		<div class="alert-danger animate-pulse">
			<div class="flex items-start">
				<svg
					class="w-8 h-8 mr-3 flex-shrink-0"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
						clip-rule="evenodd"
					/>
				</svg>
				<div>
					<h3 class="font-bold text-2xl mb-2">EMERGÊNCIA</h3>
					<p class="text-lg">{resultado.conduta}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Conduta Principal -->
	{#if !resultado.alertaConfirmacao && !resultado.emergencia}
		<div class="card bg-green-50 border-2 border-green-200">
			<div class="flex items-start">
				<svg
					class="w-8 h-8 mr-3 flex-shrink-0 text-green-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div class="flex-1">
					<h3 class="font-bold text-xl text-green-900 mb-2">Conduta</h3>
					<p class="text-lg font-semibold text-green-800">{resultado.conduta}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Suspender Doses -->
	{#if resultado.suspenderDoses && resultado.suspenderDoses > 0}
		<div class="card bg-orange-50 border border-orange-200">
			<h3 class="font-bold text-orange-900 mb-2">⏸️ Suspender Doses</h3>
			<p class="text-orange-800">
				Omitir <strong>{resultado.suspenderDoses}</strong>
				{resultado.suspenderDoses === 1 ? 'dose' : 'doses'} de varfarina.
			</p>
		</div>
	{/if}

	<!-- Ajuste de DTS -->
	{#if resultado.ajusteDTS}
		<AjusteDTSCard ajuste={resultado.ajusteDTS} />
	{/if}

	<!-- Vitamina K -->
	{#if resultado.vitaminaK}
		<div class="card bg-purple-50 border border-purple-200">
			<h3 class="font-bold text-purple-900 mb-3 text-lg">💊 Vitamina K</h3>
			<div class="space-y-2">
				<p class="text-purple-800">
					<strong>Via:</strong>
					{resultado.vitaminaK.via === 'VO' ? 'Oral (VO)' : 'Endovenosa (EV - lenta, 30 min)'}
				</p>
				<p class="text-purple-800">
					<strong>Dose:</strong>
					{resultado.vitaminaK.doseMg} mg
				</p>
				{#if resultado.vitaminaK.observacao}
					<div class="mt-3 p-3 bg-purple-100 rounded">
						<p class="text-sm text-purple-900">{resultado.vitaminaK.observacao}</p>
					</div>
				{/if}
				{#if modoProfissional}
					<div class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
						<p class="text-sm font-semibold text-yellow-900">⚠️ Observações de Segurança:</p>
						<ul class="text-sm text-yellow-800 list-disc list-inside mt-2 space-y-1">
							<li>Preferir via oral sempre que possível</li>
							<li>Via EV pode causar anafilaxia - usar com cautela</li>
							<li>
								Para doses menores: diluir ampola 10 mg/ml em 9 ml de água (10 ml = 10 mg, 1 ml = 1 mg)
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Follow-up -->
	<div class="card bg-blue-50 border border-blue-200">
		<h3 class="font-bold text-blue-900 mb-2">📅 Prazo de Reavaliação</h3>
		<p class="text-blue-800 text-lg font-semibold">{resultado.followup}</p>
	</div>

	<!-- Justificativa (Modo Profissional) -->
	{#if modoProfissional}
		<div class="card bg-gray-50 border border-gray-300">
			<h3 class="font-bold text-gray-700 mb-2">📋 Justificativa Clínica</h3>
			<p class="text-gray-600 text-sm">{resultado.justificativa}</p>
		</div>
	{/if}
</div>
