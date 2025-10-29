<script lang="ts">
	import { gerarCalendarioMensal } from '$lib/protocol/inr';

	export let distribuicao: ReturnType<typeof import('$lib/protocol/inr').distribuirDTSemana>;
	export let dataConsulta: Date | undefined = undefined;

	const hoje = new Date();
	const mesAtual = hoje.getMonth() + 1;
	const anoAtual = hoje.getFullYear();

	$: calendario = gerarCalendarioMensal(anoAtual, mesAtual, distribuicao.dias, dataConsulta);

	const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
	const meses = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro'
	];

	/**
	 * Renderiza pictograma SVG para representar fração de comprimido
	 */
	function renderizarPictograma(fracao: number): string {
		if (fracao === 0) return '';

		// Círculo base
		const circulo = `<circle cx="16" cy="16" r="14" fill="#60a5fa" stroke="#2563eb" stroke-width="2"/>`;

		if (fracao === 0.25) {
			// 1/4 - cruz com 1 quadrante
			return `<svg viewBox="0 0 32 32" class="w-8 h-8">
        ${circulo}
        <line x1="16" y1="2" x2="16" y2="30" stroke="white" stroke-width="2"/>
        <line x1="2" y1="16" x2="30" y2="16" stroke="white" stroke-width="2"/>
        <path d="M 16 16 L 16 2 A 14 14 0 0 1 30 16 Z" fill="white" opacity="0.7"/>
      </svg>`;
		} else if (fracao === 0.5) {
			// 1/2 - semicírculo
			return `<svg viewBox="0 0 32 32" class="w-8 h-8">
        ${circulo}
        <line x1="16" y1="2" x2="16" y2="30" stroke="white" stroke-width="2"/>
        <path d="M 16 2 A 14 14 0 0 1 16 30 Z" fill="white" opacity="0.7"/>
      </svg>`;
		} else if (fracao === 0.75) {
			// 3/4 - cruz com 3 quadrantes
			return `<svg viewBox="0 0 32 32" class="w-8 h-8">
        ${circulo}
        <line x1="16" y1="2" x2="16" y2="30" stroke="white" stroke-width="2"/>
        <line x1="2" y1="16" x2="30" y2="16" stroke="white" stroke-width="2"/>
        <path d="M 16 16 L 30 16 A 14 14 0 0 1 16 30 Z" fill="white" opacity="0.7"/>
      </svg>`;
		} else if (fracao === 1) {
			// 1 comprimido inteiro
			return `<svg viewBox="0 0 32 32" class="w-8 h-8">
        ${circulo}
      </svg>`;
		} else if (fracao === 1.25) {
			// 1 + 1/4
			return `<svg viewBox="0 0 32 32" class="w-10 h-8">
        <circle cx="10" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="22" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="22" y1="8" x2="22" y2="24" stroke="white" stroke-width="1.5"/>
        <line x1="14" y1="16" x2="30" y2="16" stroke="white" stroke-width="1.5"/>
        <path d="M 22 16 L 22 8 A 8 8 0 0 1 30 16 Z" fill="white" opacity="0.7"/>
      </svg>`;
		} else if (fracao === 1.5) {
			// 1 + 1/2
			return `<svg viewBox="0 0 32 32" class="w-10 h-8">
        <circle cx="10" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="22" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="22" y1="8" x2="22" y2="24" stroke="white" stroke-width="1.5"/>
        <path d="M 22 8 A 8 8 0 0 1 22 24 Z" fill="white" opacity="0.7"/>
      </svg>`;
		} else if (fracao === 1.75) {
			// 1 + 3/4
			return `<svg viewBox="0 0 32 32" class="w-10 h-8">
        <circle cx="10" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="22" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="22" y1="8" x2="22" y2="24" stroke="white" stroke-width="1.5"/>
        <line x1="14" y1="16" x2="30" y2="16" stroke="white" stroke-width="1.5"/>
        <path d="M 22 16 L 30 16 A 8 8 0 0 1 22 24 Z" fill="white" opacity="0.7"/>
      </svg>`;
		} else if (fracao === 2) {
			// 2 comprimidos
			return `<svg viewBox="0 0 32 32" class="w-10 h-8">
        <circle cx="10" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="22" cy="16" r="8" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
      </svg>`;
		} else if (fracao === 2.25) {
			// 2 + 1/4
			return `<svg viewBox="0 0 40 32" class="w-12 h-8">
        <circle cx="8" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="20" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="32" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="32" y1="10" x2="32" y2="22" stroke="white" stroke-width="1.5"/>
        <line x1="26" y1="16" x2="38" y2="16" stroke="white" stroke-width="1.5"/>
        <path d="M 32 16 L 32 10 A 6 6 0 0 1 38 16 Z" fill="white" opacity="0.7"/>
      </svg>`;
		} else if (fracao === 2.5) {
			// 2 + 1/2
			return `<svg viewBox="0 0 40 32" class="w-12 h-8">
        <circle cx="8" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="20" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <circle cx="32" cy="16" r="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
        <line x1="32" y1="10" x2="32" y2="22" stroke="white" stroke-width="1.5"/>
        <path d="M 32 10 A 6 6 0 0 1 32 22 Z" fill="white" opacity="0.7"/>
      </svg>`;
		}

		// Fallback para outras frações
		return `<svg viewBox="0 0 32 32" class="w-8 h-8">
      ${circulo}
      <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${fracao}</text>
    </svg>`;
	}
