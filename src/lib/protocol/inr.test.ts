import { describe, it, expect } from 'vitest';
import { decidirConduta, distribuirDTSemana, gerarCalendarioMensal, type Entrada } from './inr';

describe('Protocolo INR - decidirConduta', () => {
	const baseEntrada: Entrada = {
		alvoMin: 2.0,
		alvoMax: 3.0,
		inr: 2.5,
		sangramento: 'nenhum',
		risco: {},
		dtsAtual: 35,
		mgComprimido: 5
	};

	it('INR 1.8 - deve aumentar DTS em 10-15% e retornar em 1-2 semanas', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 1.8
		});

		expect(resultado.conduta).toContain('Aumentar');
		expect(resultado.ajusteDTS).toBeDefined();
		expect(resultado.ajusteDTS?.faixa).toEqual([10, 15]);
		expect(resultado.followup).toBe('1-2 semanas');
		expect(resultado.emergencia).toBeUndefined();
	});

	it('INR 3.3 - deve reduzir DTS em 10-15% e retornar em 1-2 semanas', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 3.3
		});

		expect(resultado.conduta).toContain('Diminuir');
		expect(resultado.ajusteDTS).toBeDefined();
		expect(resultado.ajusteDTS?.faixa).toEqual([-15, -10]);
		expect(resultado.followup).toBe('1-2 semanas');
	});

	it('INR 3.8 sem sangramento - deve reduzir DTS em 10-15% e reavaliar em 1-2 semanas', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 3.8,
			sangramento: 'nenhum'
		});

		expect(resultado.conduta).toContain('Reduzir');
		expect(resultado.ajusteDTS).toBeDefined();
		expect(resultado.ajusteDTS?.faixa).toEqual([-15, -10]);
		expect(resultado.followup).toBe('1-2 semanas');
	});

	it('INR 4.5 sem sangramento - deve suspender 1-2 doses, reduzir 10-20%, retorno 2-3 dias', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 4.5,
			sangramento: 'nenhum'
		});

		expect(resultado.conduta).toContain('Suspender');
		expect(resultado.suspenderDoses).toBe(2);
		expect(resultado.ajusteDTS).toBeDefined();
		expect(resultado.ajusteDTS?.faixa).toEqual([-20, -10]);
		expect(resultado.followup).toBe('2-3 dias');
	});

	it('INR 6.2 sem outros fatores de risco (mas INR>4 é risco) - deve omitir doses + Vit K', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 6.2,
			sangramento: 'nenhum',
			risco: {}
		});

		expect(resultado.conduta).toContain('Omitir');
		expect(resultado.suspenderDoses).toBe(2);
		expect(resultado.followup).toBe('24-48 horas');
		// INR > 4.0 é automaticamente fator de risco, então vitamina K é sugerida
		expect(resultado.vitaminaK).toBeDefined();
	});

	it('INR 6.2 com risco - deve omitir 1-2 doses + Vit K 2 mg VO, reavaliar 24-48h', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 6.2,
			sangramento: 'nenhum',
			risco: {
				idade65: true,
				antiagregante: true
			}
		});

		expect(resultado.conduta).toContain('Omitir');
		expect(resultado.suspenderDoses).toBe(2);
		expect(resultado.vitaminaK).toBeDefined();
		expect(resultado.vitaminaK?.via).toBe('VO');
		expect(resultado.vitaminaK?.doseMg).toBe(2);
		expect(resultado.followup).toBe('24-48 horas');
	});

	it('INR 9.5 - deve encaminhar à emergência', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 9.5,
			sangramento: 'nenhum'
		});

		expect(resultado.emergencia).toBe(true);
		expect(resultado.conduta).toContain('Omitir');
		expect(resultado.vitaminaK).toBeDefined();
		expect(resultado.vitaminaK?.via).toBe('VO');
		expect(resultado.vitaminaK?.doseMg).toBe(5);
		expect(resultado.followup).toBe('24 horas');
	});

	it('INR 10.5 com sangramento menor - deve ser emergência', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 10.5,
			sangramento: 'menor'
		});

		expect(resultado.emergencia).toBe(true);
		expect(resultado.conduta).toContain('EMERGÊNCIA');
		expect(resultado.followup).toBe('Imediato');
	});

	it('Sangramento com risco de morte (INR 2.8) - deve administrar CCP/PFC + Vit K 10 mg EV', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 2.8,
			sangramento: 'risco_morte'
		});

		expect(resultado.emergencia).toBe(true);
		expect(resultado.conduta).toContain('EMERGÊNCIA');
		expect(resultado.vitaminaK).toBeDefined();
		expect(resultado.vitaminaK?.via).toBe('EV');
		expect(resultado.vitaminaK?.doseMg).toBe(10);
		expect(resultado.vitaminaK?.observacao).toContain('CCP');
		expect(resultado.followup).toBe('6-8 horas (repetir INR)');
	});

	it('INR no alvo (2.5) - deve manter dose', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 2.5
		});

		expect(resultado.conduta).toContain('Manter');
		expect(resultado.ajusteDTS).toBeUndefined();
		expect(resultado.emergencia).toBeUndefined();
	});

	it('Alteração isolada após período estável - deve orientar repetir exame', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 3.5,
			alteracaoIsolada: true
		});

		expect(resultado.conduta).toContain('Repetir exame');
		expect(resultado.alertaConfirmacao).toBe(true);
		expect(resultado.ajusteDTS).toBeUndefined();
	});

	it('Deve calcular sugestões de DTS corretamente', () => {
		const resultado = decidirConduta({
			...baseEntrada,
			inr: 1.8,
			dtsAtual: 40
		});

		expect(resultado.ajusteDTS).toBeDefined();
		const sugestoes = resultado.ajusteDTS!.sugestoes;

		// 40mg + 10% = 44mg
		expect(sugestoes[0].dts).toBe(44);
		expect(sugestoes[0].percent).toBe(10);

		// 40mg + 12.5% = 45mg
		expect(sugestoes[1].dts).toBe(45);
		expect(sugestoes[1].percent).toBe(12.5);

		// 40mg + 15% = 46mg
		expect(sugestoes[2].dts).toBe(46);
		expect(sugestoes[2].percent).toBe(15);
	});
});

