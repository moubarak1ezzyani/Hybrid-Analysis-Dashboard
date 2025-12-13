'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock } from 'lucide-react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/Login' : '/Register';
    
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Correspond exactement à votre classe UserAuth(BaseModel)
        body: JSON.stringify({ 
            username: username, 
            password: password 
        }),
      });
      
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || 'Erreur serveur');

      if (isLogin) {
        // CORRECTION MAJEURE : Votre backend renvoie "access token" avec un espace
        if (data["access token"]) {
            localStorage.setItem('token', data["access token"]);
            router.push('/dashboard');
        } else {
            throw new Error("Token non reçu du serveur");
        }
      } else {
        alert("Succès ! Connectez-vous maintenant.");
        setIsLogin(true);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">
            {isLogin ? 'Connexion' : 'Inscription'}
        </h1>
        
        <div className="mb-4 relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            className="w-full bg-gray-700 p-3 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required
          />
        </div>
        
        <div className="mb-6 relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            className="w-full bg-gray-700 p-3 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required
          />
        </div>
        
        <button className="w-full bg-blue-600 p-3 rounded font-bold hover:bg-blue-700 transition">
            {isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
        
        <p className="mt-4 text-center text-sm text-gray-400 cursor-pointer hover:text-white" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Créer un compte" : "J'ai déjà un compte"}
        </p>
      </form>
    </div>
  );
}