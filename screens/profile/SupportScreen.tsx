import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, User, Phone, Mail, MapPin, Plus, CheckCircle2, 
  Clock, AlertCircle, MessageSquare, ChevronDown, ChevronUp, 
  HelpCircle, Trash2, Check, ExternalLink, RefreshCw 
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: 'Basse' | 'Moyenne' | 'Haute' | 'Urgente';
  status: 'Ouvert' | 'En cours' | 'Résolu';
  date: string;
  description: string;
}

interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  action?: 'whatsapp';
}

export const SupportScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'chat' | 'faq'>('tickets');
  
  // Tickets CRUD State
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('cerclehub_support_tickets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Ignored
      }
    }
    return [
      {
        id: 'TCK-2026-081',
        subject: 'Téléchargement hors-ligne sur tablette Android',
        category: 'Technique',
        priority: 'Moyenne',
        status: 'Résolu',
        date: '28/01/2026',
        description: 'La synchronisation des vidéos en 1080p prenait du temps avec une connexion mobile. Résolu après nettoyage du cache.'
      },
      {
        id: 'TCK-2026-114',
        subject: 'Attestation de participation pour mon employeur',
        category: 'Attestations & Diplômes',
        priority: 'Haute',
        status: 'En cours',
        date: '02/02/2026',
        description: 'Demande d\'édition d\'une attestation de présence signée avec tampon officiel Amanitech SARL.'
      }
    ];
  });

  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState('Accès aux cours');
  const [newPriority, setNewPriority] = useState<'Basse' | 'Moyenne' | 'Haute' | 'Urgente'>('Moyenne');
  const [newDescription, setNewDescription] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) {
      showToast('Veuillez remplir le sujet et la description du ticket.');
      return;
    }

    const ticket: Ticket = {
      id: `TCK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      subject: newSubject.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'Ouvert',
      date: new Date().toLocaleDateString('fr-FR'),
      description: newDescription.trim()
    };

    const updated = [ticket, ...tickets];
    setTickets(updated);
    try {
      localStorage.setItem('cerclehub_support_tickets', JSON.stringify(updated));
    } catch {
      // Ignored
    }

    setNewSubject('');
    setNewDescription('');
    setShowNewTicketModal(false);
    showToast(`Ticket ${ticket.id} créé avec succès ! Notre équipe va vous répondre.`);
  };

  const handleDeleteTicket = (id: string) => {
    const updated = tickets.filter(t => t.id !== id);
    setTickets(updated);
    try {
      localStorage.setItem('cerclehub_support_tickets', JSON.stringify(updated));
    } catch {
      // Ignored
    }
    showToast('Ticket archivé.');
  };

  const handleToggleResolved = (id: string) => {
    const updated = tickets.map(t => {
      if (t.id === id) {
        const nextStatus: Ticket['status'] = t.status === 'Résolu' ? 'En cours' : 'Résolu';
        return { ...t, status: nextStatus };
      }
      return t;
    });
    setTickets(updated);
    try {
      localStorage.setItem('cerclehub_support_tickets', JSON.stringify(updated));
    } catch {
      // Ignored
    }
  };

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, type: 'bot', text: 'Bonjour ! Bienvenue au service d\'assistance Amanitech Academy Kinshasa. Comment pouvons-nous vous accompagner aujourd\'hui ?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendChat = (text: string = chatInput) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "Merci pour votre message. Un conseiller académique a pris en charge votre requête.";
      let action: 'whatsapp' | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('certificat') || lower.includes('diplome')) {
        reply = "Vos certificats officiels sont générés automatiquement dès que vous terminez 100% des cours et validez les quiz avec 70% ou plus. Vous pouvez les télécharger dans la section 'Mes Certificats'.";
      } else if (lower.includes('cours') || lower.includes('video')) {
        reply = "Les vidéos peuvent être visionnées en streaming haute qualité ou téléchargées pour un visionnage 100% hors-ligne dans l'application.";
      } else if (lower.includes('paiement') || lower.includes('m-pesa') || lower.includes('orange')) {
        reply = "Nous acceptons les paiements directs par M-Pesa, Orange Money, Airtel Money ainsi que les cartes Visa/Mastercard avec conversion instantanée en Francs Congolais.";
      } else {
        reply = "Pour une assistance immédiate personnalisée avec un conseiller à Kinshasa, vous pouvez également échanger en direct sur WhatsApp.";
        action = 'whatsapp';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: reply, action }]);
    }, 700);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Bonjour le Support Amanitech Academy, j\'ai besoin d\'assistance concernant mon compte.');
    window.open(`https://wa.me/5521986738943?text=${text}`, '_blank');
  };

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: 'Comment télécharger des cours pour les regarder sans connexion internet ?',
      a: 'Dans la fiche de chaque cours ou vidéo, cliquez sur l\'icône "Télécharger". Les leçons stockées sont accessibles à tout moment depuis l\'onglet "Téléchargements" même en mode avion.'
    },
    {
      q: 'Comment obtenir mon certificat officiel après une formation ?',
      a: 'Complétez l\'ensemble des modules du cours et réussissez l\'évaluation finale avec une note minimale de 70%. Votre certificat numérique sécurisé apparaîtra instantanément dans votre rubrique "Mes Certificats" avec un QR Code de vérification.'
    },
    {
      q: 'Quels sont les moyens de paiement acceptés en RDC ?',
      a: 'Nous acceptons M-Pesa (Vodacom), Orange Money, Airtel Money, ainsi que les cartes bancaires internationales (Visa, Mastercard). Les reçus de paiement conformes sont téléchargeables depuis votre espace compte.'
    },
    {
      q: 'Puis-je utiliser l\'application sur plusieurs appareils en simultané ?',
      a: 'Votre compte étudiant vous permet de vous connecter sur votre smartphone, votre tablette et votre ordinateur portable. Vos progrès de lecture et quiz sont automatiquement synchronisés en temps réel.'
    }
  ];

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-6 animate-in fade-in duration-300 pb-36 text-white max-w-5xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top duration-300">
          <CheckCircle2 size={18} className="text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Support Channels Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-[#1B2224] p-4 rounded-2xl border border-white/10 flex items-center gap-3.5 shadow-md">
          <div className="bg-[#1BA9A2]/20 p-3 rounded-xl text-[#1BA9A2]">
            <Mail size={20}/>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Courriel Officiel</p>
            <p className="text-white text-xs font-semibold truncate select-all">support@amanitech.academy</p>
          </div>
        </div>

        <div className="bg-[#1B2224] p-4 rounded-2xl border border-white/10 flex items-center gap-3.5 shadow-md">
          <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400">
            <Phone size={20}/>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ligne WhatsApp RDC</p>
            <p className="text-white text-xs font-semibold truncate select-all">+55 21 98673-8943</p>
          </div>
        </div>

        <div className="bg-[#1B2224] p-4 rounded-2xl border border-white/10 flex items-center gap-3.5 shadow-md">
          <div className="bg-[#F26A21]/20 p-3 rounded-xl text-[#F26A21]">
            <MapPin size={20}/>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Siège Kinshasa</p>
            <p className="text-white text-xs font-semibold truncate">Immeuble Swiss Mart, Gombe</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 gap-3 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'tickets'
              ? 'border-[#F26A21] text-white'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Clock size={15} />
          Mes Tickets de Support ({tickets.length})
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'chat'
              ? 'border-[#F26A21] text-white'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <MessageSquare size={15} />
          Messagerie en Direct
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'faq'
              ? 'border-[#F26A21] text-white'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <HelpCircle size={15} />
          Questions Fréquentes (FAQ)
        </button>
      </div>

      {/* Tab 1: Support Tickets CRUD */}
      {activeTab === 'tickets' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                Suivi de vos requêtes d'assistance
              </h2>
              <p className="text-xs text-gray-400">
                Ouvrez un ticket technique ou pédagogique pour une prise en charge garantie sous 2 heures ouvrées.
              </p>
            </div>

            <button
              onClick={() => setShowNewTicketModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#F26A21] to-[#D95A15] hover:from-[#D95A15] hover:to-[#F26A21] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <Plus size={15} />
              Nouveau Ticket
            </button>
          </div>

          {/* Tickets List */}
          <div className="space-y-3 pt-2">
            {tickets.length === 0 ? (
              <div className="p-8 text-center bg-[#1B2224] border border-white/10 rounded-2xl text-gray-400 text-xs">
                Vous n'avez aucun ticket de support en cours.
              </div>
            ) : (
              tickets.map(ticket => (
                <div 
                  key={ticket.id} 
                  className="bg-[#1B2224] border border-white/10 hover:border-[#1BA9A2] rounded-2xl p-5 transition-all shadow-md space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#1BA9A2] bg-[#1BA9A2]/20 px-2 py-0.5 rounded-md">
                        {ticket.id}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        ticket.status === 'Résolu' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {ticket.status}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase">
                        Priorité: {ticket.priority}
                      </span>
                    </div>

                    <span className="text-[11px] text-gray-400">
                      Créé le : {ticket.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      {ticket.subject}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {ticket.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-[11px] text-gray-400">
                      Catégorie : <strong>{ticket.category}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleToggleResolved(ticket.id)}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Check size={13} className={ticket.status === 'Résolu' ? 'text-emerald-400' : 'text-gray-400'} />
                        {ticket.status === 'Résolu' ? 'Rouvrir' : 'Marquer comme résolu'}
                      </button>
                      <button 
                        onClick={() => handleDeleteTicket(ticket.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer"
                        title="Archiver"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Live Chat */}
      {activeTab === 'chat' && (
        <div className="bg-[#1B2224] border border-white/10 rounded-2xl flex flex-col h-[520px] overflow-hidden shadow-xl animate-in fade-in duration-200">
          <div className="p-4 border-b border-white/10 bg-[#12181A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageSquare size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Conseiller Support Amanitech Academy</h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> En ligne • Kinshasa
                </span>
              </div>
            </div>

            <button
              onClick={openWhatsApp}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
            >
              <Phone size={13} />
              Ouvrir WhatsApp
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5" ref={chatScrollRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-[#1BA9A2] text-white rounded-br-none'
                    : 'bg-[#12181A] border border-white/10 text-gray-200 rounded-bl-none'
                }`}>
                  <p>{msg.text}</p>
                  {msg.action === 'whatsapp' && (
                    <button
                      onClick={openWhatsApp}
                      className="mt-2.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Phone size={13} />
                      Continuer sur WhatsApp (+55 21 98673-8943)
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#12181A] border border-white/10 rounded-2xl p-3 text-xs text-gray-400 flex items-center gap-2">
                  <RefreshCw size={13} className="animate-spin text-[#1BA9A2]" />
                  <span>Un conseiller rédige une réponse...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#12181A] border-t border-white/10 flex gap-2">
            <input 
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
              placeholder="Posez votre question à notre assistance..."
              className="flex-1 bg-[#1B2224] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#1BA9A2]"
            />
            <button
              onClick={() => handleSendChat()}
              className="px-4 py-2.5 bg-[#F26A21] hover:bg-[#D95A15] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Send size={14} />
              Envoyer
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="bg-[#1B2224] border border-white/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-lg bg-white/5 text-gray-400 shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Create New Ticket */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <form 
            onSubmit={handleCreateTicket}
            className="bg-[#1B2224] border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-4 shadow-2xl text-white"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold uppercase tracking-tight text-white">
                Ouvrir un Nouveau Ticket d'Assistance
              </h3>
              <button 
                type="button" 
                onClick={() => setShowNewTicketModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase">Sujet de la demande</label>
              <input 
                type="text"
                required
                value={newSubject}
                onChange={e => setNewSubject(e.target.value)}
                placeholder="Ex: Problème d'accès à la leçon 4..."
                className="w-full bg-[#12181A] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#1BA9A2]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Catégorie</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full bg-[#12181A] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#1BA9A2]"
                >
                  <option value="Accès aux cours">Accès aux cours</option>
                  <option value="Attestations & Diplômes">Attestations & Diplômes</option>
                  <option value="Question Pédagogique">Question Pédagogique</option>
                  <option value="Abonnement & Facturation">Abonnement & Facturation</option>
                  <option value="Technique & Application">Technique & Application</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Priorité</label>
                <select
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as any)}
                  className="w-full bg-[#12181A] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#1BA9A2]"
                >
                  <option value="Basse">Basse</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Haute">Haute</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase">Description détaillée</label>
              <textarea 
                rows={4}
                required
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="Précisez votre demande, le module concerné ou l'anomalie rencontrée..."
                className="w-full bg-[#12181A] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#1BA9A2] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowNewTicketModal(false)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#F26A21] hover:bg-[#D95A15] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-md"
              >
                Soumettre le Ticket
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default SupportScreen;
