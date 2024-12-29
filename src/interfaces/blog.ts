// src/interfaces/blog.ts

export default interface Blog {
    id: number;
    documentId: string;
    Title: string;
    Description: Array<{
        type: string;
        children: Array<{
            type: string;
            text: string;
        }>;
    }>;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    Cover?: { // Cambiado de 'cover' a 'Cover'
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
            thumbnail: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            medium: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            small: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            large: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any | null;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
    category?: string;
}
