import Airtable from 'airtable';

export async function getNoticias() {
  const token = import.meta.env.AIRTABLE_TOKEN;
  const baseId = import.meta.env.BASE_ID;

  // Verifica se as chaves chegaram no ambiente de execução
  if (!token || !baseId) {
    return [{ Titulo: "ERRO: Chaves (Token ou BaseID) nao encontradas na Vercel", id: "erro-env" }];
  }

  const base = new Airtable({ apiKey: token }).base(baseId);

  try {
    // Busca bruta: traz qualquer coisa que estiver na tabela 'Noticias'
    const records = await base('Noticias').select({ maxRecords: 5 }).all();
    
    if (records.length === 0) {
        return [{ Titulo: "SINAL ZERO: Tabela encontrada, mas retornou vazia.", id: "vazio" }];
    }

    return records.map(record => ({
      id: record.id,
      Titulo: record.get('Titulo') || "Sem Titulo",
      Imagem: record.get('Imagem_URL') || "",
      Publicar: record.get('Publicar')
    }));
  } catch (e) {
    // Captura o erro exato do Airtable (Permissão, Nome de Tabela, etc)
    return [{ Titulo: `ERRO TECNICO: ${e.message}`, id: "erro-api" }];
  }
}