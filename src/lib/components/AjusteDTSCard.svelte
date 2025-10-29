<script lang="ts">
	import type { AjusteDTS } from '$lib/protocol/inr';
	import { distribuirDTSemana } from '$lib/protocol/inr';
	import { perfilStore } from '$lib/stores/consultas';
	import CalendarioDoses from './CalendarioDoses.svelte';

	export let ajuste: AjusteDTS;

	let dtsEscolhida: number = ajuste.sugestoes[1].dts; // Sugestão média como padrão
	let mostrarCalendario = false;

	$: distribuicao = distribuirDTSemana(dtsEscolhida, $perfilStore.mgComprimido);
</script>

<div class="card bg-indigo-50 border-2 border-indigo-300">
	<h3 class="font-bold text-indigo-900 mb-4 text-lg">📊 Ajuste de Dose Total Semanal (DTS)</h3>

	<div class="space-y-4">
		<!-- Faixa de Ajuste -->
		<div class="bg-white p-4 rounded-lg">
			<p class="text-sm text-gray-600 mb-2">
				Ajustar entre
				<strong class="text-indigo-700">{ajuste.faixa[0] > 0 ? '+' : ''}{ajuste.faixa[0]}%</strong>
				e
				<strong class="text-indigo-700">{ajuste.faixa[1] > 0 ? '+' : ''}{ajuste.faixa[1]}%</strong>
			</p>

			<!-- Sugestões -->
			<div class="grid grid-cols-3 gap-3 mt-4">
				{#each ajuste.sugestoes as sugestao, i}
					<button
						type="button"
						class="p-3 rounded-lg border-2 transition-all {dtsEscolhida === sugestao.dts
							? 'border-indigo-600 bg-indigo-100'
							: 'border-gray-300 hover:border-indigo-400'}"
						on:click={() => (dtsEscolhida = sugestao.dts)}
					>
						<div class="text-xs text-gray-600">
							{i === 0 ? 'Mínimo' : i === 1 ? 'Médio' : 'Máximo'}
						</div>
						<div class="text-sm font-semibold text-indigo-700">
							{sugestao.percent > 0 ? '+' : ''}{sugestao.percent}%
						</div>
						<div class="text-lg font-bold text-gray-800">{sugestao.dts} mg</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- DTS Escolhida -->
		<div class="bg-white p-4 rounded-lg">
			<label for="dtsCustom" class="label">Ou escolha uma DTS personalizada:</label>
			<input
				id="dtsCustom"
				type="number"
				step="0.5"
				bind:value={dtsEscolhida}
				class="input"
				min="1"
				max="100"
			/>
		</div>

		<!-- Distribuição Semanal -->
		<div class="bg-white p-4 rounded-lg">
			<h4 class="font-semibold text-gray-700 mb-3">
				Distribuição Semanal ({distribuicao.total.toFixed(1)} mg/semana)
			</h4>
			<div class="grid grid-cols-7 gap-2 text-center text-sm">
				{#each distribuicao.dias as dia}
					<div class="p-2 bg-indigo-100 rounded">
						<div class="font-semibold text-xs text-indigo-900">{dia.label.slice(0, 3)}</div>
						<div class="text-lg font-bold text-indigo-700">{dia.fracao}</div>
						<div class="text-xs text-gray-600">{dia.mg} mg</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Botão para mostrar calendário -->
		<button
			type="button"
			class="btn-secondary w-full"
			on:click={() => (mostrarCalendario = !mostrarCalendario)}
		>
			{mostrarCalendario ? '▲ Ocultar' : '▼ Ver'} Calendário Mensal
		</button>

		{#if mostrarCalendario}
			<CalendarioDoses {distribuicao} />
		{/if}
	</div>
</div>
