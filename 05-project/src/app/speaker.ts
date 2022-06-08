export interface Speaker {
    id: number;
    name: string;
    featured: boolean;
    company: string;
    companyLogo: string;
    country: string;
    photoUrl: string;
    shortBio: string;
    bio: string;
    tags: Array<string>;
    badges: Array<string>;
    socials: Array<{
        icon: string;
        name: string;
        link: string;
    }>;
    
}