describe('Protocolo INR - distribuirDTSemana', () => {
	it('Deve distribuir DTS de 35mg em 7 dias com comprimido de 5mg', () => {
		const resultado = distribuirDTSemana(35, 5);

		expect(resultado.dias).toHaveLength(7);
		expect(resultado.total).toBeCloseTo(35, 0.5);

		// Dose diária média = 5mg (1 comprimido)
		const dosasMedias = resultado.dias.filter((d) => d.fracao === 1);
		expect(dosasMedias.length).toBeGreaterThan(0);
	});

	it('Deve distribuir DTS de 42.5mg com ajustes alternados', () => {
		const resultado = distribuirDTSemana(42.5, 5);

		expect(resultado.dias).toHaveLength(7);
		expect(resultado.total).toBeCloseTo(42.5, 1);

		// Deve ter mix de doses (ex: 1, 1.25, 1.5)
		const fracoes = resultado.dias.map((d) => d.fracao);
		const uniqueFracoes = new Set(fracoes);
		expect(uniqueFracoes.size).toBeGreaterThan(1);
	});

	it('Deve retornar labels corretos dos dias da semana', () => {
		const resultado = distribuirDTSemana(35, 5);

		expect(resultado.dias[0].label).toBe('Segunda');
		expect(resultado.dias[6].label).toBe('Domingo');
	});
});

describe('Protocolo INR - gerarCalendarioMensal', () => {
	it('Deve gerar calendário de janeiro 2025 (5 semanas)', () => {
		const distribuicao = distribuirDTSemana(35, 5).dias;
		const calendario = gerarCalendarioMensal(2025, 1, distribuicao);

		expect(calendario.semanas.length).toBeGreaterThanOrEqual(5);

		// Primeira semana deve ter dias nulos no início (janeiro 2025 começa quarta-feira)
		const primeiraSemana = calendario.semanas[0].dias;
		expect(primeiraSemana[0].dia).toBeNull(); // segunda
		expect(primeiraSemana[1].dia).toBeNull(); // terça
		expect(primeiraSemana[2].dia).toBe(1); // quarta
	});

	it('Deve marcar dia da consulta corretamente', () => {
		const distribuicao = distribuirDTSemana(35, 5).dias;
		const dataConsulta = new Date(2025, 0, 15); // 15 de janeiro de 2025
		const calendario = gerarCalendarioMensal(2025, 1, distribuicao, dataConsulta);

		// Encontrar dia 15
		let dia15Encontrado = false;
		for (const semana of calendario.semanas) {
			const dia15 = semana.dias.find((d) => d.dia === 15);
			if (dia15) {
				expect(dia15.isConsulta).toBe(true);
				dia15Encontrado = true;
			}
		}
		expect(dia15Encontrado).toBe(true);
	});

	it('Deve aplicar doses corretas para cada dia da semana', () => {
		const distribuicao = distribuirDTSemana(35, 5).dias;
		const calendario = gerarCalendarioMensal(2025, 1, distribuicao);

		// Pegar uma segunda-feira (dia 6 de janeiro é segunda)
		for (const semana of calendario.semanas) {
			const dia6 = semana.dias.find((d) => d.dia === 6);
			if (dia6) {
				// Segunda-feira = índice 0 na distribuição
				expect(dia6.fracao).toBe(distribuicao[0].fracao);
				expect(dia6.mg).toBe(distribuicao[0].mg);
			}
		}
	});
});
