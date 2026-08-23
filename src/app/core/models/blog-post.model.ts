export interface BlogPost {
    title: string,
    url: string,
    thumbnailImage?: string | null,
    content: string,
    tags: Tag[],
}

export interface Tag {
    name: string
}