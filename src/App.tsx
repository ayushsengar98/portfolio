import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Stars, ContactShadows } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { resumeData } from './data';
import { motion } from 'framer-motion';

function BackgroundGeometries() {
  const group = useRef<THREE.Group>(null!);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((_state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scrollY * -0.005, 0.1);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
        <group position={[8, -3, -10]} rotation={[0.3, -0.5, 0]} scale={1.2}>
          {/* Laptop Base */}
          <mesh position={[0, -0.1, 0]} castShadow>
            <boxGeometry args={[3, 0.2, 2]} />
            <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Laptop Screen */}
          <mesh position={[0, 1, -0.9]} rotation={[-0.2, 0, 0]} castShadow>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Glowing Screen Inner */}
          <mesh position={[0, 1, -0.84]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[2.8, 1.8, 0.01]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </Float>

      {/* A floating server/database block to represent backend skills */}
      <Float speed={3} rotationIntensity={1.5} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
        <mesh position={[-4, -5, -8]} castShadow>
          <cylinderGeometry args={[1, 1, 3, 32]} />
          <meshStandardMaterial color="#3b82f6" wireframe emissive="#3b82f6" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={2} floatingRange={[-1, 1]}>
         <mesh position={[5, -15, -6]} castShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#10b981" wireframe emissive="#10b981" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

function App() {
  const [selectedExp, setSelectedExp] = useState<any>(null);

  return (
    <div className="relative w-full bg-slate-950 font-sans min-h-screen text-white selection:bg-sky-500/30">
      
      {/* 3D Background Fixed Container */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 5, 30]} />
          
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#38bdf8" />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <BackgroundGeometries />
            <ContactShadows position={[0, -10, 0]} opacity={0.3} scale={40} blur={2} far={10} color="#000" />
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground Scrollable Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 space-y-24">
        
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left pt-8"
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 tracking-tighter mb-4">
            {resumeData.name}
          </h1>
          <p className="text-xl md:text-2xl font-bold text-sky-200 tracking-wide uppercase mb-6">
            {resumeData.title}
          </p>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl glass-panel p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
            {resumeData.about}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
             <a href={`mailto:${resumeData.contact.email}`} target="_blank" rel="noreferrer" className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-900 border border-sky-400 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all font-bold flex items-center gap-2">
               ✉️ Email Me
             </a>
             <a href="https://www.linkedin.com/in/ayush-sengar-936515194/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-sm transition-all font-semibold flex items-center gap-2 text-white">
               💼 LinkedIn
             </a>
             <a href={`${import.meta.env.BASE_URL}resume.pdf`} download="Ayush_Sengar_Resume.pdf" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-sm transition-all font-semibold flex items-center gap-2 text-white">
               📄 Download PDF
             </a>
             <span className="px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm font-semibold text-slate-300">📞 {resumeData.contact.phone}</span>
          </div>
        </motion.header>

        {/* Experience Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black text-white mb-12 tracking-tight flex items-center gap-4">
            Experience
          </h2>
          <div className="overflow-hidden w-full pb-8">
            <div className="animate-marquee hover:play-state-paused flex gap-6">
              {[...resumeData.experience, ...resumeData.experience].map((exp, i) => (
                <div 
                  key={i}
                  onClick={() => setSelectedExp(exp)}
                  className="min-w-[300px] md:min-w-[350px] cursor-pointer p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all shadow-xl group flex flex-col h-64"
                >
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{exp.role}</h3>
                    <div className="text-blue-400 font-semibold mb-auto">{exp.company}</div>
                    
                    <div className="mt-6 flex items-center justify-between">
                       <span className="text-sm text-slate-400 font-mono bg-slate-800/50 px-3 py-1 rounded-md">{exp.period}</span>
                       <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">View Details →</span>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Key Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black text-white mb-12 tracking-tight flex items-center gap-4">
            Key Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resumeData.achievements.map((ach, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all shadow-xl hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="text-xl font-bold text-yellow-300 mb-3">{ach.company}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{ach.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black text-white mb-12 tracking-tight flex items-center gap-4">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
                <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-6">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill: string) => (
                    <span key={skill} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl text-sm font-semibold shadow-sm hover:bg-emerald-500/20 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black text-white mb-12 tracking-tight flex items-center gap-4">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.projects.map((proj, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-violet-500/50 transition-all shadow-xl group"
              >
                <h4 className="text-2xl font-bold text-white group-hover:text-violet-400 transition-colors mb-4">{proj.name}</h4>
                <p className="text-slate-300 leading-relaxed mb-6">{proj.description}</p>
                {proj.url && (
                  <a href={proj.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-bold transition-colors">
                    {proj.url.includes('github.com') ? 'View on GitHub' : 'Live Site'} <span className="text-xl">↗</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="pb-32"
        >
          <h2 className="text-4xl font-black text-white mb-12 tracking-tight flex items-center gap-4">
            Education
          </h2>
          <div className="space-y-6">
            {resumeData.education.map((edu, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                  <p className="text-pink-400 font-medium">{edu.institution}</p>
                </div>
                <div className="mt-4 md:mt-0 text-slate-500 font-mono text-sm px-4 py-2 bg-slate-800/50 rounded-lg">
                  {edu.period}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA Footer */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="pb-32 text-center"
        >
          <div className="p-12 rounded-3xl bg-gradient-to-b from-sky-900/20 to-slate-900/80 backdrop-blur-xl border border-sky-500/20 shadow-[0_0_50px_rgba(56,189,248,0.1)]">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to build something amazing?</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              I am currently open to new opportunities. Whether you have a question, a project, or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <a href={`mailto:${resumeData.contact.email}`} target="_blank" rel="noreferrer" className="px-8 py-4 text-lg bg-sky-500 hover:bg-sky-400 text-slate-900 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all font-bold">
                Get In Touch
              </a>
              <a href="https://www.linkedin.com/in/ayush-sengar-936515194/" target="_blank" rel="noreferrer" className="px-8 py-4 text-lg bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all font-bold">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.section>

      </div>

      {/* Experience Modal Popup */}
      {selectedExp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedExp(null)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8 max-h-[80vh] overflow-y-auto scrollbar-hide"
          >
            <button 
              onClick={() => setSelectedExp(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              ✕
            </button>
            <h3 className="text-3xl font-black text-white mb-2 pr-8">{selectedExp.role}</h3>
            <div className="text-xl text-blue-400 font-semibold mb-6">{selectedExp.company}</div>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm text-slate-300 font-mono bg-slate-800 px-3 py-1 rounded-md">📅 {selectedExp.period}</span>
              <span className="text-sm text-slate-300 font-mono bg-slate-800 px-3 py-1 rounded-md">📍 {selectedExp.location}</span>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">Key Responsibilities & Impact</h4>
              <ul className="space-y-4">
                {selectedExp.highlights.map((h: string, j: number) => (
                  <li key={j} className="text-slate-200 text-base leading-relaxed p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;
