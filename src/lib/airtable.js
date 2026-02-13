import Airtable from 'airtable';

export async function getNoticias() {
  const token = import.meta.env.AIRTABLE_TOKEN;
  const baseId = import.meta.env.BASE_ID;

  if (!token || !baseId) return [];

  const base = new Airtable({ apiKey: token }).base(baseId);

  try {
    // Busca direta sem filtros de fórmula para evitar qualquer erro de sintaxe
    const records = await base('Noticias').select().all();

    return records.map(record => ({
      id: record.id,
      Titulo: record.get('Titulo') || "",
      // Lógica booleana simplificada para o checkbox
      Publicar: !!record.get('Publicar'), 
      Imagem: record.get('Imagem_URL') || "", 
      Chapeu: record.get('Chapeu') || "NOTÍCIA",
      Destaque: !!record.get('Destaque'),
      Tipo_Layout: record.get('Tipo_Layout') || "Apenas Texto",
      Slug: record.id, 
      Subtitulo: record.get('Social_Share') || ""
    })).filter(n => n.Titulo && n.Publicar); // Só exige Título e Publicar marcado
  } catch (error) {
    console.error("Erro na fiação Airtable:", error);
    return []; 
  }
}