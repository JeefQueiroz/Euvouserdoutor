# Contribuindo com o EuvouserDoutor

## Fluxo de branches

A branch `main` representa o código pronto para publicação. Não faça alterações diretamente nela. Para cada correção, matéria ou melhoria, crie uma branch curta a partir da `main`, por exemplo `fix/vite-chunks` ou `feat/nova-materia`.

Antes de abrir um pull request, atualize a branch local com a versão mais recente da `main` e resolva os conflitos localmente:

```bash
git fetch origin
git rebase origin/main
pnpm install --frozen-lockfile
pnpm run build
git push --force-with-lease origin nome-da-branch
```

Use `--force-with-lease` somente depois de um rebase da sua própria branch. Nunca force-push na `main`.

## Pull requests

Todo pull request deve explicar o que mudou, indicar riscos editoriais ou técnicos e confirmar que o build de produção foi executado. O merge deve ocorrer somente depois que o workflow de CI estiver verde e, quando houver mais de uma pessoa trabalhando no repositório, após uma revisão de código.

Prefira commits pequenos e focados. Evite misturar atualização de conteúdo, refatoração visual e correção de infraestrutura no mesmo commit; isso reduz a chance de conflitos e facilita a revisão.

## Publicação

A Vercel deve publicar a `main` somente depois do merge aprovado. Se a CI falhar, corrija a branch do pull request em vez de editar diretamente o commit publicado.
