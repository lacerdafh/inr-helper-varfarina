<script lang="ts">
	import type { Entrada, Risco } from '$lib/protocol/inr';
	import { perfilStore } from '$lib/stores/consultas';

	// Props
	export let onSubmit: (entrada: Entrada) => void;

	// State local do formulário
	let inr: number = 2.5;
	let sangramento: 'nenhum' | 'menor' | 'risco_morte' = 'nenhum';
	let dtsAtual: number | undefined = undefined;
	let alteracaoIsolada = false;

	// Fatores de risco
	let risco: Risco = {};

	// Perfil do paciente (alvo terapêutico e mg do comprimido)
	let perfil = $perfilStore;

	$: perfil = $perfilStore;

	function handleSubmit() {
		if (!inr || inr <= 0) {
			alert('Por favor, insira um valor válido de INR');
			return;
		}

		const entrada: Entrada = {
			alvoMin: perfil.alvoMin,
			alvoMax: perfil.alvoMax,
			inr,
			sangramento,
			risco,
			dtsAtual,
			mgComprimido: perfil.mgComprimido,
			alteracaoIsolada
		};

		onSubmit(entrada);
	}

	function formatarNumero(event: Event) {
		const input = event.target as HTMLInputElement;
		const valor = parseFloat(input.value);
		if (!isNaN(valor)) {
			input.value = valor.toFixed(1);
		}
	}
</script>

<div class="card">
	<h2 class="text-2xl font-bold text-gray-800 mb-6">Cálculo de Conduta INR</h2>

	<form on:submit|preventDefault={handleSubmit} class="space-y-6">
		<!-- Alvo Terapêutico -->
		<div class="bg-blue-50 p-4 rounded-lg">
			<h3 class="font-semibold text-blue-900 mb-3">Alvo Terapêutico</h3>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="alvoMin" class="label">INR Mínimo</label>
					<input
						id="alvoMin"
						type="number"
						step="0.1"
						bind:value={perfil.alvoMin}
						class="input"
						required
					/>
				</div>
				<div>
					<label for="alvoMax" class="label">INR Máximo</label>
					<input
						id="alvoMax"
						type="number"
						step="0.1"
						bind:value={perfil.alvoMax}
						class="input"
						required
					/>
				</div>
			</div>
		</div>

		<!-- INR Atual -->
		<div>
			<label for="inr" class="label">INR Atual *</label>
			<input
				id="inr"
				type="number"
				step="0.1"
				bind:value={inr}
				on:blur={formatarNumero}
				class="input text-2xl font-bold"
				required
				placeholder="2.5"
			/>
		</div>

		<!-- Sangramento -->
		<div>
			<label class="label">Presença de Sangramento</label>
			<div class="space-y-2">
				<label class="flex items-center">
					<input
						type="radio"
						bind:group={sangramento}
						value="nenhum"
						class="w-4 h-4 text-primary-600"
					/>
					<span class="ml-2">Nenhum</span>
				</label>
				<label class="flex items-center">
					<input
						type="radio"
						bind:group={sangramento}
						value="menor"
						class="w-4 h-4 text-primary-600"
					/>
					<span class="ml-2">Sangramento Menor</span>
				</label>
				<label class="flex items-center">
					<input
						type="radio"
						bind:group={sangramento}
						value="risco_morte"
						class="w-4 h-4 text-primary-600"
					/>
					<span class="ml-2 text-red-600 font-semibold">Sangramento com Risco de Morte</span>
				</label>
			</div>
		</div>

		<!-- Fatores de Risco -->
		<div>
			<label class="label">Fatores de Risco para Sangramento</label>
			<div class="space-y-2 bg-yellow-50 p-4 rounded-lg">
				<label class="flex items-center">
					<input type="checkbox" bind:checked={risco.idade65} class="w-4 h-4 text-primary-600" />
					<span class="ml-2">Idade {'>'} 65 anos</span>
				</label>
				<label class="flex items-center">
					<input
						type="checkbox"
						bind:checked={risco.antiagregante}
						class="w-4 h-4 text-primary-600"
					/>
					<span class="ml-2">Uso de antiagregantes (AAS, clopidogrel)</span>
				</label>
				<label class="flex items-center">
					<input type="checkbox" bind:checked={risco.sangPrevio} class="w-4 h-4 text-primary-600" />
					<span class="ml-2">História de sangramento</span>
				</label>
				<label class="flex items-center">
					<input
						type="checkbox"
						bind:checked={risco.hasNaoControlada}
						class="w-4 h-4 text-primary-600"
					/>
					<span class="ml-2">HAS não controlada</span>
				</label>
				<label class="flex items-center">
					<input
						type="checkbox"
						bind:checked={risco.doencaHepatica}
						class="w-4 h-4 text-primary-600"
					/>
					<span class="ml-2">Doença hepática</span>
				</label>
				<label class="flex items-center">
					<input type="checkbox" bind:checked={risco.quedas} class="w-4 h-4 text-primary-600" />
					<span class="ml-2">História de quedas</span>
				</label>
				<label class="flex items-center">
					<input type="checkbox" bind:checked={risco.outros} class="w-4 h-4 text-primary-600" />
					<span class="ml-2">Outros fatores de risco</span>
				</label>
			</div>
		</div>

		<!-- DTS Atual -->
		<div>
			<label for="dtsAtual" class="label">
				Dose Total Semanal Atual (mg/semana)
				<span class="text-sm text-gray-500">(Opcional, necessário para calcular ajuste)</span>
			</label>
			<input
				id="dtsAtual"
				type="number"
				step="0.5"
				bind:value={dtsAtual}
				class="input"
				placeholder="35"
			/>
		</div>

		<!-- Comprimido -->
		<div>
			<label for="mgComprimido" class="label">Dosagem do Comprimido (mg)</label>
			<input
				id="mgComprimido"
				type="number"
				step="0.5"
				bind:value={perfil.mgComprimido}
				class="input"
				required
			/>
		</div>

		<!-- Alteração Isolada -->
		<div>
			<label class="flex items-center cursor-pointer">
				<input type="checkbox" bind:checked={alteracaoIsolada} class="w-5 h-5 text-primary-600" />
				<span class="ml-2 font-medium">
					Alteração isolada do INR após período estável?
					<span class="block text-sm text-gray-500">
						(Se sim, será recomendado repetir o exame sem alterar a dose)
					</span>
				</span>
			</label>
		</div>

		<!-- Botão Submit -->
		<button type="submit" class="btn-primary w-full text-lg py-3">Calcular Conduta</button>
	</form>
</div>
