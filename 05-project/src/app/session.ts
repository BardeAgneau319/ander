export interface Session {
    id: number;
    title: string;
    titleMobile: string;
    image: string;
    type: string;
    category: string;
    description: string;
    language: string;
    tags: Array<string>;
    track: {
        title: string
    };
    speakers: Array<number>;
    complexity: string;
}