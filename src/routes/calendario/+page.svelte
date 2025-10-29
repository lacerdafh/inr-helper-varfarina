<script lang="ts">
	import CalendarioDoses from '$lib/components/CalendarioDoses.svelte';
	import { distribuirDTSemana } from '$lib/protocol/inr';
	import { perfilStore } from '$lib/stores/consultas';

	let dts: number = 35;
	let dataConsulta: string = '';

	$: distribuicao = distribuirDTSemana(dts, $perfilStore.mgComprimido);
	$: dataConsultaParsed = dataConsulta ? new Date(dataConsulta + 'T00:00:00') : undefined;
</script>

<svelte:head>
	<title>Calendário de Doses - INR Helper</title>
</svelte:head>

<div class="space-y-6">
	<!-- Cabeçalho -->
	<div>
		<h1 class="text-3xl font-bold text-gray-900 mb-2">Calendário de Doses</h1>
		<p class="text-gray-600">
			Visualize e imprima o calendário mensal de doses de varfarina
		</p>
	</div>

	<!-- Configurações -->
	<div class="card">
		<h2 class="text-xl font-bold text-gray-800 mb-4">Configurações</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div>
				<label for="dts" class="label">Dose Total Semanal (mg/semana)</label>
				<input id="dts" type="number" step="0.5" bind:value={dts} class="input" min="1" max="100" />
			</div>
			<div>
				<label for="mgComprimido" class="label">Dosagem do Comprimido (mg)</label>
				<input
					id="mgComprimido"
					type="number"
					step="0.5"
					bind:value={$perfilStore.mgComprimido}
					class="input"
					min="1"
					max="10"
				/>
			</div>
			<div>
				<label for="dataConsulta" class="label">Data da Próxima Consulta (opcional)</label>
				<input id="dataConsulta" type="date" bind:value={dataConsulta} class="input" />
			</div>
		</div>
	</div>

	<!-- Calendário -->
	<CalendarioDoses {distribuicao} dataConsulta={dataConsultaParsed} />

	<!-- Instruções -->
	<div class="card bg-blue-50 border border-blue-200">
		<h3 class="font-bold text-blue-900 mb-3">📌 Instruções de Uso</h3>
		<ul class="text-sm text-blue-800 space-y-2 list-disc list-inside">
			<li>Ajuste a Dose Total Semanal (DTS) conforme orientação médica</li>
			<li>Os pictogramas indicam a fração do comprimido a tomar cada dia</li>
			<li>Marque a data da próxima consulta para facilitar o acompanhamento</li>
			<li>Use o botão "Imprimir" no calendário para ter uma cópia física</li>
			<li>
				Mantenha o calendário em local visível para não esquecer de tomar a medicação
			</li>
		</ul>
	</div>
</div>
