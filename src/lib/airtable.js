import Airtable from 'airtable';

const base = new Airtable({ 
  apiKey: import.meta.env.AIRTABLE_TOKEN 
}).base(import.meta.env.BASE_ID);

export async function getNoticias() {
  try {
    const records = await base('Noticias').select({
      // FÓRMULA BLINDADA: Checkbox Publicar ativo E Titulo preenchido
      filterByFormula: "AND({Publicar}, {Titulo} != '')",
      sort: [{ field: 'Prioridade', direction: 'desc' }]
    }).all();

    if (!records || records.length === 0) return [];

    return records.map(record => ({
      id: record.id,
      Titulo: record.get('Titulo') || "Sem Titulo",
      // Mapeamento correto para sua coluna 'Imagem_URL'
      Imagem: record.get('Imagem_URL') || '', 
      Chapeu: record.get('Chapeu') || 'AUDITORIA',
      Destaque: record.get('Destaque') || false,
      Tipo_Layout: record.get('Tipo_Layout') || 'Apenas Texto',
      Slug: record.id, 
      Subtitulo: record.get('Social_Share') || ''
    }));
  } catch (error) {
    console.error("Erro na captação do Airtable:", error);
    return []; 
  }
}