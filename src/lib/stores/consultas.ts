import { writable } from 'svelte/store';
import type { Entrada, Resultado } from '$lib/protocol/inr';

export type ConsultaRegistro = {
	id: string;
	data: Date;
	entrada: Entrada;
	resultado: Resultado;
	usuario: 'paciente' | 'profissional';
	versaoProtocolo: string;
};

export type Perfil = {
	nome?: string;
	alvoMin: number;
	alvoMax: number;
	mgComprimido: number;
};

function createConsultasStore() {
	const { subscribe, set, update } = writable<ConsultaRegistro[]>([]);

	// Carregar do localStorage na inicialização
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('inr_consultas');
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				// Converter strings de data de volta para Date
				const consultas = parsed.map((c: any) => ({
					...c,
					data: new Date(c.data)
				}));
				set(consultas);
			} catch (e) {
				console.error('Erro ao carregar consultas:', e);
			}
		}
	}

	return {
		subscribe,
		adicionar: (consulta: Omit<ConsultaRegistro, 'id' | 'data'>) => {
			const novaConsulta: ConsultaRegistro = {
				...consulta,
				id: crypto.randomUUID(),
				data: new Date()
			};

			update((consultas) => {
				const novas = [novaConsulta, ...consultas];
				if (typeof window !== 'undefined') {
					localStorage.setItem('inr_consultas', JSON.stringify(novas));
				}
				return novas;
			});

			return novaConsulta;
		},
		remover: (id: string) => {
			update((consultas) => {
				const novas = consultas.filter((c) => c.id !== id);
				if (typeof window !== 'undefined') {
					localStorage.setItem('inr_consultas', JSON.stringify(novas));
				}
				return novas;
			});
		},
		limpar: () => {
			set([]);
			if (typeof window !== 'undefined') {
				localStorage.removeItem('inr_consultas');
			}
		}
	};
}

function createPerfilStore() {
	const defaultPerfil: Perfil = {
		alvoMin: 2.0,
		alvoMax: 3.0,
		mgComprimido: 5
	};

	const { subscribe, set } = writable<Perfil>(defaultPerfil);

	// Carregar do localStorage na inicialização
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('inr_perfil');
		if (stored) {
			try {
				set(JSON.parse(stored));
			} catch (e) {
				console.error('Erro ao carregar perfil:', e);
			}
		}
	}

	return {
		subscribe,
		atualizar: (perfil: Partial<Perfil>) => {
			update((atual) => {
				const novo = { ...atual, ...perfil };
				if (typeof window !== 'undefined') {
					localStorage.setItem('inr_perfil', JSON.stringify(novo));
				}
				return novo;
			});
		},
		resetar: () => {
			set(defaultPerfil);
			if (typeof window !== 'undefined') {
				localStorage.removeItem('inr_perfil');
			}
		}
	};
}

function createModoStore() {
	const { subscribe, set } = writable<'paciente' | 'profissional'>('paciente');

	// Carregar do localStorage na inicialização
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('inr_modo');
		if (stored === 'profissional') {
			set('profissional');
		}
	}

	return {
		subscribe,
		toggle: () => {
			update((modo) => {
				const novo = modo === 'paciente' ? 'profissional' : 'paciente';
				if (typeof window !== 'undefined') {
					localStorage.setItem('inr_modo', novo);
				}
				return novo;
			});
		},
		set: (modo: 'paciente' | 'profissional') => {
			set(modo);
			if (typeof window !== 'undefined') {
				localStorage.setItem('inr_modo', modo);
			}
		}
	};
}

export const consultasStore = createConsultasStore();
export const perfilStore = createPerfilStore();
export const modoStore = createModoStore();
