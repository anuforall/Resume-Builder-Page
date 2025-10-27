
export enum Template {
    Modern = 'Modern',
    Classic = 'Classic',
    Minimal = 'Minimal',
    Creative = 'Creative',
}

export interface PersonalDetails {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    gradDate: string;
}

export interface Skill {
    id: string;
    name: string;
}

export interface Achievement {
    id: string;
    description: string;
}

export interface ResumeData {
    personal: PersonalDetails;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    achievements: Achievement[];
}

export const DEMO_DATA: ResumeData = {
    personal: {
        name: 'Jane Doe',
        title: 'Senior Frontend Developer',
        email: 'jane.doe@email.com',
        phone: '(123) 456-7890',
        location: 'San Francisco, CA',
        website: 'janedoe.dev'
    },
    summary: 'Innovative Senior Frontend Developer with 8+ years of experience building and maintaining responsive and scalable web applications. Proficient in React, TypeScript, and modern JavaScript frameworks. Passionate about creating intuitive user interfaces and delivering exceptional user experiences.',
    experience: [
        {
            id: 'exp1',
            title: 'Senior Frontend Developer',
            company: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            startDate: 'Jan 2019',
            endDate: 'Present',
            description: '- Led the development of a new customer-facing dashboard using React and Redux, resulting in a 20% increase in user engagement.\n- Mentored junior developers and conducted code reviews to ensure code quality and best practices.\n- Collaborated with UX/UI designers to translate wireframes into high-quality, reusable components.'
        },
        {
            id: 'exp2',
            title: 'Frontend Developer',
            company: 'Web Innovators',
            location: 'Palo Alto, CA',
            startDate: 'Jun 2015',
            endDate: 'Dec 2018',
            description: '- Developed and maintained client websites using HTML, CSS, and JavaScript (jQuery, Angular.js).\n- Improved website performance by 30% by optimizing assets and implementing lazy loading.\n- Worked closely with backend developers to integrate APIs and ensure seamless data flow.'
        }
    ],
    education: [
        {
            id: 'edu1',
            degree: 'B.S. in Computer Science',
            institution: 'University of California, Berkeley',
            location: 'Berkeley, CA',
            gradDate: 'May 2015'
        }
    ],
    skills: [
        { id: 'skill1', name: 'React.js' },
        { id: 'skill2', name: 'TypeScript' },
        { id: 'skill3', name: 'JavaScript (ES6+)' },
        { id: 'skill4', name: 'Node.js' },
        { id: 'skill5', name: 'Tailwind CSS' },
        { id: 'skill6', name: 'GraphQL' },
        { id: 'skill7', name: 'Webpack' },
        { id: 'skill8', name: 'Jest & RTL' },
    ],
    achievements: [
        { id: 'ach1', description: 'Speaker at React Conference 2022 on "State Management at Scale".' },
        { id: 'ach2', description: 'Open Source Contributor to a popular UI component library.' },
    ]
};
