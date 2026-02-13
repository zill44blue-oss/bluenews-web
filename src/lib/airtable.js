import Airtable from 'airtable';

const base = new Airtable({ apiKey: import.meta.env.AIRTABLE_TOKEN }).base(import.meta.env.BASE_ID);

export async function getNoticias() {
  try {
    const records = await base('Noticias').select({
      // Sintaxe reforçada: Checkbox marcado E título preenchido
      filterByFormula: "AND({Publicar} = TRUE(), NOT({Titulo} = ''))",
      sort: [{ field: 'Prioridade', direction: 'desc' }]
    }).all();

    return records.map(record => ({
      id: record.id,
      Titulo: record.get('Titulo') || "Sem Titulo",
      Imagem: record.get('Imagem_URL') || '', 
      Chapeu: record.get('Chapeu') || 'NOTÍCIA',
      Destaque: record.get('Destaque') || false,
      Tipo_Layout: record.get('Tipo_Layout') || 'Apenas Texto',
      Slug: record.id, 
      Subtitulo: record.get('Social_Share') || ''
    }));
  } catch (error) {
    console.error("Erro na captação do Airtable:", error);
    return []; // Retorna lista vazia para não travar o build
  }
}