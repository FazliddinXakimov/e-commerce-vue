export default interface Filter {
    page_size: number,
    page: number,
    search: string | null,
    brands: number | null
    category: number | null
  }