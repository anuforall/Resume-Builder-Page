
import React, { forwardRef } from 'react';
import { ResumeData, Template } from '../types';

interface ResumePreviewProps {
    data: ResumeData;
    template: Template;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, template }, ref) => {
    const { personal, summary, experience, education, skills, achievements } = data;

    const templateStyles = {
        [Template.Modern]: {
            container: 'font-sans bg-white text-gray-800',
            header: 'bg-gray-800 text-white p-8 text-center',
            name: 'text-4xl font-bold tracking-wider',
            title: 'text-xl font-light text-blue-300 mt-2',
            contact: 'flex justify-center space-x-6 mt-4 text-sm text-gray-300',
            body: 'p-8 grid grid-cols-3 gap-8',
            leftCol: 'col-span-2',
            rightCol: 'col-span-1',
            sectionTitle: 'text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4',
            sectionContent: 'text-sm',
            itemTitle: 'font-bold text-md',
            itemSubtitle: 'text-gray-600 text-sm',
            itemDate: 'text-gray-500 text-sm italic',
            skill: 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs',
        },
        [Template.Classic]: {
            container: 'font-serif bg-white text-gray-900',
            header: 'p-8 text-center border-b-2 border-gray-300',
            name: 'text-5xl font-serif tracking-widest',
            title: 'text-lg text-gray-600 mt-2 tracking-wider',
            contact: 'flex justify-center space-x-6 mt-4 text-sm text-gray-600',
            body: 'p-8',
            leftCol: '',
            rightCol: '',
            sectionTitle: 'text-2xl font-serif tracking-wider border-b border-gray-300 pb-1 mb-4 mt-6',
            sectionContent: 'text-sm',
            itemTitle: 'font-bold text-md',
            itemSubtitle: 'text-gray-700 italic',
            itemDate: 'text-gray-500 text-sm',
            skill: 'mr-2 mb-2 inline-block',
        },
        [Template.Minimal]: {
            container: 'font-sans bg-white text-gray-700',
            header: 'p-8',
            name: 'text-3xl font-light',
            title: 'text-lg text-gray-500',
            contact: 'flex space-x-4 mt-2 text-xs text-gray-500',
            body: 'p-8 pt-0',
            leftCol: '',
            rightCol: '',
            sectionTitle: 'text-sm font-bold uppercase tracking-widest text-gray-500 mt-6 mb-2',
            sectionContent: 'text-sm',
            itemTitle: 'font-semibold',
            itemSubtitle: 'text-gray-600',
            itemDate: 'text-gray-400 text-xs',
            skill: 'text-sm',
        },
        [Template.Creative]: {
            container: 'font-sans bg-white text-gray-800',
            header: 'p-8 flex items-center justify-between bg-blue-50',
            name: 'text-4xl font-extrabold text-blue-800',
            title: 'text-xl font-medium text-blue-600',
            contact: 'text-right text-xs',
            body: 'p-8 grid grid-cols-5 gap-8',
            leftCol: 'col-span-2 border-r-2 border-blue-100 pr-8',
            rightCol: 'col-span-3',
            sectionTitle: 'text-lg font-bold text-blue-800 mb-3',
            sectionContent: 'text-sm',
            itemTitle: 'font-bold text-md',
            itemSubtitle: 'text-gray-600',
            itemDate: 'text-blue-500 text-xs font-semibold',
            skill: 'bg-blue-500 text-white px-3 py-1 text-xs rounded-sm',
        }
    };

    const s = templateStyles[template];
    
    const renderDescription = (text: string) => (
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
            {text.split('\n').map((line, i) => line.trim() ? <li key={i}>{line.replace(/^- /, '')}</li> : null)}
        </ul>
    );

    const isModernCreative = template === Template.Modern || template === Template.Creative;
    const isClassicMinimal = template === Template.Classic || template === Template.Minimal;

    return (
        <div ref={ref} className={`w-full max-w-[800px] mx-auto shadow-2xl ${s.container}`} style={{ aspectRatio: '1 / 1.414' }}>
            <div className={s.header}>
                <div>
                    <h2 className={s.name}>{personal.name}</h2>
                    <p className={s.title}>{personal.title}</p>
                </div>
                <div className={s.contact}>
                    <span>{personal.email}</span>
                    {personal.phone && <span>| {personal.phone}</span>}
                    {personal.location && <span>| {personal.location}</span>}
                    {personal.website && <span>| {personal.website}</span>}
                </div>
            </div>

            <div className={s.body}>
                <div className={`${isModernCreative ? s.leftCol : ''}`}>
                    {isModernCreative && (
                        <>
                            <section>
                                <h3 className={s.sectionTitle}>{template === Template.Creative ? 'Info' : 'Skills'}</h3>
                                <div className={`${s.sectionContent} ${template === Template.Modern ? 'flex flex-wrap gap-2' : 'space-y-1'}`}>
                                    {skills.map(skill => <span key={skill.id} className={s.skill}>{skill.name}</span>)}
                                </div>
                            </section>
                            <section className="mt-6">
                                <h3 className={s.sectionTitle}>{template === Template.Creative ? 'Contact' : 'Education'}</h3>
                                {template === Template.Creative ? (
                                    <div className={`${s.sectionContent} space-y-1`}>
                                        <p>{personal.email}</p>
                                        <p>{personal.phone}</p>
                                        <p>{personal.location}</p>
                                        <p>{personal.website}</p>
                                    </div>
                                ): (
                                     education.map(edu => (
                                        <div key={edu.id} className="mb-4">
                                            <h4 className={s.itemTitle}>{edu.degree}</h4>
                                            <p className={s.itemSubtitle}>{edu.institution}</p>
                                            <p className={s.itemDate}>{edu.gradDate}</p>
                                        </div>
                                    ))
                                )}
                            </section>
                        </>
                    )}
                    {isClassicMinimal && (
                         <section>
                            <h3 className={s.sectionTitle}>Summary</h3>
                            <p className={`${s.sectionContent} text-gray-700`}>{summary}</p>
                        </section>
                    )}
                </div>

                <div className={`${isModernCreative ? s.rightCol : ''}`}>
                     {isModernCreative && (
                        <section>
                            <h3 className={s.sectionTitle}>Summary</h3>
                            <p className={`${s.sectionContent} text-gray-700`}>{summary}</p>
                        </section>
                    )}
                    <section className={`${isModernCreative ? 'mt-6': ''}`}>
                        <h3 className={s.sectionTitle}>Experience</h3>
                        <div className={s.sectionContent}>
                            {experience.map(exp => (
                                <div key={exp.id} className="mb-5">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className={s.itemTitle}>{exp.title}</h4>
                                        <span className={s.itemDate}>{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className={s.itemSubtitle}>{exp.company} | {exp.location}</p>
                                    {renderDescription(exp.description)}
                                </div>
                            ))}
                        </div>
                    </section>
                     {isClassicMinimal && (
                        <>
                         <section>
                            <h3 className={s.sectionTitle}>Education</h3>
                                <div className={s.sectionContent}>
                                    {education.map(edu => (
                                    <div key={edu.id} className="mb-4">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className={s.itemTitle}>{edu.degree}</h4>
                                            <p className={s.itemDate}>{edu.gradDate}</p>
                                        </div>
                                        <p className={s.itemSubtitle}>{edu.institution}</p>
                                    </div>
                                    ))}
                                </div>
                            </section>
                            <section>
                                <h3 className={s.sectionTitle}>Skills</h3>
                                <div className={`${s.sectionContent} flex flex-wrap gap-2`}>
                                     {skills.map(skill => <span key={skill.id} className={s.skill}>{skill.name}</span>)}
                                </div>
                            </section>
                        </>
                    )}
                    {achievements.length > 0 && (
                        <section className="mt-6">
                            <h3 className={s.sectionTitle}>Achievements</h3>
                            <div className={s.sectionContent}>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    {achievements.map(ach => (
                                        <li key={ach.id}>{ach.description}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
});

export default ResumePreview;
