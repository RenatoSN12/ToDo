export const SplitErrors = (text?: string) => {
    if(!text) return ['Erro ao conectar com o servidor'];
    return text.split(";").map(e=> e.trim());
}