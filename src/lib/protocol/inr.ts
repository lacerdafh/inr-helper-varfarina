/**
 * Protocolo de ajuste de dose de Varfarina baseado no INR
 * Fontes: UpToDate; British J. Haematol. 2014;166:155–167; MS - Manual AVC 2013
 */

export type Risco = {
	idade65?: boolean;
	antiagregante?: boolean;
	sangPrevio?: boolean;
	hasNaoControlada?: boolean;
	doencaHepatica?: boolean;
	inrMaior4?: boolean;
	quedas?: boolean;
	outros?: boolean;
};

export type TipoSangramento = 'nenhum' | 'menor' | 'risco_morte';

export type Entrada = {
	alvoMin: number;
	alvoMax: number;
	inr: number;
	sangramento: TipoSangramento;
	risco: Risco;
	dtsAtual?: number;
	mgComprimido?: number;
	alteracaoIsolada?: boolean;
};

export type AjusteDTS = {
	faixa: [number, number]; // [min%, max%]
	sugestoes: { percent: number; dts: number }[];
};

export type VitaminaK = {
	via: 'VO' | 'EV';
	doseMg: number;
	observacao?: string;
};

export type Resultado = {
	conduta: string;
	ajusteDTS?: AjusteDTS;
	vitaminaK?: VitaminaK;
	suspenderDoses?: number;
	followup: string;
	emergencia?: boolean;
	justificativa: string;
	alertaConfirmacao?: boolean;
};

/**
 * Verifica se há algum fator de risco de sangramento
 */
function temRiscoDeSangramento(risco: Risco, inr: number): boolean {
	return !!(
		risco.idade65 ||
		risco.antiagregante ||
		risco.sangPrevio ||
		risco.hasNaoControlada ||
		risco.doencaHepatica ||
		inr > 4.0 ||
		risco.quedas ||
		risco.outros
	);
}

/**
 * Calcula o ajuste de DTS baseado na faixa percentual
 */
function calcularAjusteDTS(
	dtsAtual: number,
	faixaMin: number,
	faixaMax: number
): AjusteDTS {
	const percentMedio = (faixaMin + faixaMax) / 2;

	return {
		faixa: [faixaMin, faixaMax],
		sugestoes: [
			{
				percent: faixaMin,
				dts: Math.round((dtsAtual * (1 + faixaMin / 100)) * 10) / 10
			},
			{
				percent: percentMedio,
				dts: Math.round((dtsAtual * (1 + percentMedio / 100)) * 10) / 10
			},
			{
				percent: faixaMax,
				dts: Math.round((dtsAtual * (1 + faixaMax / 100)) * 10) / 10
			}
		]
	};
}

/**
 * Função principal para decidir conduta baseada no INR e fatores de risco
 */
