<script lang="ts">
	import { consultasStore } from '$lib/stores/consultas';
	import { jsPDF } from 'jspdf';
	import autoTable from 'jspdf-autotable';

	$: consultas = $consultasStore;

	function formatarData(data: Date): string {
		return new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(data);
	}

	function contarFatoresRisco(risco: any): number {
		return Object.values(risco).filter(Boolean).length;
	}

	function exportarCSV() {
		const headers = [
			'Data',
			'INR',
			'Sangramento',
			'Fatores de Risco',
			'DTS Antes',
			'DTS Depois',
			'Conduta',
			'Follow-up',
			'Usuário'
		];

		const rows = consultas.map((c) => [
			formatarData(c.data),
			c.entrada.inr,
			c.entrada.sangramento,
			contarFatoresRisco(c.entrada.risco),
			c.entrada.dtsAtual || '-',
			c.resultado.ajusteDTS?.sugestoes[1]?.dts || '-',
			c.resultado.conduta,
			c.resultado.followup,
			c.usuario
		]);

		const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');

		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = `inr_historico_${new Date().toISOString().split('T')[0]}.csv`;
		link.click();
	}

	function exportarPDF() {
		const doc = new jsPDF();

		// Cabeçalho
		doc.setFontSize(18);
		doc.text('INR Helper - Histórico de Consultas', 14, 20);

		doc.setFontSize(10);
		doc.text(`Data de Exportação: ${formatarData(new Date())}`, 14, 28);

		// Tabela
		const tableData = consultas.map((c) => [
			formatarData(c.data),
			c.entrada.inr.toString(),
			c.entrada.sangramento,
			contarFatoresRisco(c.entrada.risco).toString(),
			c.entrada.dtsAtual?.toString() || '-',
			c.resultado.ajusteDTS?.sugestoes[1]?.dts.toString() || '-',
			c.resultado.conduta.substring(0, 40) + '...',
			c.resultado.followup
		]);

		autoTable(doc, {
			head: [
				[
					'Data',
					'INR',
					'Sangr.',
					'Riscos',
					'DTS Antes',
					'DTS Depois',
					'Conduta',
					'Follow-up'
				]
			],
			body: tableData,
			startY: 35,
			styles: { fontSize: 8 },
			headStyles: { fillColor: [37, 99, 235] }
		});

		doc.save(`inr_historico_${new Date().toISOString().split('T')[0]}.pdf`);
	}

	function removerConsulta(id: string) {
		if (confirm('Tem certeza que deseja remover esta consulta do histórico?')) {
			consultasStore.remover(id);
		}
	}

	function limparHistorico() {
		if (
			confirm(
				'Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.'
			)
		) {
			consultasStore.limpar();
		}
	}
</script>

<svelte:head>
	<title>Histórico de Consultas - INR Helper</title>
</svelte:head>

<div class="space-y-6">
	<!-- Cabeçalho -->
	<div>
		<h1 class="text-3xl font-bold text-gray-900 mb-2">Histórico de Consultas</h1>
		<p class="text-gray-600">Visualize e exporte seus registros de ajuste de INR</p>
	</div>

	<!-- Ações -->
	{#if consultas.length > 0}
		<div class="flex flex-wrap gap-3">
			<button on:click={exportarCSV} class="btn-primary">📊 Exportar CSV</button>
			<button on:click={exportarPDF} class="btn-primary">📄 Exportar PDF</button>
			<button on:click={limparHistorico} class="btn-danger ml-auto">🗑️ Limpar Histórico</button>
		</div>
	{/if}

	<!-- Tabela de Histórico -->
	{#if consultas.length === 0}
		<div class="card text-center py-12">
			<svg
				class="w-16 h-16 mx-auto text-gray-400 mb-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
			<h3 class="text-xl font-semibold text-gray-700 mb-2">Nenhuma consulta registrada</h3>
			<p class="text-gray-500 mb-4">
				Comece calculando uma conduta na página inicial e salve o plano.
			</p>
			<a href="/" class="btn-primary">Ir para Calculadora</a>
		</div>
	{:else}
		<div class="space-y-4">
			{#each consultas as consulta (consulta.id)}
				<div class="card hover:shadow-lg transition-shadow">
					<div class="flex items-start justify-between mb-4">
						<div>
							<div class="flex items-center gap-3 mb-2">
								<span class="text-2xl font-bold text-primary-600">
									INR: {consulta.entrada.inr}
								</span>
								{#if consulta.resultado.emergencia}
									<span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
										EMERGÊNCIA
									</span>
								{/if}
								{#if consulta.entrada.sangramento !== 'nenhum'}
									<span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">
										{consulta.entrada.sangramento === 'risco_morte'
											? 'Sangramento Grave'
											: 'Sangramento Menor'}
									</span>
								{/if}
							</div>
							<p class="text-sm text-gray-500">
								{formatarData(consulta.data)} • {consulta.usuario === 'profissional'
									? '👨‍⚕️ Profissional'
									: '👤 Paciente'}
							</p>
						</div>
						<button
							on:click={() => removerConsulta(consulta.id)}
							class="text-red-600 hover:text-red-800"
							title="Remover"
						>
							<svg
								class="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<!-- Dados da Entrada -->
						<div>
							<h4 class="font-semibold text-gray-700 mb-2">Dados da Consulta</h4>
							<ul class="text-sm space-y-1 text-gray-600">
								<li>
									<strong>Alvo:</strong>
									{consulta.entrada.alvoMin} - {consulta.entrada.alvoMax}
								</li>
								<li>
									<strong>Fatores de Risco:</strong>
									{contarFatoresRisco(consulta.entrada.risco) || 'Nenhum'}
								</li>
								{#if consulta.entrada.dtsAtual}
									<li><strong>DTS Atual:</strong> {consulta.entrada.dtsAtual} mg/semana</li>
								{/if}
								{#if consulta.entrada.alteracaoIsolada}
									<li class="text-blue-600">⚠️ Alteração isolada marcada</li>
								{/if}
							</ul>
						</div>

						<!-- Resultado -->
						<div>
							<h4 class="font-semibold text-gray-700 mb-2">Conduta</h4>
							<p class="text-sm text-gray-800 font-medium mb-2">{consulta.resultado.conduta}</p>
							{#if consulta.resultado.ajusteDTS}
								<p class="text-sm text-gray-600">
									<strong>DTS Sugerida:</strong>
									{consulta.resultado.ajusteDTS.sugestoes[1].dts} mg/semana
									({consulta.resultado.ajusteDTS.sugestoes[1].percent > 0 ? '+' : ''}{consulta
										.resultado.ajusteDTS.sugestoes[1].percent}%)
								</p>
							{/if}
							<p class="text-sm text-gray-600">
								<strong>Retorno:</strong>
								{consulta.resultado.followup}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
