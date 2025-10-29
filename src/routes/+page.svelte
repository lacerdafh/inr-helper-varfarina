<script lang="ts">
	import FormINR from '$lib/components/FormINR.svelte';
	import ResultadoConduta from '$lib/components/ResultadoConduta.svelte';
	import { decidirConduta } from '$lib/protocol/inr';
	import { consultasStore, modoStore } from '$lib/stores/consultas';
	import type { Entrada, Resultado } from '$lib/protocol/inr';

	let resultado: Resultado | null = null;
	let entradaAtual: Entrada | null = null;
	let mostrarSucesso = false;

	function handleSubmit(entrada: Entrada) {
		entradaAtual = entrada;
		resultado = decidirConduta(entrada);
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	}

	function salvarPlano() {
		if (!resultado || !entradaAtual) return;

		consultasStore.adicionar({
			entrada: entradaAtual,
			resultado,
			usuario: $modoStore,
			versaoProtocolo: import.meta.env.VITE_PROTOCOL_VERSION || '1.0.0'
		});

		mostrarSucesso = true;
		setTimeout(() => {
			mostrarSucesso = false;
		}, 3000);
	}

	function novaConsulta() {
		resultado = null;
		entradaAtual = null;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>INR Helper - Calculadora de Ajuste de Varfarina</title>
</svelte:head>

<div class="space-y-8">
	<!-- Título -->
	<div class="text-center">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">
			Calculadora de Ajuste de Varfarina
		</h1>
		<p class="text-gray-600">
			Calcule a conduta adequada baseada no valor do INR e fatores de risco
		</p>
	</div>

	<!-- Formulário -->
	<FormINR onSubmit={handleSubmit} />

	<!-- Resultado -->
	{#if resultado}
		<div class="space-y-6">
			<hr class="border-t-2 border-gray-300" />

			<div class="flex items-center justify-between">
				<h2 class="text-3xl font-bold text-gray-900">Resultado da Avaliação</h2>
				<button on:click={novaConsulta} class="btn-secondary">🔄 Nova Consulta</button>
			</div>

			<ResultadoConduta {resultado} />

			<!-- Ações -->
			<div class="flex gap-4">
				<button on:click={salvarPlano} class="btn-primary flex-1">💾 Salvar Plano</button>
				<a href="/historico" class="btn-secondary flex-1 text-center">📋 Ver Histórico</a>
			</div>

			<!-- Mensagem de Sucesso -->
			{#if mostrarSucesso}
				<div class="alert-success animate-pulse">
					✅ Plano salvo com sucesso!
				</div>
			{/if}
		</div>
	{/if}
</div>
