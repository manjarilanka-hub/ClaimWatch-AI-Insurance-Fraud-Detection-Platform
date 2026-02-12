
import React, { useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { 
  ShieldCheck, BrainCircuit, Activity, FileText, Database, Code, 
  Zap, BarChart3, ChevronRight, AlertTriangle, CheckCircle2, User, 
  MapPin, DollarSign, Wind
} from 'lucide-react';
import { analyzeClaim } from './services/geminiService';
import SectionHeader from './components/SectionHeader';
import InfoCard from './components/InfoCard';
import { SECTIONS, PERFORMANCE_METRICS, MOCK_CLAIMS, COLORS } from './constants';
import { AssessmentResponse } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [simulatorInput, setSimulatorInput] = useState({
    farmerName: 'Emily Vance',
    cropType: 'Corn',
    claimedAmount: 25000,
    yieldLossPercentage: 90,
    weatherAnomalyScore: 0.1,
    previousClaims: 3
  });
  const [analysisResult, setAnalysisResult] = useState<AssessmentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await analyzeClaim(simulatorInput);
      setAnalysisResult(res);
    } catch (e) {
      alert("Analysis failed. Please check your API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-700 w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-gray-900">AgriGuard <span className="text-green-700">AI</span></span>
            </div>
            <div className="hidden md:flex space-x-8">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`text-sm font-medium transition-colors ${activeSection === s.id ? 'text-green-700' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-green-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">AI-Based Agricultural Insurance Fraud Detection</h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Mitigating financial risks and ensuring agricultural stability through advanced machine learning architectures. 
              A data-driven approach to genuine claim verification.
            </p>
            <div className="flex gap-4">
              <button onClick={() => document.getElementById('simulator')?.scrollIntoView({behavior: 'smooth'})} className="bg-white text-green-900 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors flex items-center gap-2">
                Launch Simulator <ChevronRight size={18} />
              </button>
              <button onClick={() => document.getElementById('solutions')?.scrollIntoView({behavior: 'smooth'})} className="border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors">
                View Solutions
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-20">
          <SectionHeader 
            title="Executive Summary" 
            subtitle="The agricultural sector is highly vulnerable to both climate change and insurance fraud. AgriGuard AI leverages historical weather data, yield records, and claim patterns to identify anomalies with high precision." 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-green-700 mb-4"><Zap size={32} /></div>
              <h4 className="font-bold text-lg mb-2">Automated Verification</h4>
              <p className="text-gray-600 text-sm">Reduces claim processing time from weeks to hours by flagging obvious frauds instantly.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-green-700 mb-4"><BrainCircuit size={32} /></div>
              <h4 className="font-bold text-lg mb-2">Pattern Recognition</h4>
              <p className="text-gray-600 text-sm">Identifies complex fraudulent networks where multiple farmers coordinate false claims.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-green-700 mb-4"><Activity size={32} /></div>
              <h4 className="font-bold text-lg mb-2">Dynamic Risk Scoring</h4>
              <p className="text-gray-600 text-sm">Real-time risk assessment based on live satellite data and weather anomaly feeds.</p>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="scroll-mt-20">
          <SectionHeader title="Core Solutions" subtitle="Comprehensive methodologies implemented to address specific fraud vectors in the agricultural insurance domain." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard 
              title="Fraud Classification" 
              icon={<ShieldCheck />}
              description="Utilizes binary classification models to categorize incoming claims into 'Genuine' or 'Fraudulent'. It looks at over 45 distinct features including soil moisture, rainfall, and crop cycle timing."
              tags={['Supervised Learning', 'Binary Classification']}
            />
            <InfoCard 
              title="Claim Pattern Analysis" 
              icon={<BrainCircuit />}
              description="Identifies multi-year repetition of loss in specific areas where weather reports indicate favorable conditions. Detects clusters of claims that deviate from regional averages."
              tags={['Unsupervised Anomaly Detection', 'Spatial Clustering']}
            />
            <InfoCard 
              title="Risk Scoring" 
              icon={<Activity />}
              description="Each claim is assigned a score from 0 to 100. High scores trigger immediate human investigation, while low scores are funneled through an 'Express Path' for faster payouts."
              tags={['Probability Estimation', 'Ranking Systems']}
            />
            <InfoCard 
              title="Decision Support System" 
              icon={<FileText />}
              description="A dashboard for insurance officers providing local weather visualizations, historical farm performance, and specific 'reasons for flagging' generated by the AI."
              tags={['UI/UX Design', 'Explainable AI']}
            />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="scroll-mt-20">
          <SectionHeader title="Technology Stack" subtitle="A robust architecture built on industry-standard tools for reliability, scalability, and high performance." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-700"><Code /></div>
                <div>
                  <h4 className="font-bold text-lg">Python Core</h4>
                  <p className="text-gray-600">The primary language for data manipulation, modeling, and API integration.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-yellow-50 rounded-lg text-yellow-700"><Database /></div>
                <div>
                  <h4 className="font-bold text-lg">Pandas & NumPy</h4>
                  <p className="text-gray-600">Essential for handling large-scale agricultural datasets and performing vectorized calculations.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-green-50 rounded-lg text-green-700"><BrainCircuit /></div>
                <div>
                  <h4 className="font-bold text-lg">XGBoost & Scikit-learn</h4>
                  <p className="text-gray-600">Extreme Gradient Boosting for classification accuracy and Scikit-learn for model evaluation and preprocessing.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
              <h4 className="text-xl font-bold mb-4">Why XGBoost?</h4>
              <ul className="text-left space-y-3 text-gray-700">
                <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600" size={16} /> Superior handling of sparse insurance data</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600" size={16} /> Built-in regularization to prevent overfitting</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600" size={16} /> Parallel processing for large claim histories</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600" size={16} /> Efficiently handles non-linear farm features</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="workflow" className="scroll-mt-20">
          <SectionHeader title="Operational Workflow" subtitle="The journey of a claim from ingestion to decision." />
          <div className="relative">
            <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-gray-200 hidden md:block"></div>
            <div className="space-y-12">
              {[
                { step: '01', title: 'Data Collection', desc: 'Ingestion of farmer profiles, claim history, and external weather API data (NASA POWER/OpenWeather).' },
                { step: '02', title: 'Preprocessing', desc: 'Cleaning missing values, normalizing claim amounts, and feature engineering (e.g., Rainfall Deficit Index).' },
                { step: '03', title: 'ML Prediction', desc: 'Claims are processed through the trained XGBoost model for classification and risk scoring.' },
                { step: '04', title: 'DSS Dashboard', desc: 'Insurance officers review flagged claims with visual evidence provided by the AI analysis.' }
              ].map((item, idx) => (
                <div key={idx} className={`relative flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <span className="text-green-700 font-bold text-sm uppercase tracking-widest">{item.step}</span>
                    <h5 className="text-lg font-bold mt-1 mb-2">{item.title}</h5>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 bg-green-700 rounded-full border-4 border-white hidden md:flex items-center justify-center text-white text-xs font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simulator Section */}
        <section id="simulator" className="scroll-mt-20 bg-gray-900 text-white p-8 md:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Interactive Fraud Simulator</h3>
              <p className="text-gray-400 mb-8">Input theoretical claim parameters to see how the AI detects potential fraudulent behavior.</p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Farmer Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none" 
                      value={simulatorInput.farmerName} 
                      onChange={e => setSimulatorInput({...simulatorInput, farmerName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Crop Type</label>
                    <select 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none"
                      value={simulatorInput.cropType}
                      onChange={e => setSimulatorInput({...simulatorInput, cropType: e.target.value})}
                    >
                      <option>Corn</option>
                      <option>Wheat</option>
                      <option>Soybeans</option>
                      <option>Cotton</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Claim Amount ($)</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none" 
                      value={simulatorInput.claimedAmount}
                      onChange={e => setSimulatorInput({...simulatorInput, claimedAmount: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Previous Claims (3yr)</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none" 
                      value={simulatorInput.previousClaims}
                      onChange={e => setSimulatorInput({...simulatorInput, previousClaims: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Yield Loss ({simulatorInput.yieldLossPercentage}%)</label>
                    <input 
                      type="range" min="0" max="100" 
                      className="w-full accent-green-500" 
                      value={simulatorInput.yieldLossPercentage}
                      onChange={e => setSimulatorInput({...simulatorInput, yieldLossPercentage: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Weather Anomaly (0-1: {simulatorInput.weatherAnomalyScore})</label>
                    <input 
                      type="range" min="0" max="1" step="0.1" 
                      className="w-full accent-blue-500" 
                      value={simulatorInput.weatherAnomalyScore}
                      onChange={e => setSimulatorInput({...simulatorInput, weatherAnomalyScore: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSimulate}
                  disabled={loading}
                  className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <><Activity size={18} /> Run AI Analysis</>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex flex-col min-h-[400px]">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BrainCircuit size={20} className="text-green-500" />
                Analysis Result
              </h4>
              
              {analysisResult ? (
                <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700">
                    <div>
                      <span className="text-xs text-gray-400 uppercase font-bold">Classification</span>
                      <p className={`text-2xl font-black ${analysisResult.fraudClassification === 'Genuine' ? 'text-green-500' : 'text-red-500'}`}>
                        {analysisResult.fraudClassification.toUpperCase()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 uppercase font-bold">Risk Score</span>
                      <p className="text-3xl font-black">{analysisResult.riskScore}/100</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400 uppercase font-bold mb-2 block">AI Reasoning</span>
                    <p className="text-gray-300 text-sm leading-relaxed italic bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                      "{analysisResult.reasoning}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-900/20 rounded-xl border border-green-900/30">
                    <AlertTriangle size={24} className="text-amber-500" />
                    <div>
                      <span className="text-xs text-gray-400 uppercase font-bold">Recommendation</span>
                      <p className="text-sm font-medium">{analysisResult.recommendedAction}</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Model Confidence</span>
                      <span>{(analysisResult.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{width: `${analysisResult.confidence * 100}%`}}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
                  <Activity size={48} className="mb-4 opacity-20" />
                  <p>Run simulation to generate detection report</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Performance Metrics Section */}
        <section id="metrics" className="scroll-mt-20">
          <SectionHeader title="Performance Metrics" subtitle="Evaluation of the trained XGBoost model using industry-standard statistical indicators." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[450px]">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <h4 className="font-bold mb-4 text-center">Metric Radar Plot</h4>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PERFORMANCE_METRICS}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="AgriGuard" dataKey="value" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <h4 className="font-bold mb-4 text-center">Score Comparisons</h4>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_METRICS}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-700 w-6 h-6" />
              <span className="text-lg font-bold tracking-tight text-gray-900">AgriGuard AI</span>
            </div>
            <p className="text-gray-500 text-sm text-center">
              © 2024 Final Year Project - Department of AI & Machine Learning. <br className="md:hidden" />
              Focused on Agricultural Resilience.
            </p>
            <div className="flex gap-6">
              <button className="text-gray-400 hover:text-green-700 transition-colors"><User size={20} /></button>
              <button className="text-gray-400 hover:text-green-700 transition-colors"><MapPin size={20} /></button>
              <button className="text-gray-400 hover:text-green-700 transition-colors"><Wind size={20} /></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