export function decidirConduta(e: Entrada): Resultado {
	const { alvoMin, alvoMax, inr, sangramento, risco, dtsAtual, alteracaoIsolada } = e;

	// REGRA DE CONFIRMAÇÃO - alteração isolada após período estável
	if (alteracaoIsolada && (inr < alvoMin || inr > alvoMax)) {
		return {
			conduta:
				'Repetir exame para confirmação sem mudar a dose (alteração isolada após período estável)',
			followup: '3-7 dias',
			justificativa:
				'Alteração isolada do INR após período estável requer confirmação antes de ajustar a dose.',
			alertaConfirmacao: true
		};
	}

	// SANGRAMENTO COM RISCO DE MORTE (qualquer INR)
	if (sangramento === 'risco_morte') {
		return {
			conduta: 'EMERGÊNCIA: Suspender varfarina imediatamente',
			vitaminaK: {
				via: 'EV',
				doseMg: 10,
				observacao: 'Infusão lenta (30 min) + CCP 30-50 UI/kg IV ou PFC 15 ml/kg IV'
			},
			suspenderDoses: -1, // suspensão total
			followup: '6-8 horas (repetir INR)',
			emergencia: true,
			justificativa:
				'Sangramento com risco de morte requer reversão urgente com vitamina K EV + concentrado de complexo protrombínico.'
		};
	}

	// INR > 9.0
	if (inr > 9.0) {
		if (sangramento === 'nenhum') {
			return {
				conduta: 'Omitir varfarina. Reiniciar com dose menor quando INR < 5.0',
				vitaminaK: {
					via: 'VO',
					doseMg: 5,
					observacao: 'Repetir Vitamina K se necessário'
				},
				suspenderDoses: -1,
				followup: '24 horas',
				emergencia: true,
				justificativa:
					'INR > 9.0 requer omissão da varfarina e vitamina K para reversão. Monitoramento rigoroso.'
			};
		}
		return {
			conduta: 'EMERGÊNCIA: Encaminhar imediatamente à emergência',
			followup: 'Imediato',
			emergencia: true,
			justificativa: 'INR > 9.0 com sangramento requer atendimento de emergência urgente.'
		};
	}

	const temRisco = temRiscoDeSangramento(risco, inr);

	// INR 5.0 - 9.0
	if (inr >= 5.0 && inr <= 9.0) {
		if (temRisco) {
			return {
				conduta: 'Omitir 1-2 doses de varfarina',
				vitaminaK: {
					via: 'VO',
					doseMg: 2,
					observacao: 'Opcional, considerar devido aos fatores de risco'
				},
				suspenderDoses: 2,
				followup: '24-48 horas',
				justificativa:
					'INR 5.0-9.0 com fatores de risco requer omissão de doses e consideração de vitamina K oral.',
				...(dtsAtual && {
					ajusteDTS: calcularAjusteDTS(dtsAtual, -20, -10)
				})
			};
		} else {
			return {
				conduta: 'Omitir 1-2 doses',
				suspenderDoses: 2,
				followup: '2-3 dias',
				justificativa:
					'INR 5.0-9.0 sem risco significativo requer apenas omissão de doses temporária.',
				...(dtsAtual && {
					ajusteDTS: calcularAjusteDTS(dtsAtual, -20, -10)
				})
			};
		}
	}

	// INR 4.1 - 4.9 (sem sangramento)
	if (inr >= 4.1 && inr <= 4.9 && sangramento === 'nenhum') {
		return {
			conduta: 'Suspender 1-2 doses e diminuir DTS',
			suspenderDoses: 2,
			followup: '2-3 dias',
			justificativa:
				'INR 4.1-4.9 sem sangramento requer suspensão temporária e redução da DTS.',
			...(dtsAtual && {
				ajusteDTS: calcularAjusteDTS(dtsAtual, -20, -10)
			})
		};
	}

	// INR 3.6 - 4.0 (sem sangramento)
	if (inr >= 3.6 && inr <= 4.0 && sangramento === 'nenhum') {
		return {
			conduta: 'Reduzir DTS',
			followup: '1-2 semanas',
			justificativa: 'INR 3.6-4.0 requer redução da dose para retornar ao alvo terapêutico.',
			...(dtsAtual && {
				ajusteDTS: calcularAjusteDTS(dtsAtual, -15, -10)
			})
		};
	}

	// INR 3.1 - 3.5
	if (inr >= 3.1 && inr <= 3.5) {
		return {
			conduta: 'Diminuir DTS',
			followup: '1-2 semanas',
			justificativa:
				'INR discretamente acima do alvo requer ajuste leve de dose para baixo.',
			...(dtsAtual && {
				ajusteDTS: calcularAjusteDTS(dtsAtual, -15, -10)
			})
		};
	}

	// INR no alvo (2.0 - 3.0)
	if (inr >= alvoMin && inr <= alvoMax) {
		return {
			conduta: 'Manter dose atual',
			followup: '4 semanas (paciente estável) ou 1-2 semanas (ajuste recente)',
			justificativa: 'INR dentro do alvo terapêutico. Dose atual adequada.'
		};
	}

	// INR < 2.0 (abaixo do alvo)
	if (inr < alvoMin) {
		return {
			conduta: 'Aumentar DTS',
			followup: '1-2 semanas',
			justificativa:
				'INR abaixo do alvo aumenta risco de trombose. Aumentar dose para atingir faixa terapêutica.',
			...(dtsAtual && {
				ajusteDTS: calcularAjusteDTS(dtsAtual, 10, 15)
			})
		};
	}

	// Fallback - não deveria chegar aqui
	return {
		conduta: 'Avaliar individualmente',
		followup: '1 semana',
		justificativa: 'Situação não coberta pelos protocolos padrão. Avaliação individual necessária.'
	};
}

/**
 * Distribui a DTS em doses diárias com frações de comprimido
 */
