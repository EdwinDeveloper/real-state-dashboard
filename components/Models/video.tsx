export interface Video {
    kind: string,
    etag: string,
    nextPageToken: string,
    regionCode: string,
    items: Item[],
}

export interface Item {
    etag: string,
    id: Id,
    kind: string,
    snippet: Snippet,
}

interface Id {
    kind: string,
    videoId: string,
}

interface Snippet {
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: string,
    publishTime: string,
    publishedAt: string,
    title: string,
}