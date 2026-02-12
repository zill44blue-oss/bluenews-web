import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.BASE_ID);

export async function getNoticias() {
  try {
    const records = await base('Noticias').select({
      filterByFormula: '{Publicar} = 1',
      sort: [{ field: 'Created', direction: 'desc' }]
    }).all();
    
    return records.map(record => ({
      id: record.id,
      titulo: record.get('Título') || 'Sem Título',
      corpo: record.get('blue_news') || '',
      imagem: record.get('Imagem_URL') || 'https://placehold.co/600x400?text=BlueNews',
      creditos: record.get('Creditos_Imagem') || 'Crédito não identificado',
      tema: record.get('Tema') ? record.get('Tema')[0] : 'Geral',
      data: record.get('Created') ? record.get('Created').slice(0, 10) : ''
    }));
  } catch (error) {
    console.error("❌ Falha na leitura do Airtable:", error);
    return [];
  }
}