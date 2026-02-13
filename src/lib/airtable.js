import Airtable from 'airtable';

const base = new Airtable({ 
  apiKey: import.meta.env.AIRTABLE_TOKEN 
}).base(import.meta.env.BASE_ID);

export async function getNoticias() {
  try {
    const records = await base('Noticias').select().all();

    return records
      .map(record => ({
        id: record.id,
        Titulo: record.get('Titulo') || "",
        Publicar: record.get('Publicar') || false,
        Imagem: record.get('Imagem_URL') || "", 
        Chapeu: record.get('Chapeu') || "NOTÍCIA",
        Destaque: record.get('Destaque') || false,
        Tipo_Layout: record.get('Tipo_Layout') || "Apenas Texto",
        // USAMOS O ID COMO SLUG PARA GARANTIR CONEXÃO
        Slug: record.id, 
        Subtitulo: record.get('Social_Share') || ""
      }))
      // FILTRO DE SEGURANÇA: Só passa se tiver Título e estiver Publicado
      .filter(n => n.Titulo.trim() !== "" && n.Publicar === true); 
  } catch (error) {
    console.error("ERRO AIRTABLE:", error);
    return []; 
  }
}