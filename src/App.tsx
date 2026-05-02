import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Home, 
  Search, 
  PenTool, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle, 
  Infinity as InfinityIcon, 
  Sparkles,
  Verified,
  PlusCircle,
  Heart,
  Edit,
  UserPlus,
  Share2,
  Clock,
  ChevronRight,
  TrendingUp,
  Zap,
  Settings,
  LogOut,
  CreditCard,
  Accessibility,
  HardDrive,
  Trash2,
  Bell,
  X
} from 'lucide-react';

// --- Tipos ---
type Screen = 'santuario' | 'library' | 'seek' | 'scribe' | 'settings' | 'login' | 'forgot_password';

interface Book {
  id: string;
  img: string;
  title: string;
  author: string;
  updates?: string;
  magic?: boolean;
  synopsis?: string;
}

// --- Constantes ---
const IMAGES = {
  profile: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmt_RqDmPyJXH6liqsaCgPuJUlY2kEj6e5JbuZXXVMgIW1zVl1m354yphgCtj9-Bniprls05kx3tMDTIVPE-IM06S8F_GaoBm3_Jdz1KCa-pN7HsQ6-hIMvBGczGTvyWP1E7AQ6Xhi31UXBwGpszU5WAL0vH6ap6DWXixwEOioKcM-nyIK5ES8VqAcGcg2jVt7Z5gpNYzzR97MTyoekkmrJ3E0_G2zMZWB7D8ieBiUh3bQzHnkWjTMdKBU-nSsKzhN206qb_rckeKo",
  book1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW53f7bi-aPg8aY186u_98qJYIxZKn0TQXshhzIRZ6uL5tidRsZUmzQYy8yLBWi5v6DZ-oF3LT2UAlLlRu7TAHof-hpTneWaFgPBpuY-2nhEzscwLWXozkrLdNav2Jjh0QXoaisbgZYW1GLoGUxyuw_DqXPXDv7zbUX8uvmZaxlVo_AF61B4g51WWbyCw_j5eTx64w_JG5OGW-P80fEs7uu1Xhc-Qb9Z1NxvhqWRVIZMb9uTwr4P9H_IxJANw_MrOpANKPuZuR3uqQ",
  book2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcNtpMbTd_qZygOhq_ETeVFJLf6QduRy116zEBXTUfnGJm0cc5QF2GMmiFzGleFV9SlzF8GGPcDioc_KTp01OLZWP8QPi67Z8p5BBBYI3YVx17iS50Qk2FAbQXc_GDY9p5HDk1gPZuF-lsWUlPGGOtyLk6PGjxPR1H2Gdm5-KxKxKPkU8vU_5k0wQMjybgCiospPw0Z80SLvu4E7-7SANgSc7cb8pHeX6x40MDERrhl1Cg7C75-n-OroFqiB9AibopsKVa_ZmBdfyC",
  bookCover: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKobGllhVKNAubYP6rLOYwqHdeHttpzm-h1gta43SnwUbd1zo49QnEe_Pzs1A-CUMGrEcdzBsmSj0gQF24Lt5iMVHqcgIfDv07Ph_G0knqcHkIWp_hnWKfPFbpeLoaC05RdLIvM4dltYmxkHtzSMRGqHYdKeTa2GGYXyxNO_qJOFiUOJarH1_dm5ot0LV_kbhydKgW_Rl3fvKBoZH4QBRji8Kob9wNZQlVzT36lmvuYZKZ_1PdLU5K6zgK1RscQO8fJ2qWyTxY0f5O",
  atmosphere: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT-tVylPrJRDbg8AS77qtL0kYoQMGiNGqykhuIFP227z6jOK_RTtZJGhIqKckUjhZVNc3d0Zqw2LaM52ouzSoSERhrmD-9LXigFwC2dtXSHecPcfnk932Kcq1wAvE0xwAPDBTgB3DluCiaOiELaLw2CiyxjvmCNaVkfPZQOQopdQf_AKf2OxZPV9vK0JKPmWi3g1-jePghPNrEiptGPaxwpmaTs0WegoGtL-W4uqxqVFv0f7dRQ2KAiYyMXcPeJpH0KvHYsKjSSafw",
  seal: "https://lh3.googleusercontent.com/aida-public/AB6AXuDA4YifCtQ9OgQ5a0mr1-xNyXEjv0QWyu5QMPuP5VK8CPlFot2i1Z5wtYs2CnAm83BZQTUE6oAYxfxk6SG-FcpuVjrmK_V9xugEOG9PNMlHqFwKelNZi4f5eevwg3LxxQkCxUUSlsSAuZQWwlQZ50-zI_8UtIdFtXtREwWnhLikFWJZylp2odQCb_1zdu3NKM1esZ4yplFsn62MTT9vvjJO23bOOzV__yfrCsdrPTA6ucIFWEBc5_zmkZUOYkVpxBuKcL_lVKDONfx8"
};

