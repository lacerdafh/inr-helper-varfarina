<script lang="ts">
	import '../app.css';
	import { modoStore } from '$lib/stores/consultas';
	import { page } from '$app/stores';

	let menuAberto = false;

	function toggleMenu() {
		menuAberto = !menuAberto;
	}

	function fecharMenu() {
		menuAberto = false;
	}
</script>

<div class="min-h-screen flex flex-col">
	<!-- Banner de Aviso Legal -->
	<div class="bg-yellow-100 border-b-2 border-yellow-300 py-2 px-4 text-center">
		<p class="text-sm text-yellow-900">
			⚠️ <strong>Conteúdo Educacional</strong> - Sempre confirme com seu médico. Em urgência,
			procure um serviço de emergência.
		</p>
	</div>

	<!-- Header -->
	<header class="bg-primary-600 text-white shadow-lg">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<!-- Logo -->
				<a href="/" class="flex items-center gap-2">
					<svg
						class="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
						/>
					</svg>
					<span class="text-2xl font-bold">INR Helper</span>
				</a>

				<!-- Menu Desktop -->
				<nav class="hidden md:flex items-center gap-6">
					<a
						href="/"
						class="hover:text-primary-100 transition-colors {$page.url.pathname === '/'
							? 'font-bold border-b-2 border-white'
							: ''}"
					>
						Calculadora
					</a>
					<a
						href="/historico"
						class="hover:text-primary-100 transition-colors {$page.url.pathname === '/historico'
							? 'font-bold border-b-2 border-white'
							: ''}"
					>
						Histórico
					</a>
					<a
						href="/calendario"
						class="hover:text-primary-100 transition-colors {$page.url.pathname === '/calendario'
							? 'font-bold border-b-2 border-white'
							: ''}"
					>
						Calendário
					</a>
					<a
						href="/referencias"
						class="hover:text-primary-100 transition-colors {$page.url.pathname === '/referencias'
							? 'font-bold border-b-2 border-white'
							: ''}"
					>
						Referências
					</a>

					<!-- Toggle Modo -->
					<button
						on:click={() => modoStore.toggle()}
						class="px-3 py-1 bg-white text-primary-600 rounded-full text-sm font-semibold hover:bg-primary-50 transition-colors"
					>
						{$modoStore === 'paciente' ? '👤 Paciente' : '👨‍⚕️ Profissional'}
					</button>
				</nav>

				<!-- Botão Menu Mobile -->
				<button on:click={toggleMenu} class="md:hidden">
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>

			<!-- Menu Mobile -->
			{#if menuAberto}
				<div class="md:hidden mt-4 pb-4 space-y-2">
					<a
						href="/"
						on:click={fecharMenu}
						class="block py-2 px-4 hover:bg-primary-700 rounded {$page.url.pathname === '/'
							? 'bg-primary-700 font-bold'
							: ''}"
					>
						Calculadora
					</a>
					<a
						href="/historico"
						on:click={fecharMenu}
						class="block py-2 px-4 hover:bg-primary-700 rounded {$page.url.pathname ===
						'/historico'
							? 'bg-primary-700 font-bold'
							: ''}"
					>
						Histórico
					</a>
					<a
						href="/calendario"
						on:click={fecharMenu}
						class="block py-2 px-4 hover:bg-primary-700 rounded {$page.url.pathname ===
						'/calendario'
							? 'bg-primary-700 font-bold'
							: ''}"
					>
						Calendário
					</a>
					<a
						href="/referencias"
						on:click={fecharMenu}
						class="block py-2 px-4 hover:bg-primary-700 rounded {$page.url.pathname ===
						'/referencias'
							? 'bg-primary-700 font-bold'
							: ''}"
					>
						Referências
					</a>
					<button
						on:click={() => {
							modoStore.toggle();
							fecharMenu();
						}}
						class="w-full text-left py-2 px-4 hover:bg-primary-700 rounded"
					>
						Modo: {$modoStore === 'paciente' ? '👤 Paciente' : '👨‍⚕️ Profissional'}
					</button>
				</div>
			{/if}
		</div>
	</header>

	<!-- Conteúdo -->
	<main class="flex-1 container mx-auto px-4 py-8 max-w-6xl">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="bg-gray-800 text-gray-300 py-6 mt-auto">
		<div class="container mx-auto px-4 text-center">
			<p class="text-sm">
				© 2024 INR Helper - Ferramenta educacional para ajuste de dose de Varfarina
			</p>
			<p class="text-xs mt-2 text-gray-400">
				Versão do Protocolo: {import.meta.env.VITE_PROTOCOL_VERSION || '1.0.0'}
			</p>
			<p class="text-sm mt-3 text-blue-300">
				💡 Idealizado por <strong>Dra. Carla Pires Oliveira</strong>
			</p>
			<p class="text-xs mt-1 text-gray-400">
				Criado por <strong>Fábio Lacerda</strong> e <strong>Geyson Florencio</strong>
			</p>
			<p class="text-xs mt-2 text-yellow-400">
				⚠️ Esta ferramenta não substitui avaliação médica profissional
			</p>
		</div>
	</footer>
</div>
