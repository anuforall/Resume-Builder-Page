
import React from 'react';
import { ResumeData, Template, Experience, Education, Skill, Achievement } from '../types';
import TemplateSelector from './TemplateSelector';

interface ResumeFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    template: Template;
    setTemplate: React.Dispatch<React.SetStateAction<Template>>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData, template, setTemplate }) => {
    
    const handleChange = <T,>(section: keyof ResumeData, field: keyof T, value: string, index?: number) => {
        setResumeData(prev => {
            if (index !== undefined && Array.isArray(prev[section])) {
                const newArr = [...(prev[section] as any[])];
                newArr[index] = { ...newArr[index], [field]: value };
                return { ...prev, [section]: newArr };
            }
            return {
                ...prev,
                [section]: typeof prev[section] === 'string' ? value : { ...(prev[section] as object), [field]: value }
            };
        });
    };

    const addSectionItem = (section: keyof ResumeData) => {
        setResumeData(prev => {
            const newItem = 
                section === 'experience' ? { id: crypto.randomUUID(), title: '', company: '', location: '', startDate: '', endDate: '', description: '' } :
                section === 'education' ? { id: crypto.randomUUID(), degree: '', institution: '', location: '', gradDate: '' } :
                section === 'skills' ? { id: crypto.randomUUID(), name: '' } :
                { id: crypto.randomUUID(), description: '' };
            return { ...prev, [section]: [...(prev[section] as any[]), newItem] };
        });
    };

    const removeSectionItem = (section: keyof ResumeData, id: string) => {
        setResumeData(prev => ({
            ...prev,
            [section]: (prev[section] as any[]).filter(item => item.id !== id)
        }));
    };

    return (
        <div className="space-y-8">
            <TemplateSelector selectedTemplate={template} onSelectTemplate={setTemplate} />
            <Section title="Personal Details">
                <Input label="Full Name" value={resumeData.personal.name} onChange={e => handleChange( 'personal', 'name', e.target.value)} />
                <Input label="Job Title" value={resumeData.personal.title} onChange={e => handleChange( 'personal', 'title', e.target.value)} placeholder="e.g., Senior Frontend Developer" />
                <Input label="Email" value={resumeData.personal.email} onChange={e => handleChange( 'personal', 'email', e.target.value)} type="email"/>
                <Input label="Phone Number" value={resumeData.personal.phone} onChange={e => handleChange( 'personal', 'phone', e.target.value)} />
                <Input label="Location" value={resumeData.personal.location} onChange={e => handleChange( 'personal', 'location', e.target.value)} placeholder="e.g., San Francisco, CA" />
                <Input label="Website / Portfolio" value={resumeData.personal.website} onChange={e => handleChange( 'personal', 'website', e.target.value)} placeholder="e.g., janedoe.dev" />
            </Section>

            <Section title="Professional Summary">
                <TextArea label="Summary" value={resumeData.summary} onChange={e => handleChange('summary', 'summary', e.target.value)} rows={5} placeholder="Write a brief summary about yourself..."/>
            </Section>

            <Section title="Work Experience">
                {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border rounded-md space-y-4 relative">
                        <Input label="Job Title" value={exp.title} onChange={e => handleChange<Experience>('experience', 'title', e.target.value, index)} />
                        <Input label="Company" value={exp.company} onChange={e => handleChange<Experience>('experience', 'company', e.target.value, index)} />
                        <Input label="Location" value={exp.location} onChange={e => handleChange<Experience>('experience', 'location', e.target.value, index)} />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Start Date" value={exp.startDate} onChange={e => handleChange<Experience>('experience', 'startDate', e.target.value, index)} />
                            <Input label="End Date" value={exp.endDate} onChange={e => handleChange<Experience>('experience', 'endDate', e.target.value, index)} />
                        </div>
                        <TextArea label="Description" value={exp.description} onChange={e => handleChange<Experience>('experience', 'description', e.target.value, index)} rows={4} placeholder="Describe your responsibilities and achievements..."/>
                        <button onClick={() => removeSectionItem('experience', exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <button onClick={() => addSectionItem('experience')} className="w-full py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Add Experience</button>
            </Section>
            
            <Section title="Education">
                {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border rounded-md space-y-4 relative">
                        <Input label="Degree / Field of Study" value={edu.degree} onChange={e => handleChange<Education>('education', 'degree', e.target.value, index)} />
                        <Input label="Institution" value={edu.institution} onChange={e => handleChange<Education>('education', 'institution', e.target.value, index)} />
                        <Input label="Location" value={edu.location} onChange={e => handleChange<Education>('education', 'location', e.target.value, index)} />
                        <Input label="Graduation Date" value={edu.gradDate} onChange={e => handleChange<Education>('education', 'gradDate', e.target.value, index)} />
                        <button onClick={() => removeSectionItem('education', edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <button onClick={() => addSectionItem('education')} className="w-full py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Add Education</button>
            </Section>
            
            <Section title="Skills">
                <div className="grid grid-cols-2 gap-4">
                    {resumeData.skills.map((skill, index) => (
                        <div key={skill.id} className="relative">
                            <Input label="" value={skill.name} onChange={e => handleChange<Skill>('skills', 'name', e.target.value, index)} />
                             <button onClick={() => removeSectionItem('skills', skill.id)} className="absolute top-1/2 right-2 -translate-y-1/2 text-red-500 hover:text-red-700">&times;</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => addSectionItem('skills')} className="w-full py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Add Skill</button>
            </Section>

            <Section title="Achievements / Awards">
                {resumeData.achievements.map((ach, index) => (
                    <div key={ach.id} className="relative">
                       <Input label="" value={ach.description} onChange={e => handleChange<Achievement>('achievements', 'description', e.target.value, index)} />
                        <button onClick={() => removeSectionItem('achievements', ach.id)} className="absolute top-1/2 right-2 -translate-y-1/2 text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <button onClick={() => addSectionItem('achievements')} className="w-full py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Add Achievement</button>
            </Section>
        </div>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-200 pb-2">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" {...props} />
    </div>
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" {...props} />
    </div>
);


export default ResumeForm;
