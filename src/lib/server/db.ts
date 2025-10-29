/**
 * Camada de persistência opcional com Supabase
 * Se VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não estiverem configurados,
 * esta camada não faz nada e a aplicação usa apenas localStorage
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { ConsultaRegistro } from '$lib/stores/consultas';

let supabase: SupabaseClient | null = null;

// Inicializar Supabase apenas se as variáveis de ambiente estiverem configuradas
if (typeof window !== 'undefined') {
	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

	if (supabaseUrl && supabaseKey) {
		supabase = createClient(supabaseUrl, supabaseKey);
		console.log('✅ Supabase configurado');
	} else {
		console.log('ℹ️  Supabase não configurado - usando apenas localStorage');
	}
}

export const db = {
	/**
	 * Verifica se Supabase está disponível
	 */
	isAvailable: () => supabase !== null,

	/**
	 * Salvar consulta no Supabase (opcional)
	 */
	async salvarConsulta(consulta: ConsultaRegistro): Promise<boolean> {
		if (!supabase) return false;

		try {
			const { error } = await supabase.from('consultas').insert([
				{
					id: consulta.id,
					data: consulta.data.toISOString(),
					entrada: consulta.entrada,
					resultado: consulta.resultado,
					usuario: consulta.usuario,
					versao_protocolo: consulta.versaoProtocolo
				}
			]);

			if (error) throw error;
			return true;
		} catch (error) {
			console.error('Erro ao salvar consulta no Supabase:', error);
			return false;
		}
	},

	/**
	 * Buscar consultas do Supabase (opcional)
	 */
	async buscarConsultas(limite: number = 50): Promise<ConsultaRegistro[] | null> {
		if (!supabase) return null;

		try {
			const { data, error } = await supabase
				.from('consultas')
				.select('*')
				.order('data', { ascending: false })
				.limit(limite);

			if (error) throw error;

			// Converter para formato ConsultaRegistro
			return data.map((item) => ({
				id: item.id,
				data: new Date(item.data),
				entrada: item.entrada,
				resultado: item.resultado,
				usuario: item.usuario,
				versaoProtocolo: item.versao_protocolo
			}));
		} catch (error) {
			console.error('Erro ao buscar consultas do Supabase:', error);
			return null;
		}
	},

	/**
	 * Sincronizar consultas locais com Supabase
	 */
	async sincronizar(consultasLocais: ConsultaRegistro[]): Promise<void> {
		if (!supabase) return;

		for (const consulta of consultasLocais) {
			await this.salvarConsulta(consulta);
		}
	}
};

/**
 * Schema SQL para criar a tabela no Supabase (documentação):
 *
 * CREATE TABLE consultas (
 *   id UUID PRIMARY KEY,
 *   data TIMESTAMP WITH TIME ZONE NOT NULL,
 *   entrada JSONB NOT NULL,
 *   resultado JSONB NOT NULL,
 *   usuario TEXT NOT NULL CHECK (usuario IN ('paciente', 'profissional')),
 *   versao_protocolo TEXT NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_consultas_data ON consultas(data DESC);
 */
