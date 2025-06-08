import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

export function handleError(err: unknown) {
  if (err instanceof AxiosError) {
    const msg = err.response?.data?.message ?? "Erro desconhecido";
    const errors = SplitErrors(msg);
    errors.forEach((m) => enqueueSnackbar(m, { variant: "error" }));
  } else {
    enqueueSnackbar("Erro inesperado", { variant: "error" });
  }
}

const SplitErrors = (text?: string) => {
    if(!text) return ['Erro ao conectar com o servidor'];
    return text.split(";").map(e=> e.trim());
}
