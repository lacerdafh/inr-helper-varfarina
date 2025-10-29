<svelte:head>
	<title>Referências e Fontes - INR Helper</title>
</svelte:head>

<div class="space-y-6">
	<!-- Cabeçalho -->
	<div>
		<h1 class="text-3xl font-bold text-gray-900 mb-2">Referências e Fontes</h1>
		<p class="text-gray-600">Bases científicas e avisos de segurança</p>
	</div>

	<!-- Avisos de Segurança -->
	<div class="alert-danger">
		<h2 class="font-bold text-xl text-red-900 mb-3">⚠️ Avisos Importantes</h2>
		<div class="space-y-2 text-red-800">
			<p class="font-semibold">Esta ferramenta é de caráter EDUCACIONAL apenas.</p>
			<ul class="list-disc list-inside space-y-1 ml-4">
				<li>NÃO substitui avaliação médica profissional</li>
				<li>NÃO deve ser usada para auto-medicação</li>
				<li>SEMPRE confirme as condutas com seu médico</li>
				<li>
					Em caso de sangramento importante ou INR muito elevado, procure IMEDIATAMENTE um serviço de
					emergência
				</li>
				<li>Alterações de dose devem ser feitas apenas sob supervisão médica</li>
			</ul>
		</div>
	</div>

	<!-- Referências Científicas -->
	<div class="card">
		<h2 class="font-bold text-xl text-gray-800 mb-4">📚 Referências Científicas</h2>
		<div class="space-y-4">
			<div class="border-l-4 border-primary-600 pl-4">
				<h3 class="font-semibold text-gray-800">UpToDate</h3>
				<p class="text-sm text-gray-600">
					Protocolos de manejo de anticoagulação oral com varfarina, incluindo ajustes de dose e
					reversão.
				</p>
				<p class="text-xs text-gray-500 mt-1">
					Referência: UpToDate - "Warfarin and other VKAs: Dosing and adverse effects"
				</p>
			</div>

			<div class="border-l-4 border-primary-600 pl-4">
				<h3 class="font-semibold text-gray-800">British Journal of Haematology</h3>
				<p class="text-sm text-gray-600">
					Guidelines on oral anticoagulation with warfarin – fourth edition.
				</p>
				<p class="text-xs text-gray-500 mt-1">
					Keeling D, Baglin T, Tait C, et al. <em>Br J Haematol.</em> 2011;154(3):311-324. <br />
					Updated guidelines: <em>Br J Haematol.</em> 2014;166(2):155-167.
				</p>
			</div>

			<div class="border-l-4 border-primary-600 pl-4">
				<h3 class="font-semibold text-gray-800">Ministério da Saúde - Brasil</h3>
				<p class="text-sm text-gray-600">
					Manual de Rotinas para Atenção ao AVC - Diretrizes para uso de anticoagulação oral.
				</p>
				<p class="text-xs text-gray-500 mt-1">
					Ministério da Saúde, Brasil, 2013. <br />
					Disponível em: portal.saude.gov.br
				</p>
			</div>
		</div>
	</div>

	<!-- Algoritmo de Conduta -->
	<div class="card bg-green-50">
		<h2 class="font-bold text-xl text-green-900 mb-4">🎯 Resumo do Algoritmo (Alvo 2.0-3.0)</h2>
		<div class="space-y-3 text-sm">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
				<div class="bg-white p-3 rounded">
					<span class="font-bold text-blue-700">INR {'<'} 2.0:</span>
					<span class="text-gray-700">Aumentar DTS 10-15%, retorno 1-2 semanas</span>
				</div>
				<div class="bg-white p-3 rounded">
					<span class="font-bold text-blue-700">INR 3.1-3.5:</span>
					<span class="text-gray-700">Diminuir DTS 10-15%, retorno 1-2 semanas</span>
				</div>
				<div class="bg-white p-3 rounded">
					<span class="font-bold text-orange-700">INR 3.6-4.0:</span>
					<span class="text-gray-700">Reduzir DTS 10-15%, reavaliar 1-2 semanas</span>
				</div>
				<div class="bg-white p-3 rounded">
					<span class="font-bold text-orange-700">INR 4.1-4.9:</span>
					<span class="text-gray-700">Suspender 1-2 doses, reduzir 10-20%, retorno 2-3 dias</span>
				</div>
				<div class="bg-white p-3 rounded">
					<span class="font-bold text-red-700">INR 5.0-9.0 (sem risco):</span>
					<span class="text-gray-700">Omitir 1-2 doses, reavaliar 2-3 dias</span>
				</div>
				<div class="bg-white p-3 rounded">
					<span class="font-bold text-red-700">INR 5.0-9.0 (com risco):</span>
					<span class="text-gray-700">Omitir doses + Vit K 2mg VO, reavaliar 24-48h</span>
				</div>
				<div class="bg-white p-3 rounded col-span-1 md:col-span-2 border-2 border-red-500">
					<span class="font-bold text-red-900">INR {'>'} 9.0:</span>
					<span class="text-red-800">EMERGÊNCIA - Vit K 5mg VO, omitir varfarina</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Fatores de Risco -->
	<div class="card bg-yellow-50">
		<h2 class="font-bold text-xl text-yellow-900 mb-4">⚠️ Fatores de Risco para Sangramento</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-yellow-800">
			<ul class="list-disc list-inside space-y-1">
				<li>Idade {'>'} 65 anos</li>
				<li>Uso de antiagregantes plaquetários</li>
				<li>História de sangramento</li>
				<li>Hipertensão arterial não controlada</li>
			</ul>
			<ul class="list-disc list-inside space-y-1">
				<li>Doença hepática</li>
				<li>INR {'>'} 4.0</li>
				<li>História de quedas</li>
				<li>Outros fatores individuais</li>
			</ul>
		</div>
		<p class="text-xs text-yellow-700 mt-3 font-semibold">
			A presença de qualquer fator de risco com INR 5.0-9.0 indica necessidade de considerar
			vitamina K oral.
		</p>
	</div>

	<!-- Vitamina K - Observações -->
	<div class="card bg-purple-50">
		<h2 class="font-bold text-xl text-purple-900 mb-4">💊 Vitamina K - Observações</h2>
		<div class="space-y-2 text-sm text-purple-800">
			<p><strong>Via Oral (VO):</strong> Preferencial sempre que possível</p>
			<p>
				<strong>Via Endovenosa (EV):</strong> Reservada para emergências, risco de anafilaxia
			</p>
			<p>
				<strong>Diluição:</strong> Ampola 10 mg/ml + 9 ml de água = 10 ml com 1 mg/ml (facilita
				doses menores)
			</p>
			<p class="font-semibold text-purple-900 mt-3">
				⚠️ Infusão EV deve ser LENTA (30 minutos) para minimizar riscos
			</p>
		</div>
	</div>

	<!-- Contato e Suporte -->
	<div class="card">
		<h2 class="font-bold text-xl text-gray-800 mb-4">📞 Suporte e Feedback</h2>
		<p class="text-gray-600 mb-3">
			Esta ferramenta foi desenvolvida com base em protocolos médicos estabelecidos. Para
			sugestões, correções ou feedback:
		</p>
		<div class="space-y-2 text-sm text-gray-700">
			<p>Copyright - © 2024 INR Helper</p>
			<p>💡 Idealizado por - Dra. Carla Pires Oliveira</p>
			<p>Criado por - Fábio Lacerda e Geyson Florencio</p>
			<p>• Licença: Uso educacional</p>
		</div>
	</div>
</div>
