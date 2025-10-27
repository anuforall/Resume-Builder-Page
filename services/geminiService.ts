
import { GoogleGenAI } from "@google/genai";
import { ResumeData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateSummaryAndSkills = async (resumeData: ResumeData): Promise<{ summary: string; skills: string[] }> => {
    const { personal, experience, education, achievements } = resumeData;
    
    const experienceText = experience.map(exp => 
        `Job Title: ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate})\nDescription: ${exp.description}`
    ).join('\n\n');
    
    const educationText = education.map(edu => 
        `${edu.degree} from ${edu.institution} (Graduated ${edu.gradDate})`
    ).join('\n');
    
    const achievementsText = achievements.map(ach => ach.description).join(', ');

    const prompt = `
        Based on the following resume information for a person applying for a "${personal.title}" position, generate a professional summary and a list of 8 key skills.

        Resume Information:
        - Name: ${personal.name}
        - Previous Job Experiences:\n${experienceText}
        - Education:\n${educationText}
        - Achievements: ${achievementsText}

        Instructions:
        1.  **Professional Summary:** Write a concise and compelling professional summary (3-4 sentences) that highlights the candidate's key qualifications, experience, and strengths, tailored for the "${personal.title}" role.
        2.  **Key Skills:** Provide a list of 8 relevant technical and soft skills that are crucial for a "${personal.title}".

        Return the response as a JSON object with two keys: "summary" (a string) and "skills" (an array of strings).
        Do not include any markdown formatting like \`\`\`json.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text.trim();
        const parsed = JSON.parse(text);

        if (typeof parsed.summary === 'string' && Array.isArray(parsed.skills)) {
            return {
                summary: parsed.summary,
                skills: parsed.skills.filter((skill: any) => typeof skill === 'string'),
            };
        } else {
            throw new Error("Invalid JSON structure from AI response.");
        }
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        throw new Error("Failed to parse AI response. Please try again.");
    }
};
