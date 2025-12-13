'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, LogOut, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    // Protection basique de la route
    if (!localStorage.getItem('token')) router.push('/');
  }, [router]);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch(`${API_URL}/AnalyzeText`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            // On envoie le token même si votre route AnalyzeText actuelle ne le vérifie pas encore strictement (Depends)
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        // CORRECTION MAJEURE : La clé doit être "text_input" pour matcher class AnalyzeText(BaseModel)
        body: JSON.stringify({ text_input: text }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.detail || "Erreur d'analyse");
      
      setResult(data);
      
    } catch (e: any) { 
        alert(e.message || "Erreur de connexion"); 
    } finally { 
        setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Orchestrateur IA</h1>
            <button 
                onClick={() => { localStorage.removeItem('token'); router.push('/'); }} 
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
            >
                <LogOut size={20}/> Déconnexion
            </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4">
        {/* Zone de saisie */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Texte à analyser</label>
          <textarea 
            className="w-full border border-gray-300 p-4 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
            placeholder="Entrez votre texte ici (ex: demande de remboursement, question technique...)" 
            value={text} 
            onChange={e => setText(e.target.value)} 
          />
          <div className="flex justify-end mt-4">
            <button 
                onClick={handleAnalyze} 
                disabled={loading || !text} 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
            >
                {loading ? <><Loader2 className="animate-spin" size={18}/> Traitement...</> : <><Send size={18}/> Analyser avec IA</>}
            </button>
          </div>
        </div>

        {/* Zone de résultats */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Carte Hugging Face */}
            <div className="bg-white p-0 rounded-xl shadow-md overflow-hidden border border-yellow-100">
              <div className="bg-yellow-50 p-4 border-b border-yellow-100">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                    🤖 Classification (Hugging Face)
                </h3>
              </div>
              <div className="p-6">
                <pre className="text-sm bg-gray-50 p-4 rounded border overflow-auto max-h-60 text-gray-700 font-mono">
                    {/* Correspond à la clé renvoyée par main.py: "result_hugg" */}
                    {JSON.stringify(result.result_hugg, null, 2)}
                </pre>
              </div>
            </div>

            {/* Carte Gemini */}
            <div className="bg-white p-0 rounded-xl shadow-md overflow-hidden border border-purple-100">
              <div className="bg-purple-50 p-4 border-b border-purple-100">
                <h3 className="font-bold text-purple-800 flex items-center gap-2">
                    ✨ Résumé & Synthèse (Gemini)
                </h3>
              </div>
              <div className="p-6">
                {/* Correspond à la clé renvoyée par main.py: "result gemini" */}
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {result["result gemini"]}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}