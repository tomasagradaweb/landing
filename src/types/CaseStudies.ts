export interface Section {
    id: number;
    title: string;
    description: string;
    image: string;
    position: 'left' | 'right';
}

export interface CaseStudiesData {
    sections: Section[];
}