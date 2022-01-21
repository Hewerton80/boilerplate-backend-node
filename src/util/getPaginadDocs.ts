interface IgetPaginedDocsParans<T> {
  docs: T[]
  currentPage: number
  perPage: number
  totalDocs: number
}

export const getPaginedDocs = <T = any>({
  docs,
  currentPage,
  perPage,
  totalDocs,
}: IgetPaginedDocsParans<T>) => {
  const totalPages = Math.ceil(Number(totalDocs) / Number(perPage))
  currentPage = Number(currentPage > totalPages ? totalPages : currentPage) //verifica se a página atual é maior que o total de páginas
  currentPage = currentPage <= 0 ? 1 : currentPage //verifica se a página atual é menor do que 1
  return {
    docs,
    currentPage,
    perPage: Number(perPage),
    total: Number(totalDocs),
    totalPages: Number(totalPages),
  }
}