</script>

<div class="bg-white p-6 rounded-lg border-2 border-gray-300">
	<h3 class="text-center font-bold text-xl text-gray-800 mb-4">
		{meses[mesAtual - 1]} de {anoAtual}
	</h3>

	<!-- Cabeçalho dos dias da semana -->
	<div class="grid grid-cols-7 gap-2 mb-2">
		{#each diasSemana as dia}
			<div class="text-center font-semibold text-gray-600 text-sm">{dia}</div>
		{/each}
	</div>

	<!-- Calendário -->
	<div class="space-y-2">
		{#each calendario.semanas as semana}
			<div class="grid grid-cols-7 gap-2">
				{#each semana.dias as dia}
					<div
						class="aspect-square border rounded-lg flex flex-col items-center justify-center p-1 {dia.isConsulta
							? 'border-green-500 bg-green-50 border-2'
							: dia.dia
								? 'border-gray-300 bg-gray-50'
								: 'border-transparent'}"
					>
						{#if dia.dia}
							<div class="text-xs font-semibold text-gray-700 mb-1">{dia.dia}</div>
							<div class="flex items-center justify-center">
								{@html renderizarPictograma(dia.fracao)}
							</div>
							<div class="text-xs text-gray-500 mt-1">{dia.fracao}</div>
							{#if dia.isConsulta}
								<div class="text-xs text-green-600 font-bold mt-1">✓ Consulta</div>
							{/if}
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<!-- Legenda -->
	<div class="mt-6 p-4 bg-gray-50 rounded-lg">
		<h4 class="font-semibold text-sm text-gray-700 mb-3">Legenda:</h4>
		<div class="grid grid-cols-4 gap-3 text-xs">
			<div class="flex items-center gap-2">
				{@html renderizarPictograma(0.25)}
				<span>1/4</span>
			</div>
			<div class="flex items-center gap-2">
				{@html renderizarPictograma(0.5)}
				<span>1/2</span>
			</div>
			<div class="flex items-center gap-2">
				{@html renderizarPictograma(0.75)}
				<span>3/4</span>
			</div>
			<div class="flex items-center gap-2">
				{@html renderizarPictograma(1)}
				<span>1</span>
			</div>
			<div class="flex items-center gap-2">
				{@html renderizarPictograma(1.5)}
				<span>1 1/2</span>
			</div>
			<div class="flex items-center gap-2">
				{@html renderizarPictograma(2)}
				<span>2</span>
			</div>
		</div>
	</div>

	<!-- Botão de Impressão -->
	<button
		type="button"
		class="btn-secondary w-full mt-4"
		on:click={() => window.print()}
	>
		🖨️ Imprimir Calendário
	</button>
</div>

<style>
	@media print {
		button {
			display: none;
		}
	}
</style>
