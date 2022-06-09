import { Observable } from "rxjs";
import { Speaker } from "./speaker";

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
    speakers: Array<Speaker>;
    complexity: string;
}

export interface SessionResponse extends Omit<Session, "speakers"> {
    speakers: Array<number>;
}