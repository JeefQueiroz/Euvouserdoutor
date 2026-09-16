import { runEditorialQueue } from './editorial-queue-lib.mjs';

const result = await runEditorialQueue();
console.log(result.changed
  ? `Fila atualizada: ${result.additions.length} novas pautas; ${result.total} itens armazenados.`
  : `Fila sem alterações: ${result.total} itens armazenados.`);
