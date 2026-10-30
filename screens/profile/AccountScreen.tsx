import React, { useState, useRef } from 'react';
import { UserProfile } from '../../types';
import { 
  Save, Camera, CreditCard, MapPin, Phone, Mail, User, 
  Clock, CheckCircle, Shield, KeyRound, Lock, Eye, EyeOff, 
  Briefcase, Plus, X, Download, FileText, Check, AlertCircle, RefreshCw, Upload
} from 'lucide-react';

interface AccountScreenProps {
  user: UserProfile;
  onUpdate: (u: UserProfile) => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ user, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing'>('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: user.name || 'Placide Baundja Ikuba',
    email: user.email || 'placide.baundja@amanitech.academy',
    cpf: user.cpf || 'CD-KN-89241',
    avatar: user.avatar || '/perfil.jpg',
    level: user.level || 12,
    badges: user.badges || ['Certifié', 'Pionnier'],
    plan: user.plan || 'Abonnement Professionnel',
    phone: user.phone || '+243 820 145 892',
    title: user.title || 'Cadre Dirigeant & Chef de Projet Digital',
    bio: user.bio || 'Professionnel engagé dans la transformation digitale et l\'innovation managériale en RDC. Passionné par l\'Agile, l\'Industrie 4.0 et l\'impact durable.',
    address: user.address || 'Immeuble Swiss Mart, Boulevard du 30 Juin (Arrêt Sabena)',
    city: user.city || 'Kinshasa, Gombe',
    skills: user.skills || ['Management Agile', 'Transformation Digitale', 'Leadership Stratégique', 'Data & IA']
  });

  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security tab state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Attention : L\'image dépasse la taille maximale recommandée de 5 Mo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const updated = { ...formData, avatar: result };
        setFormData(updated);
        onUpdate(updated);
        try {
          localStorage.setItem('cerclehub_user_profile', JSON.stringify(updated));
        } catch {
          // LocalStorage fallback handled
        }
        showToast('Photo de profil mise à jour avec succès !');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleResetAvatar = () => {
    const updated = { ...formData, avatar: '/perfil.jpg' };
    setFormData(updated);
    onUpdate(updated);
    try {
      localStorage.setItem('cerclehub_user_profile', JSON.stringify(updated));
    } catch {
      // Ignored
    }
    showToast('Photo de profil réinitialisée.');
  };

  // Profile Save
  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onUpdate(formData);
      try {
        localStorage.setItem('cerclehub_user_profile', JSON.stringify(formData));
      } catch {
        // Ignored
      }
      setIsSaving(false);
      showToast('Informations du profil enregistrées avec succès !');
    }, 600);
  };

  // Skills CRUD
  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (formData.skills.includes(trimmed)) {
      setNewSkill('');
      return;
    }
    const updatedSkills = [...formData.skills, trimmed];
    const updated = { ...formData, skills: updatedSkills };
    setFormData(updated);
    onUpdate(updated);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = formData.skills.filter(s => s !== skillToRemove);
    const updated = { ...formData, skills: updatedSkills };
    setFormData(updated);
    onUpdate(updated);
  };

  // Password Update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordFeedback({ type: 'error', text: 'Veuillez renseigner votre mot de passe actuel.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordFeedback({ type: 'error', text: 'Le nouveau mot de passe doit comporter au moins 6 caractères.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ type: 'error', text: 'Les deux mots de passe ne correspondent pas.' });
      return;
    }

    setPasswordFeedback({ type: 'success', text: 'Votre mot de passe a été modifié avec succès.' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Sécurité du compte mise à jour !');
  };

  const paymentHistory = [
    { id: 1, date: '01/02/2026', plan: 'Abonnement Professionnel', amount: '29,00 $ USD', status: 'Payé', method: 'Carte Bancaire •••• 4421', ref: 'REC-2026-02-098' },
    { id: 2, date: '01/01/2026', plan: 'Renouvellement Mensuel', amount: '29,00 $ USD', status: 'Payé', method: 'M-Pesa Mobile Money (RDC)', ref: 'REC-2026-01-042' },
    { id: 3, date: '01/12/2025', plan: 'Renouvellement Mensuel', amount: '29,00 $ USD', status: 'Payé', method: 'Orange Money (RDC)', ref: 'REC-2025-12-881' },
    { id: 4, date: '01/11/2025', plan: 'Adhésion Initiale Amanitech Academy', amount: '29,00 $ USD', status: 'Payé', method: 'Airtel Money', ref: 'REC-2025-11-014' },
  ];

  const handleDownloadInvoice = (invoiceRef: string) => {
    showToast(`Téléchargement de la facture ${invoiceRef} en cours...`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-6 animate-in fade-in duration-300 pb-36 text-white max-w-5xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top duration-300">
          <CheckCircle size={18} className="text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Hidden file input for photo upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1B2224] via-[#1BA9A2]/20 to-[#1B2224] border border-[#1BA9A2]/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-xl relative overflow-hidden">
        
        {/* Avatar with Upload Badge */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#1BA9A2] shadow-2xl bg-[#12181A] flex items-center justify-center">
            <img 
              src={formData.avatar} 
              className="w-full h-full object-cover object-center aspect-square" 
              alt={formData.name} 
            />
          </div>
          
          <button 
            type="button"
            onClick={handleTriggerUpload}
            className="absolute bottom-0 right-0 bg-[#F26A21] hover:bg-[#D95A15] p-2.5 rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-[#12181A]"
            title="Changer la photo de profil"
          >
            <Camera size={15} />
          </button>
        </div>

        {/* User Identity info */}
        <div className="text-center md:text-left space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight truncate">
              {formData.name}
            </h1>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {formData.plan}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#1BA9A2] font-bold">
            {formData.title}
          </p>
          <p className="text-[11px] text-gray-400 flex items-center justify-center md:justify-start gap-1.5 pt-0.5">
            <MapPin size={13} className="text-[#1BA9A2]" />
            <span>{formData.city}</span>
            <span className="text-gray-600">•</span>
            <span>ID: {formData.cpf}</span>
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
            <button
              type="button"
              onClick={handleTriggerUpload}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Upload size={13} />
              Changer ma photo
            </button>
            {formData.avatar !== '/perfil.jpg' && (
              <button
                type="button"
                onClick={handleResetAvatar}
                className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] font-medium transition-all cursor-pointer"
              >
                Réinitialiser photo
              </button>
            )}
          </div>
        </div>

        {/* Level & Certs badge */}
        <div className="bg-[#12181A]/80 border border-white/10 rounded-2xl p-4 text-center shrink-0 min-w-[130px]">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Statut Étudiant</span>
          <span className="block text-xl font-black text-[#F26A21] mt-0.5">Niveau {formData.level}</span>
          <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded-md bg-[#1BA9A2]/20 text-[#1BA9A2] font-bold uppercase">
            3 Certificats
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 gap-2 sm:gap-4 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'profile'
              ? 'border-[#F26A21] text-white'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <User size={15} />
          Informations Personnelles
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'security'
              ? 'border-[#F26A21] text-white'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Shield size={15} />
          Sécurité & Mot de passe
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'billing'
              ? 'border-[#F26A21] text-white'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <CreditCard size={15} />
          Abonnement & Règlements
        </button>
      </div>

      {/* Tab 1: Profile Form */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in duration-200">
          
          {/* Identity Fields */}
          <div className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1BA9A2] flex items-center gap-2 pb-1 border-b border-white/5">
              <User size={15} /> Identité & Fonction
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wide">Nom Complet</label>
                <div className="bg-[#12181A] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#1BA9A2] transition-colors">
                  <User size={16} className="text-gray-400" />
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="bg-transparent text-white text-xs w-full outline-none"
                    placeholder="Votre nom complet"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wide">Titre Professionnel / Métier</label>
                <div className="bg-[#12181A] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#1BA9A2] transition-colors">
                  <Briefcase size={16} className="text-gray-400" />
                  <input 
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="bg-transparent text-white text-xs w-full outline-none"
                    placeholder="Ex: Chef de projet, Ingénieur, Manager..."
                  />
                </div>
              </div>
            </div>

            {/* Bio textarea */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wide">Présentation / Biographie Professionnelle</label>
              <textarea 
                rows={3}
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-[#12181A] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-[#1BA9A2] transition-colors resize-none leading-relaxed"
                placeholder="Décrivez votre parcours et vos objectifs sur Amanitech Academy..."
              />
            </div>
          </div>

          {/* Contact & Location Fields */}
          <div className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1BA9A2] flex items-center gap-2 pb-1 border-b border-white/5">
              <Phone size={15} /> Contact & Localisation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wide">Adresse E-mail Officielle</label>
                <div className="bg-[#12181A] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#1BA9A2] transition-colors">
                  <Mail size={16} className="text-gray-400" />
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent text-white text-xs w-full outline-none"
                    placeholder="nom@exemple.cd"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wide">Téléphone / WhatsApp (RDC)</label>
                <div className="bg-[#12181A] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#1BA9A2] transition-colors">
                  <Phone size={16} className="text-gray-400" />
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-transparent text-white text-xs w-full outline-none"
                    placeholder="+243 ..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wide">Ville / Province</label>
                <div className="bg-[#12181A] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#1BA9A2] transition-colors">
                  <MapPin size={16} className="text-gray-400" />
                  <input 
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="bg-transparent text-white text-xs w-full outline-none"
                    placeholder="Ex: Kinshasa, Gombe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wide">Adresse Résidentielle / Bureau</label>
                <div className="bg-[#12181A] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#1BA9A2] transition-colors">
                  <MapPin size={16} className="text-gray-400" />
                  <input 
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="bg-transparent text-white text-xs w-full outline-none"
                    placeholder="Avenue, Numéro, Bâtiment"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Skills CRUD */}
          <div className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1BA9A2] flex items-center gap-2 pb-1 border-b border-white/5">
              <CheckCircle size={15} /> Compétences & Spécialités d'Apprentissage
            </h3>

            <div className="flex flex-wrap gap-2 pt-1">
              {formData.skills.map(skill => (
                <span 
                  key={skill} 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1BA9A2]/20 border border-[#1BA9A2]/40 text-[#1BA9A2] text-xs font-semibold"
                >
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-400 text-gray-400 cursor-pointer p-0.5"
                    title={`Supprimer ${skill}`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill input */}
            <div className="flex gap-2 max-w-md pt-2">
              <input 
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                placeholder="Ajouter une compétence (ex: Énergies Vertes)"
                className="flex-1 bg-[#12181A] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-[#1BA9A2]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-[#1BA9A2] hover:bg-[#1BA9A2] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Plus size={14} />
                Ajouter
              </button>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-[#F26A21] to-[#D95A15] hover:from-[#D95A15] hover:to-[#F26A21] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#F26A21]/20 flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Save size={15} />
                  <span>Enregistrer les modifications</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Security & Password */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <form onSubmit={handlePasswordUpdate} className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1BA9A2] flex items-center gap-2 pb-1 border-b border-white/5">
              <KeyRound size={15} /> Modification du Mot de Passe
            </h3>

            {passwordFeedback && (
              <div className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-semibold ${
                passwordFeedback.type === 'success' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {passwordFeedback.type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
                <span>{passwordFeedback.text}</span>
              </div>
            )}

            <div className="space-y-3 max-w-lg">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Mot de passe actuel</label>
                <div className="bg-[#12181A] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#1BA9A2]">
                  <Lock size={15} className="text-gray-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="bg-transparent text-white text-xs w-full outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Nouveau mot de passe</label>
                <div className="bg-[#12181A] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#1BA9A2]">
                  <Lock size={15} className="text-gray-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 caractères"
                    className="bg-transparent text-white text-xs w-full outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Confirmer le nouveau mot de passe</label>
                <div className="bg-[#12181A] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#1BA9A2]">
                  <Lock size={15} className="text-gray-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Répétez le mot de passe"
                    className="bg-transparent text-white text-xs w-full outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 px-5 py-2.5 bg-[#1BA9A2] hover:bg-[#1BA9A2] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Mettre à jour le mot de passe
              </button>
            </div>
          </form>

          {/* Two-Factor Authentication */}
          <div className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Shield size={16} className="text-emerald-400" />
                  Authentification à Deux Facteurs (2FA)
                </h3>
                <p className="text-[11px] text-gray-400 mt-1 max-w-md">
                  Sécurisez vos accès avec un code envoyé par SMS sur votre numéro WhatsApp ou généré via une application d'authentification.
                </p>
              </div>

              <button 
                type="button"
                onClick={() => {
                  setTwoFactorEnabled(!twoFactorEnabled);
                  showToast(twoFactorEnabled ? 'Authentification 2FA désactivée.' : 'Authentification 2FA activée avec succès !');
                }}
                className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                  twoFactorEnabled ? 'bg-emerald-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                  twoFactorEnabled ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Billing & Subscription */}
      {activeTab === 'billing' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Active Plan Card */}
          <div className="bg-gradient-to-br from-[#1B2224] via-[#1BA9A2]/25 to-[#1B2224] border border-[#1BA9A2]/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1BA9A2]">Formule en cours</span>
                <h2 className="text-xl font-black text-white uppercase tracking-tight mt-0.5">
                  Abonnement Professionnel Annuel
                </h2>
                <p className="text-xs text-gray-300 mt-1">
                  Accès illimité à tous les parcours, masterclasses certifiantes et supports pédagogiques hors-ligne.
                </p>
              </div>

              <div className="text-right sm:text-right shrink-0">
                <span className="text-2xl font-black text-white">29,00 $</span>
                <span className="text-xs text-gray-400 font-semibold"> / mois</span>
                <span className="block text-[10px] text-emerald-400 font-bold uppercase mt-1">
                  Renouvellement le 01/03/2026
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CreditCard size={15} className="text-[#1BA9A2]" />
                <span>Mode de prélèvement : <strong>M-Pesa / Carte Bancaire</strong></span>
              </div>
              <button 
                type="button"
                onClick={() => showToast('Votre abonnement est actuellement actif et à jour.')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Gérer le forfait
              </button>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1BA9A2] flex items-center gap-2 pb-1 border-b border-white/5">
              <Clock size={15} /> Historique des Règlements & Reçus
            </h3>

            <div className="space-y-2.5">
              {paymentHistory.map(pay => (
                <div 
                  key={pay.id} 
                  className="bg-[#12181A] border border-white/5 hover:border-white/15 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{pay.plan}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                          {pay.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {pay.date} • {pay.method} • Réf: {pay.ref}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <span className="text-xs font-bold text-white">{pay.amount}</span>
                    <button 
                      type="button"
                      onClick={() => handleDownloadInvoice(pay.ref)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-[#1BA9A2] rounded-lg text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download size={13} />
                      Reçu PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AccountScreen;
