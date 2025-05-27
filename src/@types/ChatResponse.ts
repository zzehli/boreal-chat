export interface ReferenceItem {
    title: string,
    index: number,
    url: string
}
export interface ChatResponse {
    message: string
    references: ReferenceItem[]
}