import Airtable from 'airtable';

const base = new Airtable({ 
  apiKey: import.meta.env.AIRTABLE_TOKEN 
}).base(import.meta.env.BASE_ID);

export async function getNoticias() {
  try {
    // Buscamos tudo da tabela 'Noticias' sem filtros de fórmula para evitar erros
    const records = await base('Noticias').select({
      sort: [{ field: 'Prioridade', direction: 'desc' }]
    }).all();

    if (!records) return [];

    // Filtramos e mapeamos os dados manualmente aqui (mais seguro)
    return records
      .map(record => ({
        id: record.id,
        Titulo: record.get('Titulo'),
        Publicar: record.get('Publicar'),
        Imagem: record.get('Imagem_URL') || '', 
        Chapeu: record.get('Chapeu') || 'NOTÍCIA',
        Destaque: record.get('Destaque') || false,
        Tipo_Layout: record.get('Tipo_Layout') || 'Apenas Texto',
        Slug: record.id, 
        Subtitulo: record.get('Social_Share') || ''
      }))
      // Só deixa passar notícias que tenham Título e estejam com 'Publicar' marcado
      .filter(n => n.Titulo && n.Publicar === true); 
  } catch (error) {
    console.error("Erro Crítico Airtable:", error);
    return []; 
  }
}