const ALL_BOOKS: Book[] = [
  { id: 'b1', img: IMAGES.book1, title: 'O Alquimista', author: 'Paulo Coelho', updates: '2 novos capítulos', synopsis: 'A jornada mágica de um jovem pastor andaluz em busca de seu tesouro pessoal nas pirâmides do Egito.' },
  { id: 'b2', img: IMAGES.book2, title: 'A Montanha Mágica', author: 'Thomas Mann', updates: 'Revisão disponível', synopsis: 'Uma meditação sobre a passagem do tempo, a vida, a morte e o amor em um sanatório isolado.' },
  { id: 'b3', img: IMAGES.bookCover, title: 'O Nome da Rosa', author: 'Umberto Eco', updates: 'Comentários novos', synopsis: 'Um romance policial histórico que investiga uma série de mortes misteriosas em um mosteiro italiano no século XIV.' },
  { id: 'b4', img: IMAGES.bookCover, title: 'Dom Casmurro', author: 'Machado de Assis', synopsis: 'A reflexão melancólica e obsessiva de Bento Santiago sobre seu amor juvenil e suas dúvidas sobre Capitu.' },
  { id: 'b5', img: IMAGES.book1, title: 'Siddhartha', author: 'Hermann Hesse', magic: true, synopsis: 'A busca espiritual e filosófica de um homem em busca de iluminação durante a era de Gautama Buda.' },
  { id: 'b6', img: IMAGES.book2, title: 'O Castelo', author: 'Franz Kafka', magic: true, synopsis: 'A luta fútil e labiríntica de um homem para obter acesso às autoridades de um castelo inacessível.' },
  { id: 'b7', img: IMAGES.bookCover, title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', synopsis: 'A saga épica da família Buendía e a fundação da mítica cidade de Macondo através de gerações.' },
  { id: 'b8', img: IMAGES.book1, title: 'Crime e Castigo', author: 'Fiódor Dostoiévski', magic: true, synopsis: 'O conflito mental e moral de Raskólnikov, um ex-estudante que planeja um assassinato perfeito.' },
  { id: 'b9', img: IMAGES.book2, title: 'O Grande Gatsby', author: 'F. Scott Fitzgerald', synopsis: 'A exploração de amor, obsessão e o sonho americano nas festas glamorosas de Jay Gatsby.' }
];

// --- Componentes ---

const TopAppBar = ({ onSettings }: { onSettings: () => void }) => (
  <header className="bg-mahogany/95 backdrop-blur-sm border-b border-amethyst/30 fixed top-0 left-0 w-full z-50">
    <div className="flex justify-between items-center w-full px-6 py-4 max-w-container-max mx-auto">
      <div className="w-10 h-10" />
      <h1 className="font-serif italic tracking-wide text-xl text-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.3)] select-none">
        A Grande Biblioteca
      </h1>
      <button 
        onClick={onSettings}
        className="p-2 hover:bg-gold/10 rounded-full text-gold transition-colors"
      >
        <Settings size={22} />
      </button>
    </div>
  </header>
);

const BottomNavBar = ({ currentScreen, setScreen }: { currentScreen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems: { id: Screen, icon: any, label: string }[] = [
    { id: 'santuario', icon: Home, label: 'Santuário' },
    { id: 'library', icon: BookOpen, label: 'Biblioteca' },
    { id: 'seek', icon: Search, label: 'Procurar' },
    { id: 'scribe', icon: PenTool, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-mahogany/95 backdrop-blur-md border-t border-amethyst/40 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center px-4 py-3 pb-safe max-w-container-max mx-auto">
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = currentScreen === id;
          return (
            <button
              key={id}
              onClick={() => setScreen(id)}
              className={`flex flex-col items-center justify-center transition-all ${
                isActive ? 'text-gold scale-110' : 'text-gold/40 hover:text-gold/70'
              }`}
            >
              <Icon size={isActive ? 24 : 20} className="mb-1" />
              <span className="font-serif text-[10px] uppercase tracking-widest">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

const LoginScreen = ({ onLogin, onForgotPassword }: { onLogin: () => void, onForgotPassword: () => void }) => (
  <motion.main 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden bg-ink"
  >
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-amethyst/10 rounded-full blur-[100px]" />
    </div>

    <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center gap-8">
      <div className="flex flex-col items-center text-center">
        <BookOpen className="text-gold mb-2 drop-shadow-[0_0_8px_rgba(233,195,73,0.3)]" size={48} />
        <h2 className="font-serif text-2xl text-sepia tracking-tight">Entrada do Santuário</h2>
      </div>

      <section className="parchment-texture w-full p-8 md:p-10 rounded-xl border border-amethyst/30 overflow-hidden text-ink">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest text-ink/60 font-medium ml-1">Usuário</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={16} />
              <input 
                type="text" 
                required
                placeholder="Escreva seu pseudônimo..."
                className="w-full pl-11 pr-4 py-3 bg-[#f2e6d1]/80 border-b border-gold/40 rounded-lg text-ink focus:outline-none focus:border-gold transition-all font-body italic placeholder:text-ink/30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest text-ink/60 font-medium ml-1">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={16} />
              <input 
                type="password" 
                required
                placeholder="Seu selo secreto..."
                className="w-full pl-11 pr-4 py-3 bg-[#f2e6d1]/80 border-b border-gold/40 rounded-lg text-ink focus:outline-none focus:border-gold transition-all font-body italic placeholder:text-ink/30"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-widest">
            <label className="flex items-center gap-2 cursor-pointer text-ink/60 hover:text-ink transition-colors select-none">
              <input type="checkbox" className="accent-amethyst" />
              Lembrar-me
            </label>
            <button 
              type="button" 
              onClick={onForgotPassword}
              className="text-amethyst hover:text-ink transition-colors italic"
            >
              Perdeu sua chave?
            </button>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-amethyst text-gold font-serif text-lg rounded-lg border border-gold/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group gold-glow select-none"
          >
            <span>Entrar</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-ink/10 flex justify-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700 select-none">
          <img src={IMAGES.seal} alt="Selo Ex Libris" className="w-12 h-12" />
        </div>
      </section>

      <div className="text-center space-y-4">
        <p className="font-body text-sepia/80 italic">Novo no arquivo?</p>
        <button 
          onClick={onLogin}
          className="px-8 py-2 border border-gold/20 rounded-full font-sans text-xs text-gold hover:bg-gold/5 transition-all uppercase tracking-widest select-none"
        >
          Pedir Filiação
        </button>
      </div>
    </div>
  </motion.main>
);

const ForgotPasswordScreen = ({ onBack }: { onBack: () => void }) => {
  const [sent, setSent] = useState(false);
  
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col items-center justify-center min-h-screen px-4 bg-ink text-sepia"
    >
      <div className="w-full max-w-[420px] space-y-8">
        <div className="text-center">
          <Lock className="mx-auto text-gold mb-4" size={48} />
          <h2 className="font-serif text-2xl">Recuperar Chave</h2>
          <p className="font-body text-sm text-sepia/60 mt-2">
            Enviaremos uma mensagem para o oráculo cadastrado para restaurar seu acesso.
          </p>
        </div>

        {!sent ? (
          <section className="parchment-texture p-8 md:p-10 rounded-xl space-y-6 text-ink">
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase tracking-widest text-ink/60 font-medium ml-1">E-mail do Oráculo</label>
              <input 
                type="email" 
                placeholder="seu-oraculo@exemplo.com"
                required
                className="w-full px-4 py-3 bg-[#f2e6d1]/80 border-b border-gold/40 rounded-lg focus:outline-none focus:border-gold font-body italic"
              />
            </div>
            <button 
              onClick={() => setSent(true)}
              className="w-full py-4 bg-amethyst text-gold font-serif rounded-lg gold-glow hover:brightness-110 transition-all select-none"
            >
              Enviar Instruções
            </button>
          </section>
        ) : (
          <section className="parchment-texture p-8 md:p-10 rounded-xl text-center space-y-4 text-ink">
            <CheckCircle className="mx-auto text-gold" size={48} />
            <p className="font-body italic text-sm">Mensagem enviada com sucesso! Verifique seu papiro digital.</p>
          </section>
        )}

        <button 
          onClick={onBack}
          className="w-full text-sm font-sans uppercase tracking-[0.2em] text-gold/40 hover:text-gold transition-colors select-none"
        >
          Voltar para Entrada
        </button>
      </div>
    </motion.main>
  );
};

const SettingsScreen = ({ onClose, onLogout, onDeleteAccount }: { onClose: () => void, onLogout: () => void, onDeleteAccount: () => void }) => {
  const menuItems = [
    { icon: Edit, label: 'Configuração', color: 'text-gold' },
    { icon: CreditCard, label: 'Assinaturas e pagamento', color: 'text-gold' },
    { icon: Accessibility, label: 'Acessibilidade', color: 'text-gold' },
    { icon: UserPlus, label: 'Convide um amigo', color: 'text-gold' },
    { icon: HardDrive, label: 'Armazenamento', color: 'text-gold' },
    { icon: Bell, label: 'Editar app', color: 'text-gold' },
    { icon: Trash2, label: 'Excluir a conta', color: 'text-red-400', onClick: onDeleteAccount },
  ];

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[100] bg-mahogany overflow-y-auto"
    >
      <div className="max-w-container-max mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-serif text-2xl text-gold">Ajustes do Santuário</h2>
          <button onClick={onClose} className="p-2 text-gold hover:bg-gold/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <button 
              key={i} 
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-5 bg-amethyst/20 hover:bg-gold/5 rounded-xl border border-gold/5 transition-all group select-none"
            >
              <div className="flex items-center gap-4">
                <item.icon className={item.color} size={20} />
                <span className={`font-serif text-lg ${item.color}`}>{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gold/20 group-hover:text-gold" />
            </button>
          ))}
        </div>

        <div className="mt-12 pt-12 border-t border-gold/10 text-center">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 mx-auto px-8 py-3 bg-red-400/10 text-red-400 border border-red-400/30 rounded-full hover:bg-red-400/20 transition-all font-sans text-xs uppercase tracking-widest select-none"
          >
            <LogOut size={16} />
            Sair da Conta
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const LogoutConfirmation = ({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
  >
    <div className="parchment-texture p-8 rounded-xl max-w-sm w-full space-y-6 text-ink text-center">
      <LogOut size={48} className="mx-auto text-amethyst" />
      <h3 className="font-serif text-2xl">Deixar o Santuário?</h3>
      <p className="font-body text-sm opacity-70">
        Você tem certeza que deseja sair agora? Sua jornada será preservada até seu retorno.
      </p>
      <div className="flex gap-4">
        <button 
          onClick={onCancel}
          className="flex-1 py-3 border border-ink/20 rounded-lg font-sans text-xs uppercase tracking-widest hover:bg-ink/5 select-none"
        >
          Cancelar
        </button>
        <button 
          onClick={onConfirm}
          className="flex-1 py-3 bg-red-800 text-white rounded-lg font-sans text-xs uppercase tracking-widest hover:brightness-110 select-none"
        >
          Confirmar Sair
        </button>
      </div>
    </div>
  </motion.div>
);

const SantuarioScreen = ({ onBookSelect }: { onBookSelect: (book: Book) => void }) => {
  const [search, setSearch] = useState('');
  
  const trendingBooks = ALL_BOOKS.filter(b => b.updates).filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-32 max-w-container-max mx-auto px-6 space-y-12"
    >
      {/* Resumo de Leitura */}
      <section className="bg-mahogany/40 border border-amethyst/30 p-8 rounded-lg relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-center mb-6">
          <div>
            <h3 className="font-serif text-xl text-gold mb-1">Resumo de Jornada</h3>
            <p className="font-body text-xs text-sepia/60">Sua meta: 12 de 20 livros este ano.</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-serif text-gold">60%</span>
          </div>
        </div>
        <div className="w-full h-1 bg-mahogany rounded-full overflow-hidden">
          <div className="h-full bg-gold w-[60%] shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
        </div>
      </section>

      {/* Busca Rápida */}
      <section className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold" size={18} />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca rápida no santuário..."
          className="w-full pl-12 pr-4 py-4 bg-mahogany/30 border border-gold/20 rounded-xl focus:outline-none focus:border-gold transition-all font-body text-gold/80 placeholder:text-gold/20"
        />
      </section>

      {/* Livros em Tendência */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-gold/10 pb-2">
          <TrendingUp size={18} className="text-gold/40" />
          <h4 className="font-serif text-lg text-gold">Tendências do Arquivo</h4>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {trendingBooks.length > 0 ? (
            trendingBooks.map((book, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                onClick={() => onBookSelect(book)}
                className="flex-shrink-0 w-32 space-y-3 cursor-pointer select-none"
              >
                <div className="w-full aspect-[2/3] rounded-sm book-shadow overflow-hidden border-l-2 border-black/40">
                  <img src={book.img} className="w-full h-full object-cover" alt={book.title} />
                </div>
                <div>
                  <p className="font-serif text-sm text-gold/80 truncate leading-tight">{book.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap size={10} className="text-gold" />
                    <span className="text-[9px] font-sans text-gold/40 uppercase tracking-widest">{book.updates}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="font-body text-xs italic text-sepia/40">Nenhum livro encontrado.</p>
          )}
        </div>
      </section>

      {/* Atualizações Recentes */}
      <section className="space-y-4">
        <h4 className="font-sans text-xs uppercase tracking-widest text-gold/60">Diário de Atualizações</h4>
        <div className="space-y-3">
          {[
            { tag: 'Sistema', text: 'Melhoria na renderização de manuscritos digitais.' },
            { tag: 'Conteúdo', text: 'Novos volumes na seção de Filosofia Clássica.' },
            { tag: 'Magia', text: 'Novos filtros de acessibilidade para o Plano Mágico.' }
          ].map((update, i) => (
            <div key={i} className="p-4 bg-amethyst/10 border border-gold/5 rounded-xl flex gap-4 items-center">
              <span className="font-sans text-[8px] uppercase tracking-widest px-2 py-1 bg-gold/10 text-gold rounded border border-gold/20">
                {update.tag}
              </span>
              <p className="font-body text-xs text-sepia/80">{update.text}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  );
};

const PlanOverlay = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 z-[120] bg-ink/90 backdrop-blur-xl flex items-center justify-center p-6"
  >
    <div className="w-full max-w-2xl space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-2xl text-gold">Escolha sua Magia</h2>
        <button onClick={onClose} className="p-2 text-gold hover:bg-gold/10 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="parchment-texture p-8 rounded-xl border border-amethyst/30 text-ink space-y-6">
          <h3 className="font-serif text-xl">BookBasic</h3>
          <p className="font-body text-sm text-ink/70">Inicie sua jornada com uma curadoria essencial de clássicos.</p>
          <div className="flex items-center gap-2 text-ink/80">
            <CheckCircle size={18} className="text-gold" />
            <span className="font-body text-sm">10 livros inclusos</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl">R$ 14,90</span>
            <span className="font-sans text-[10px] uppercase opacity-50">/mês</span>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-3 border border-amethyst/30 rounded-lg font-sans text-xs uppercase tracking-widest hover:bg-amethyst/5 transition-colors select-none"
          >
            Selecionar
          </button>
        </div>

        <div className="bg-amethyst/20 parchment-texture mystic-aura p-8 rounded-xl border border-amethyst/50 text-ink space-y-6 overflow-hidden relative">
          <div className="absolute top-4 right-4 text-gold">
            <Sparkles size={20} className="fill-current" />
          </div>
          <div className="inline-block bg-amethyst/10 text-amethyst border border-amethyst/20 text-[10px] font-sans uppercase tracking-[0.2em] px-2 py-1 rounded">
            Mais Procurado
          </div>
          <h3 className="font-serif text-xl">BookMagic</h3>
          <p className="font-body text-sm text-ink/70">Acesso irrestrito aos segredos mais profundos da Grande Biblioteca.</p>
          <div className="flex items-center gap-2 text-ink/80">
            <InfinityIcon size={18} className="text-gold" />
            <span className="font-body text-sm">Leitura Ilimitada</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl">R$ 50</span>
            <span className="font-sans text-[10px] uppercase opacity-50">/mês</span>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-amethyst text-gold rounded-lg font-sans text-xs uppercase tracking-widest hover:brightness-110 transition-all gold-glow select-none"
          >
            Ascender Agora
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const ScribeScreen = ({ 
  userBooks, 
  wishlist, 
  onBookSelect,
  onRemoveFromWishlist 
}: { 
  userBooks: Book[]; 
  wishlist: Book[]; 
  onBookSelect: (book: Book) => void;
  onRemoveFromWishlist: (book: Book) => void;
}) => {
  const [showPlans, setShowPlans] = useState(false);
  const [activeTab, setActiveTab] = useState<'desejos' | 'avaliacoes' | 'grupos'>('desejos');

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-24 pb-32 max-w-container-max mx-auto px-6 space-y-12"
    >
      <AnimatePresence>
        {showPlans && <PlanOverlay onClose={() => setShowPlans(false)} />}
      </AnimatePresence>

      {/* Perfil Section */}
      <section className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-8 border-mahogany overflow-hidden book-shadow">
            <img src={IMAGES.profile} className="w-full h-full object-cover" alt="Perfil" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gold p-1 rounded-full border-2 border-mahogany gold-glow">
            <Verified size={16} className="text-mahogany fill-current" />
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-gold">Mestre Bibliófilo</h2>
          <p className="font-body italic text-sepia/70">Guardião da Chama Est. 1892</p>
          <p className="font-body text-xs text-sepia/50 mt-1">{userBooks.length} tomos na biblioteca pessoal</p>
        </div>

        <button 
          onClick={() => setShowPlans(true)}
          className="mt-2 flex items-center gap-2 px-8 py-3 bg-gold text-mahogany rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] select-none"
        >
          <Sparkles size={16} />
          Seja um Mágico
        </button>

        <div className="grid grid-cols-3 gap-4 w-full mt-4">
          <button className="flex flex-col items-center gap-2 p-3 bg-mahogany/30 rounded-xl border border-gold/10 hover:bg-gold/5 transition-all select-none">
            <Edit size={20} className="text-gold" />
            <span className="font-serif text-[9px] uppercase tracking-wider text-sepia">Editar Perfil</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 bg-mahogany/30 rounded-xl border border-gold/10 hover:bg-gold/5 transition-all select-none">
            <UserPlus size={20} className="text-gold" />
            <span className="font-serif text-[9px] uppercase tracking-wider text-sepia">Convidar</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 bg-mahogany/30 rounded-xl border border-gold/10 hover:bg-gold/5 transition-all select-none">
            <Share2 size={20} className="text-gold" />
            <span className="font-serif text-[9px] uppercase tracking-wider text-sepia">Compartilhar</span>
          </button>
        </div>
      </section>

      {/* Tabs */}
      <section className="space-y-6">
        <div className="flex border-b border-gold/10">
          {(['desejos', 'avaliacoes', 'grupos'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 font-serif text-[10px] uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-gold' : 'text-sepia/40 hover:text-sepia/70'
              }`}
            >
              {tab === 'desejos' ? 'Lista de Desejos' : tab === 'avaliacoes' ? 'Avaliações' : 'Grupos'}
              {activeTab === tab && (
                <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 w-full h-px bg-gold shadow-[0_0_8px_#D4AF37]" />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[100px]">
          {activeTab === 'desejos' && (
            <div className="space-y-4">
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlist.map(book => (
                    <div key={book.id} className="flex flex-col items-center select-none">
                      <div 
                        onClick={() => onBookSelect(book)}
                        className="w-full aspect-[2/3] rounded-sm book-shadow overflow-hidden border-l-4 border-black/40 cursor-pointer"
                      >
                        <img src={book.img} className="w-full h-full object-cover" alt={book.title} />
                      </div>
                      <p className="mt-2 font-serif text-sm italic text-gold/70 text-center leading-tight truncate w-full">{book.title}</p>
                      <button 
                        onClick={() => onRemoveFromWishlist(book)}
                        className="mt-1 text-[10px] text-red-400/60 hover:text-red-400 uppercase tracking-widest font-sans transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center italic text-sepia/40 font-serif text-sm">Nenhum livro na lista de desejos ainda.</p>
              )}
            </div>
          )}
          {activeTab === 'avaliacoes' && (
            <p className="text-center italic text-sepia/40 font-serif text-sm">Você ainda não avaliou nenhum livro.</p>
          )}
          {activeTab === 'grupos' && (
            <p className="text-center italic text-sepia/40 font-serif text-sm">Participe de grupos de leitura no santuário.</p>
          )}
        </div>
      </section>

      {/* Atividade Recente */}
      <section className="space-y-4">
        <h4 className="font-sans text-xs uppercase tracking-widest text-gold/60">Atividade Recente</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-mahogany/30 p-4 rounded-lg flex gap-4 items-center border border-amethyst/20">
            <img src={IMAGES.bookCover} className="w-16 h-24 object-cover rounded book-shadow" alt="Capa" />
            <div className="flex-1">
              <h5 className="font-serif text-lg text-gold">O Nome da Rosa</h5>
              <p className="font-body text-xs italic text-sepia/60">Umberto Eco</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-1 bg-mahogany rounded-full overflow-hidden">
                  <div className="h-full bg-gold w-3/4 shadow-[0_0_8px_#D4AF37]" />
                </div>
                <span className="font-serif text-[10px] text-gold/80">75%</span>
              </div>
            </div>
          </div>
          <div className="bg-mahogany/50 p-4 rounded-lg flex flex-col items-center justify-center text-center border border-gold/10">
            <span className="font-serif text-4xl text-gold">12</span>
            <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Horas Lidas</span>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

const LibraryScreen = ({ 
  userBooks, 
  onBookSelect,
  onRemoveFromLibrary 
}: { 
  userBooks: Book[]; 
  onBookSelect: (book: Book) => void;
  onRemoveFromLibrary: (book: Book) => void;
}) => {
  const [activeTab, setActiveTab] = useState<'minha' | 'escolher'>('minha');

  const choosingBooks = ALL_BOOKS.filter(b => !userBooks.some(ub => ub.id === b.id));

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-32 max-w-container-max mx-auto px-6"
    >
      <nav className="flex justify-center mb-12 border-b border-gold/10">
        <div className="flex gap-12 pb-3">
          <button 
            onClick={() => setActiveTab('minha')}
            className={`font-serif text-lg transition-colors relative group ${activeTab === 'minha' ? 'text-gold' : 'text-gold/40 hover:text-gold/60'}`}
          >
            Sua Biblioteca
            {activeTab === 'minha' && (
              <motion.span layoutId="libTab" className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-gold shadow-[0_0_8px_#D4AF37]" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('escolher')}
            className={`font-serif text-lg transition-colors relative group ${activeTab === 'escolher' ? 'text-gold' : 'text-gold/40 hover:text-gold/60'}`}
          >
            Livros para Escolher
            {activeTab === 'escolher' && (
              <motion.span layoutId="libTab" className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-gold shadow-[0_0_8px_#D4AF37]" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'minha' ? (
          <motion.div 
            key="minha"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-20"
          >
            <div className="relative pt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-2 px-4">
                {userBooks.map((book) => (
                  <div key={book.id} className="flex flex-col items-center select-none">
                    <motion.div 
                      whileHover={{ y: -10 }} 
                      onClick={() => onBookSelect(book)}
                      className="w-full aspect-[2/3] rounded-sm book-shadow overflow-hidden border-l-4 border-black/40 cursor-pointer"
                    >
                      <img src={book.img} className="w-full h-full object-cover" alt={book.title} />
                    </motion.div>
                    <p className="mt-4 font-serif text-sm italic text-gold/70 text-center leading-tight truncate w-full">{book.title}</p>
                    <button 
                      onClick={() => onRemoveFromLibrary(book)}
                      className="mt-2 text-[10px] text-red-400/60 hover:text-red-400 uppercase tracking-widest font-sans transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
              <div className="h-6 w-[calc(100%+24px)] -ml-3 wood-shelf rounded-sm relative -mt-4 z-0 opacity-80" />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="escolher"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-12"
          >
            {choosingBooks.map((book) => (
              <div 
                key={book.id} 
                onClick={() => onBookSelect(book)}
                className="flex flex-col items-center group cursor-pointer select-none"
              >
                <div className="relative w-full aspect-[2/3] rounded-sm book-shadow overflow-hidden border-l-4 border-black/40">
                  <img src={book.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={book.title} />
                  {book.magic && (
                    <div className="absolute top-2 right-2 bg-gold/90 p-1 rounded-sm shadow-lg">
                      <Sparkles size={12} className="text-mahogany" />
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <p className="font-serif text-sm italic text-gold/80 leading-tight truncate">{book.title}</p>
                  <p className="font-serif text-[10px] text-sepia/40 uppercase mt-1">{book.author}</p>
                  {book.magic && <span className="font-serif text-[8px] text-gold uppercase tracking-widest block mt-2">Plano Mágico</span>}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

const SeekScreen = ({ onBookSelect }: { onBookSelect: (book: Book) => void }) => {
  const [search, setSearch] = useState('');
  const searchHistory = ['O Nome da Rosa', 'Umberto Eco', 'Filosofia Clássica', 'Machado de Assis'];

  const sections = [
    { title: 'Mais Procurados', books: ALL_BOOKS.slice(0, 3) },
    { title: 'Livros Populares', books: ALL_BOOKS.slice(3, 6) },
    { title: 'Lançamentos', books: ALL_BOOKS.slice(6, 9) }
  ];

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-32 max-w-container-max mx-auto px-6 space-y-12"
    >
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold" size={18} />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Procure por títulos, autores ou segredos..."
          className="w-full pl-12 pr-4 py-4 bg-mahogany/30 border border-gold/20 rounded-xl focus:outline-none focus:border-gold transition-all font-serif text-gold/80 placeholder:text-gold/20"
        />
      </div>

      <section className="space-y-4">
        <h4 className="font-serif text-xs uppercase tracking-widest text-gold/40">Histórico de Pesquisa</h4>
        <div className="flex flex-wrap gap-2">
          {searchHistory.map((item, i) => (
            <button 
              key={i} 
              onClick={() => setSearch(item)}
              className="flex items-center gap-2 px-3 py-1 bg-mahogany/50 rounded-full border border-gold/10 font-serif text-[10px] text-sepia/60 hover:bg-gold/10 hover:text-gold transition-all select-none"
            >
              <Clock size={10} />
              {item}
            </button>
          ))}
        </div>
      </section>

      {search.trim() ? (
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gold/10 pb-2">
            <h4 className="font-serif text-lg text-gold">Resultados da Pesquisa</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {ALL_BOOKS.filter(b => 
              b.title.toLowerCase().includes(search.toLowerCase()) || 
              b.author.toLowerCase().includes(search.toLowerCase())
            ).map((book) => (
              <div 
                key={book.id} 
                onClick={() => onBookSelect(book)}
                className="flex flex-col items-center group cursor-pointer select-none"
              >
                <div className="relative w-full aspect-[2/3] rounded-sm book-shadow overflow-hidden border-l-4 border-black/40">
                  <img src={book.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={book.title} />
                </div>
                <div className="mt-4 text-center">
                  <p className="font-serif text-sm italic text-gold/80 leading-tight truncate">{book.title}</p>
                  <p className="font-serif text-[10px] text-sepia/40 uppercase mt-1">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        sections.map((section, i) => (
          <section key={i} className="space-y-6">
            <div className="flex justify-between items-center border-b border-gold/10 pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-gold/40" />
                <h4 className="font-serif text-lg text-gold">{section.title}</h4>
              </div>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
              {section.books.map((book, j) => (
                <motion.div 
                  key={j} 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onBookSelect(book)}
                  className="flex-shrink-0 w-24 h-36 rounded-sm book-shadow overflow-hidden border-l-2 border-black/40 cursor-pointer select-none"
                >
                  <img src={book.img} className="w-full h-full object-cover" alt="Livro" />
                </motion.div>
              ))}
            </div>
          </section>
        ))
      )}
    </motion.main>
  );
};

const BookDetailModal = ({ book, onClose, onAddToLibrary, onAddToWishlist, isInLibrary, isInWishlist }: {
  book: Book;
  onClose: () => void;
  onAddToLibrary: (b: Book) => void;
  onAddToWishlist: (b: Book) => void;
  isInLibrary: boolean;
  isInWishlist: boolean;
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="parchment-texture p-6 md:p-8 rounded-xl max-w-xl w-full text-ink space-y-6 relative border border-amethyst/30 overflow-y-auto max-h-[90vh]"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-ink/60 hover:text-ink hover:bg-black/5 p-2 rounded-full transition-colors select-none"
      >
        <X size={20} />
      </button>
      
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-40 h-60 flex-shrink-0 book-shadow rounded overflow-hidden border-l-4 border-black/40">
          <img src={book.img} className="w-full h-full object-cover" alt={book.title} />
        </div>
        <div className="flex-1 text-center md:text-left space-y-3">
          <div>
            <h3 className="font-serif text-2xl font-bold text-ink/90 leading-tight">{book.title}</h3>
            <p className="font-serif text-sm italic text-ink/60 mt-1">{book.author}</p>
          </div>
          <p className="font-body text-sm text-ink/80 leading-relaxed italic">{book.synopsis || "Uma obra extraordinária preservada nos arquivos da Grande Biblioteca."}</p>
          
          <div className="flex flex-col gap-2 pt-4">
            {!isInLibrary ? (
              <button 
                onClick={() => { onAddToLibrary(book); onClose(); }}
                className="w-full py-3 bg-amethyst text-gold rounded-lg font-serif text-sm font-bold gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 select-none"
              >
                <PlusCircle size={18} />
                <span>Adicionar à Biblioteca</span>
              </button>
            ) : (
              <span className="w-full py-3 bg-green-800/10 text-green-800 border border-green-800/30 rounded-lg font-sans text-xs uppercase tracking-widest flex items-center justify-center gap-2 select-none">
                <CheckCircle size={18} />
                <span>Já está na Biblioteca</span>
              </span>
            )}

            {!isInWishlist ? (
              <button 
                onClick={() => { onAddToWishlist(book); onClose(); }}
                className="w-full py-3 border border-amethyst/30 rounded-lg font-serif text-sm hover:bg-amethyst/5 transition-colors flex items-center justify-center gap-2 select-none"
              >
                <Heart size={18} />
                <span>Lista de Desejos</span>
              </button>
            ) : (
              <span className="w-full py-3 bg-red-800/10 text-red-800 border border-red-800/30 rounded-lg font-sans text-xs uppercase tracking-widest flex items-center justify-center gap-2 select-none">
                <Heart size={18} className="fill-current" />
                <span>Na Lista de Desejos</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>('santuario');
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // User Library and Wishlist state
  const [userBooks, setUserBooks] = useState<Book[]>([
    ALL_BOOKS[0],
    ALL_BOOKS[1],
    ALL_BOOKS[2]
  ]);
  const [wishlist, setWishlist] = useState<Book[]>([]);

  // Book Selection state for modal
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    setShowSettings(false);
    setIsLoggedIn(false);
    setScreen('login');
  };

  const addToLibrary = (book: Book) => {
    if (!userBooks.some(b => b.id === book.id)) {
      setUserBooks([...userBooks, book]);
    }
  };

  const removeFromLibrary = (book: Book) => {
    setUserBooks(userBooks.filter(b => b.id !== book.id));
  };

  const addToWishlist = (book: Book) => {
    if (!wishlist.some(b => b.id === book.id)) {
      setWishlist([...wishlist, book]);
    }
  };

  const removeFromWishlist = (book: Book) => {
    setWishlist(wishlist.filter(b => b.id !== book.id));
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      if (screen === 'forgot_password') return <ForgotPasswordScreen onBack={() => setScreen('login')} />;
      return <LoginScreen onLogin={() => { setIsLoggedIn(true); setScreen('santuario'); }} onForgotPassword={() => setScreen('forgot_password')} />;
    }

    switch (screen) {
      case 'santuario': return <SantuarioScreen onBookSelect={setSelectedBook} />;
      case 'library': return <LibraryScreen userBooks={userBooks} onBookSelect={setSelectedBook} onRemoveFromLibrary={removeFromLibrary} />;
      case 'scribe': return <ScribeScreen userBooks={userBooks} wishlist={wishlist} onBookSelect={setSelectedBook} onRemoveFromWishlist={removeFromWishlist} />;
      case 'seek': return <SeekScreen onBookSelect={setSelectedBook} />;
      default: return <SantuarioScreen onBookSelect={setSelectedBook} />;
    }
  };

  return (
    <div className="min-h-screen bg-ink">
      {isLoggedIn && <TopAppBar onSettings={() => setShowSettings(true)} />}
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={isLoggedIn ? screen : (screen === 'forgot_password' ? 'forgot' : 'login')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {isLoggedIn && <BottomNavBar currentScreen={screen} setScreen={setScreen} />}

      <AnimatePresence>
        {showSettings && (
          <SettingsScreen 
            onClose={() => setShowSettings(false)} 
            onLogout={() => setShowLogoutConfirm(true)}
            onDeleteAccount={() => alert('Recurso em desenvolvimento: Excluir conta requer confirmação ancestral.')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoutConfirm && (
          <LogoutConfirmation 
            onConfirm={handleLogout}
            onCancel={() => setShowLogoutConfirm(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedBook && (
          <BookDetailModal 
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onAddToLibrary={addToLibrary}
            onAddToWishlist={addToWishlist}
            isInLibrary={userBooks.some(b => b.id === selectedBook.id)}
            isInWishlist={wishlist.some(b => b.id === selectedBook.id)}
          />
        )}
      </AnimatePresence>
      
      {/* Camada Global de Granulado */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[200] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
