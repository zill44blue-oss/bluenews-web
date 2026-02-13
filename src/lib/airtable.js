import Airtable from 'airtable';

const base = new Airtable({ apiKey: import.meta.env.AIRTABLE_TOKEN }).base(import.meta.env.BASE_ID);

export async function getNoticias() {
  const records = await base('Noticias').select({
    filterByFormula: "AND({Publicar} = 1, {Titulo} != '')", // Só traz se estiver publicado E tiver título
    sort: [{ field: 'Prioridade', direction: 'desc' }]
  }).all();

  return records.map(record => {
    const titulo = record.get('Titulo') || "Sem Titulo";
    return {
      id: record.id,
      Titulo: titulo,
      Imagem: record.get('Imagem_URL') || '', 
      Chapeu: record.get('Chapeu') || '',
      Destaque: record.get('Destaque') || false,
      Tipo_Layout: record.get('Tipo_Layout') || 'Apenas Texto',
      // Garante que o Slug nunca seja undefined para não quebrar o build
      Slug: record.id, 
      Subtitulo: record.get('Social_Share') || ''
    };
  });
}