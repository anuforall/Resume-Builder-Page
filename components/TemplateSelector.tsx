
import React from 'react';
import { Template } from '../types';

interface TemplateSelectorProps {
    selectedTemplate: Template;
    onSelectTemplate: (template: Template) => void;
}

const templates = [
    { id: Template.Modern, name: 'Modern', previewClass: 'bg-gray-800' },
    { id: Template.Classic, name: 'Classic', previewClass: 'border-2 border-gray-300' },
    { id: Template.Minimal, name: 'Minimal', previewClass: 'bg-white border' },
    { id: Template.Creative, name: 'Creative', previewClass: 'bg-blue-500' },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelectTemplate }) => {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-200 pb-2 mb-4">Template</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {templates.map(template => (
                    <button
                        key={template.id}
                        onClick={() => onSelectTemplate(template.id)}
                        className={`p-2 rounded-lg border-2 transition-colors ${
                            selectedTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 hover:border-blue-400'
                        }`}
                    >
                        <div className={`h-16 w-full rounded ${template.previewClass}`}></div>
                        <p className="text-center mt-2 text-sm font-medium text-gray-700">{template.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
