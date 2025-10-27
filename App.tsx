
import React, { useState, useRef, useCallback } from 'react';
import { ResumeData, Template, DEMO_DATA } from './types';
import { generateSummaryAndSkills } from './services/geminiService';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { DownloadIcon, SparklesIcon, LoaderIcon } from './components/icons';

declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(DEMO_DATA);
  const [template, setTemplate] = useState<Template>(Template.Modern);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const handleGenerateAIContent = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const { summary, skills } = await generateSummaryAndSkills(resumeData);
      setResumeData(prev => ({
        ...prev,
        summary,
        skills: skills.map(skill => ({ id: crypto.randomUUID(), name: skill }))
      }));
    } catch (err) {
      setError('Failed to generate AI content. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }, [resumeData]);

  const handleDownloadPdf = () => {
    const input = resumePreviewRef.current;
    if (input) {
      window.html2canvas(input, { scale: 2 }).then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width / 2, canvas.height / 2],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save(`Resume-${resumeData.personal.name.replace(' ', '-')}.pdf`);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800">AI Resume Builder</h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={handleGenerateAIContent}
              disabled={isGenerating}
              className="flex items-center justify-center px-3 sm:px-4 py-2 bg-accent text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isGenerating ? <LoaderIcon className="animate-spin -ml-1 mr-2 h-5 w-5" /> : <SparklesIcon className="mr-2 h-5 w-5" />}
              {isGenerating ? 'Generating...' : 'AI Generate'}
            </button>
            <button
              onClick={handleDownloadPdf}
              className="flex items-center justify-center px-3 sm:px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-900 transition-colors text-sm sm:text-base"
            >
              <DownloadIcon className="mr-2 h-5 w-5" />
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="container mx-auto mt-4 px-4 sm:px-6 lg:px-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        </div>
      )}


      <main className="container mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg overflow-y-auto" style={{maxHeight: 'calc(100vh - 120px)'}}>
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} template={template} setTemplate={setTemplate} />
        </div>
        <div className="lg:col-span-3">
          <div className="sticky top-8">
             <ResumePreview ref={resumePreviewRef} data={resumeData} template={template} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
