import Airtable from 'airtable';

const base = new Airtable({ apiKey: import.meta.env.AIRTABLE_TOKEN }).base(import.meta.env.BASE_ID);

export async function getNoticias() {
  const records = await base('Noticias').select({
    filterByFormula: "{Publicar} = 1", // Traz apenas o que você marcou com check verde
    sort: [{ field: 'Prioridade', direction: 'desc' }]
  }).all();

  return records.map(record => ({
    id: record.id,
    Titulo: record.get('Titulo'), // Bate com sua coluna 'Titulo'
    Imagem: record.get('Imagem_URL'), // MAPEA PARA O SEU CAMPO 'Imagem_URL'
    Chapeu: record.get('Chapeu'), // Bate com sua coluna 'Chapeu'
    Destaque: record.get('Destaque'), // Bate com seu checkbox 'Destaque'
    Tipo_Layout: record.get('Tipo_Layout'), // Bate com seu Select 'Tipo_Layout'
    Slug: record.id,
    Subtitulo: record.get('Social_Share') // Usando sua coluna 'Social_Share' como apoio visual
  }));
}