export function distribuirDTSemana(
	dts: number,
	mgComprimido: number = 5
): {
	total: number;
	dias: { label: string; mg: number; fracao: number }[];
} {
	// Dose diária média
	const doseDiaria = dts / 7;

	// Possíveis frações de comprimido (em ordem de preferência)
	const fracoesPermitidas = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5];

	// Converter dose diária em fração de comprimido
	const fracaoIdeal = doseDiaria / mgComprimido;

	// Encontrar a fração mais próxima permitida
	const fracaoBase = fracoesPermitidas.reduce((prev, curr) =>
		Math.abs(curr - fracaoIdeal) < Math.abs(prev - fracaoIdeal) ? curr : prev
	);

	// Criar array de 7 dias com a fração base
	const dias = [
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado',
		'Domingo'
	].map((label) => ({
		label,
		fracao: fracaoBase,
		mg: fracaoBase * mgComprimido
	}));

	// Calcular diferença entre DTS desejada e a soma atual
	const somaAtual = dias.reduce((sum, d) => sum + d.mg, 0);
	const diferenca = dts - somaAtual;

	// Ajustar dias alternados para compensar a diferença
	if (Math.abs(diferenca) > 0.1) {
		const ajustePorDia = mgComprimido * 0.25; // ajuste de 1/4 de comprimido
		const diasParaAjustar = Math.floor(Math.abs(diferenca) / ajustePorDia);

		// Alternar dias para distribuir o ajuste uniformemente
		for (let i = 0; i < Math.min(diasParaAjustar, 7); i += 2) {
			if (diferenca > 0) {
				dias[i].fracao += 0.25;
				dias[i].mg += ajustePorDia;
			} else {
				dias[i].fracao = Math.max(0, dias[i].fracao - 0.25);
				dias[i].mg = Math.max(0, dias[i].mg - ajustePorDia);
			}
		}
	}

	return {
		total: dias.reduce((sum, d) => sum + d.mg, 0),
		dias
	};
}

/**
 * Gera um calendário mensal com doses diárias
 */
export function gerarCalendarioMensal(
	ano: number,
	mes: number, // 1-12
	distribuicao: ReturnType<typeof distribuirDTSemana>['dias'],
	dataConsulta?: Date
): {
	semanas: {
		dias: {
			dia: number | null;
			fracao: number;
			mg: number;
			isConsulta: boolean;
		}[];
	}[];
} {
	const primeiroDia = new Date(ano, mes - 1, 1);
	const ultimoDia = new Date(ano, mes, 0);
	const diasNoMes = ultimoDia.getDate();

	// Dia da semana do primeiro dia (0 = domingo, 1 = segunda, ...)
	let diaSemanaInicio = primeiroDia.getDay();
	// Converter para segunda = 0
	diaSemanaInicio = diaSemanaInicio === 0 ? 6 : diaSemanaInicio - 1;

	const semanas: {
		dias: { dia: number | null; fracao: number; mg: number; isConsulta: boolean }[];
	}[] = [];

	let diaAtual = 1;
	let semanaAtual: typeof semanas[0]['dias'] = [];

	// Preencher dias vazios no início
	for (let i = 0; i < diaSemanaInicio; i++) {
		semanaAtual.push({ dia: null, fracao: 0, mg: 0, isConsulta: false });
	}

	// Preencher dias do mês
	while (diaAtual <= diasNoMes) {
		const diaSemana = (diaSemanaInicio + diaAtual - 1) % 7;
		const dose = distribuicao[diaSemana];

		const isConsulta =
			dataConsulta &&
			dataConsulta.getDate() === diaAtual &&
			dataConsulta.getMonth() === mes - 1 &&
			dataConsulta.getFullYear() === ano;

		semanaAtual.push({
			dia: diaAtual,
			fracao: dose.fracao,
			mg: dose.mg,
			isConsulta: !!isConsulta
		});

		if (semanaAtual.length === 7) {
			semanas.push({ dias: semanaAtual });
			semanaAtual = [];
		}

		diaAtual++;
	}

	// Preencher dias vazios no final
	if (semanaAtual.length > 0) {
		while (semanaAtual.length < 7) {
			semanaAtual.push({ dia: null, fracao: 0, mg: 0, isConsulta: false });
		}
		semanas.push({ dias: semanaAtual });
	}

	return { semanas };
}
