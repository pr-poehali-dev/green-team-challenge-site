import { useState } from "react";
import Icon from "@/components/ui/icon";

const TASKS = [
  {
    id: 1,
    emoji: "📸",
    title: "Фото с куратором",
    description: "Подойди к одному из кураторов зелёной команды и сфотографируйся вместе. Куратор должен показать «победный» жест!",
    points: 10,
    difficulty: "Лёгкое",
    diffColor: "text-green-400",
    tag: "Знакомство",
  },
  {
    id: 2,
    emoji: "🌿",
    title: "Зелёный манифест",
    description: "Запиши короткое видео (15–30 сек), где ты кричишь девиз зелёной команды вместе с двумя другими отрядами.",
    points: 20,
    difficulty: "Среднее",
    diffColor: "text-yellow-400",
    tag: "Творчество",
  },
  {
    id: 3,
    emoji: "🏆",
    title: "Зелёная флешмоб-цепочка",
    description: "Собери цепочку из 10 человек разных команд, которые встают на фото в зелёных элементах одежды или с зелёными предметами.",
    points: 30,
    difficulty: "Сложное",
    diffColor: "text-red-400",
    tag: "Командное",
  },
  {
    id: 4,
    emoji: "🎯",
    title: "Вожатский квиз",
    description: "Ответь правильно на 3 вопроса о зелёной команде, которые задаст куратор на месте. Вопросы у каждого куратора разные!",
    points: 15,
    difficulty: "Среднее",
    diffColor: "text-yellow-400",
    tag: "Знания",
  },
  {
    id: 5,
    emoji: "🎨",
    title: "Арт-атака",
    description: "Нарисуй логотип или символ зелёной команды на бумаге и подари его куратору. Самые крутые попадут в галерею!",
    points: 25,
    difficulty: "Среднее",
    diffColor: "text-yellow-400",
    tag: "Творчество",
  },
  {
    id: 6,
    emoji: "⚡",
    title: "Скоростной вызов",
    description: "Найди куратора зелёных раньше всех своего отряда и скажи ему кодовое слово «ЗЕЛЁНЫЙ ГРОМ». Только первые 5 получают баллы!",
    points: 35,
    difficulty: "Сложное",
    diffColor: "text-red-400",
    tag: "Скорость",
  },
];

const LEADERBOARD_INIT = [
  { rank: 1, team: "Красные орлы", score: 85, completed: 4, avatar: "🦅" },
  { rank: 2, team: "Синие волки", score: 70, completed: 3, avatar: "🐺" },
  { rank: 3, team: "Жёлтые тигры", score: 55, completed: 3, avatar: "🐯" },
  { rank: 4, team: "Белые медведи", score: 40, completed: 2, avatar: "🐻" },
  { rank: 5, team: "Фиолетовые совы", score: 25, completed: 1, avatar: "🦉" },
];

const CURATORS = [
  { name: "Яна", role: "Куратор", emoji: "👩‍🏫", contact: "@yanavalishova" },
  { name: "Камиль", role: "Куратор", emoji: "👨‍🎓", contact: "@KePch1k23" },
];

const GALLERY_INIT = [
  { id: 1, team: "Красные орлы", task: "Фото с куратором", emoji: "📸" },
  { id: 2, team: "Синие волки", task: "Зелёный манифест", emoji: "🌿" },
  { id: 3, team: "Жёлтые тигры", task: "Арт-атака", emoji: "🎨" },
];

type Section = "home" | "tasks" | "leaderboard" | "contacts" | "gallery";

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [leaderboard, setLeaderboard] = useState(LEADERBOARD_INIT);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ team: "", score: "" });
  const [galleryLink, setGalleryLink] = useState("");
  const [gallerySubmitted, setGallerySubmitted] = useState(false);

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "tasks", label: "Задания", icon: "Zap" },
    { id: "leaderboard", label: "Таблица", icon: "Trophy" },
    { id: "gallery", label: "Галерея", icon: "Image" },
    { id: "contacts", label: "Контакты", icon: "Users" },
  ];

  const toggleTask = (id: number) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const addLeaderboardEntry = () => {
    if (!newEntry.team || !newEntry.score) return;
    const score = parseInt(newEntry.score);
    const updated = [
      ...leaderboard,
      { rank: leaderboard.length + 1, team: newEntry.team, score, completed: Math.floor(score / 15), avatar: "⭐" },
    ]
      .sort((a, b) => b.score - a.score)
      .map((e, i) => ({ ...e, rank: i + 1 }));
    setLeaderboard(updated);
    setNewEntry({ team: "", score: "" });
    setShowAddModal(false);
  };

  const renderRankMedal = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen noise-bg hexagon-pattern relative overflow-x-hidden">
      <div className="fixed top-20 left-[-80px] w-64 h-64 rounded-full bg-green-500/10 blur-3xl pointer-events-none" />
      <div className="fixed bottom-40 right-[-60px] w-48 h-48 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />

      {/* Шапка */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/40 flex items-center justify-center text-xl">
                🌿
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div>
              <div className="font-russo text-sm text-green-400 text-glow leading-none">ЗЕЛЁНАЯ</div>
              <div className="font-russo text-xs text-muted-foreground leading-none mt-0.5">КОМАНДА</div>
            </div>
          </div>
          <div className="font-caveat text-lg text-muted-foreground hidden sm:block">Школа вожатых 2026</div>
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5">
            <span className="text-xs font-golos text-green-400">{completedTasks.length}/{TASKS.length}</span>
            <span className="text-xs text-muted-foreground">заданий</span>
          </div>
        </div>
        <nav className="max-w-5xl mx-auto px-4 pb-2 flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-golos font-medium whitespace-nowrap transition-all duration-200 ${
                active === item.id
                  ? "bg-green-500/20 text-green-400 border border-green-500/40"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <Icon name={item.icon} size={13} />
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 relative z-10">

        {/* ===== ГЛАВНАЯ ===== */}
        {active === "home" && (
          <div className="space-y-8">
            <div className="relative rounded-3xl overflow-hidden border border-green-500/20 bg-gradient-to-br from-green-950/60 to-background/80 p-8 md:p-12">
              <div className="absolute inset-0 opacity-30">
                <img
                  src="https://cdn.poehali.dev/projects/2bdf881f-ac06-46f1-adaf-ab02e4457845/files/ef7e23f0-00c7-4fa9-995a-a01fc0d4abfb.jpg"
                  alt="hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
              </div>
              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-golos text-sm text-green-400">Школа вожатых 2026</span>
                </div>
                <h1 className="font-russo text-4xl md:text-6xl text-white text-glow leading-tight mb-4 animate-fade-in-up delay-100">
                  ЗЕЛЁНАЯ<br />
                  <span className="text-green-400">КОМАНДА</span>
                </h1>
                <p className="font-golos text-muted-foreground text-base md:text-lg mb-8 animate-fade-in-up delay-200">
                  Выполняй задания, зарабатывай баллы и попади в таблицу лидеров. Покажи, что твоя команда — лучшая!
                </p>
                <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300">
                  <button
                    onClick={() => setActive("tasks")}
                    className="shimmer-btn text-white font-russo text-sm px-6 py-3 rounded-xl glow-green transition-all hover:scale-105"
                  >
                    НАЧАТЬ ЗАДАНИЯ ⚡
                  </button>
                  <button
                    onClick={() => setActive("leaderboard")}
                    className="bg-secondary/60 border border-border text-foreground font-golos text-sm px-6 py-3 rounded-xl hover:bg-secondary transition-all hover:scale-105"
                  >
                    🏆 Таблица лидеров
                  </button>
                </div>
              </div>
              <div className="absolute right-8 top-8 animate-float hidden md:block">
                <div className="w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-5xl glow-green">
                  🏆
                </div>
              </div>
              <div className="absolute right-32 bottom-8 animate-float-delay hidden md:block">
                <div className="w-14 h-14 rounded-2xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-3xl">
                  ⭐
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Заданий", value: TASKS.length, icon: "Zap", color: "text-green-400" },
                { label: "Твоих побед", value: completedTasks.length, icon: "CheckCircle", color: "text-lime-400" },
                { label: "Команд", value: leaderboard.length, icon: "Users", color: "text-yellow-400" },
                { label: "Макс. баллов", value: TASKS.reduce((s, t) => s + t.points, 0), icon: "Star", color: "text-orange-400" },
              ].map((stat, i) => (
                <div key={i} className="card-hover bg-card/60 border border-border/60 rounded-2xl p-5 text-center animate-fade-in-up">
                  <Icon name={stat.icon} size={20} className={`${stat.color} mx-auto mb-2`} />
                  <div className={`font-russo text-3xl ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="font-golos text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-russo text-xl text-foreground">АКТИВНЫЕ ЗАДАНИЯ</h2>
                <button onClick={() => setActive("tasks")} className="text-green-400 text-sm font-golos hover:underline">
                  Все задания →
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {TASKS.slice(0, 3).map((task, i) => (
                  <div
                    key={task.id}
                    className={`card-hover bg-card/60 border rounded-2xl p-5 cursor-pointer animate-fade-in-up ${
                      completedTasks.includes(task.id) ? "border-green-500/50 bg-green-950/20" : "border-border/60"
                    }`}
                    onClick={() => setActive("tasks")}
                  >
                    <div className="text-4xl mb-3 animate-float">{task.emoji}</div>
                    <h3 className="font-russo text-sm text-foreground mb-1">{task.title}</h3>
                    <p className="font-golos text-xs text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-russo text-green-400 text-sm">+{task.points} pts</span>
                      {completedTasks.includes(task.id) && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">✓ Выполнено</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ЗАДАНИЯ ===== */}
        {active === "tasks" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between animate-fade-in-up">
              <div>
                <h2 className="font-russo text-3xl text-foreground text-glow">ЗАДАНИЯ</h2>
                <p className="font-golos text-muted-foreground text-sm mt-1">Выполняй и отмечай — зарабатывай баллы для команды</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl px-4 py-3 text-center">
                <div className="font-russo text-2xl text-green-400">
                  {completedTasks.reduce((sum, id) => sum + (TASKS.find((t) => t.id === id)?.points || 0), 0)}
                </div>
                <div className="font-golos text-xs text-muted-foreground">твоих баллов</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {TASKS.map((task) => {
                const done = completedTasks.includes(task.id);
                return (
                  <div
                    key={task.id}
                    className={`card-hover relative border rounded-2xl p-6 animate-fade-in-up ${
                      done ? "border-green-500/50 bg-gradient-to-br from-green-950/40 to-card/60 glow-green" : "border-border/60 bg-card/60"
                    }`}
                  >
                    {done && (
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm animate-bounce-in">
                        ✓
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-5xl flex-shrink-0">{task.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="inline-block bg-secondary/60 border border-border/50 text-xs font-golos text-muted-foreground px-2 py-0.5 rounded-full">
                            {task.tag}
                          </span>
                          <span className={`text-xs font-golos ${task.diffColor}`}>{task.difficulty}</span>
                        </div>
                        <h3 className="font-russo text-base text-foreground">{task.title}</h3>
                      </div>
                    </div>
                    <p className="font-golos text-sm text-muted-foreground mb-5 leading-relaxed">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-russo text-green-400 text-lg">+{task.points}</span>
                        <span className="font-golos text-xs text-muted-foreground ml-1">баллов</span>
                      </div>
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`font-golos text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:scale-105 ${
                          done ? "bg-green-500/20 border border-green-500/40 text-green-400" : "bg-green-500 text-white glow-green hover:bg-green-400"
                        }`}
                      >
                        {done ? "✓ Выполнено" : "Отметить"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-green-950/40 to-card/60 border border-green-500/30 rounded-3xl p-6 md:p-8 animate-fade-in-up">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-4xl">📤</div>
                <div>
                  <h3 className="font-russo text-xl text-foreground mb-1">ОТПРАВИТЬ РЕЗУЛЬТАТ</h3>
                  <p className="font-golos text-sm text-muted-foreground">
                    Выложи фото/видео в соцсети и пришли нам ссылку — куратор добавит баллы вручную
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  value={galleryLink}
                  onChange={(e) => setGalleryLink(e.target.value)}
                  placeholder="https://vk.com/... или https://t.me/..."
                  className="flex-1 bg-background/60 border border-border/60 rounded-xl px-4 py-3 font-golos text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500/60 transition-colors"
                />
                <button
                  onClick={() => { if (galleryLink) { setGallerySubmitted(true); setGalleryLink(""); setTimeout(() => setGallerySubmitted(false), 5000); } }}
                  className="bg-green-500 text-white font-russo text-sm px-6 py-3 rounded-xl glow-green hover:bg-green-400 transition-all hover:scale-105 whitespace-nowrap"
                >
                  ОТПРАВИТЬ 🚀
                </button>
              </div>
              {gallerySubmitted && (
                <div className="mt-4 flex items-center gap-2 text-green-400 animate-fade-in-up">
                  <Icon name="CheckCircle" size={16} />
                  <span className="font-golos text-sm">Ссылка получена! Куратор проверит и начислит баллы.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ТАБЛИЦА ЛИДЕРОВ ===== */}
        {active === "leaderboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between animate-fade-in-up">
              <div>
                <h2 className="font-russo text-3xl text-foreground">ТАБЛИЦА ЛИДЕРОВ</h2>
                <p className="font-golos text-muted-foreground text-sm mt-1">
                  Текущее состояние на {new Date().toLocaleDateString("ru-RU")}
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 font-golos text-sm px-4 py-2 rounded-xl hover:bg-green-500/20 transition-all"
              >
                <Icon name="Plus" size={14} />
                Добавить
              </button>
            </div>

            {leaderboard.length >= 3 && (
              <div className="flex items-end justify-center gap-4 pt-4 pb-2 animate-fade-in-up delay-100">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{leaderboard[1]?.avatar}</span>
                  <div className="bg-card/60 border border-border/60 rounded-2xl p-4 w-28 text-center">
                    <div className="font-russo text-2xl text-slate-300">🥈</div>
                    <div className="font-russo text-sm text-foreground mt-1 truncate">{leaderboard[1]?.team.split(" ")[0]}</div>
                    <div className="font-russo text-xl text-slate-300 mt-1">{leaderboard[1]?.score}</div>
                  </div>
                  <div className="bg-slate-500/30 w-28 h-16 rounded-t-xl" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl animate-float">{leaderboard[0]?.avatar}</span>
                  <div className="bg-gradient-to-b from-yellow-900/40 to-card/60 border border-yellow-500/40 rounded-2xl p-4 w-32 text-center glow-gold">
                    <div className="font-russo text-2xl text-yellow-400">🥇</div>
                    <div className="font-russo text-sm text-foreground mt-1 truncate">{leaderboard[0]?.team.split(" ")[0]}</div>
                    <div className="font-russo text-2xl text-yellow-400 mt-1">{leaderboard[0]?.score}</div>
                  </div>
                  <div className="bg-yellow-500/30 w-32 h-24 rounded-t-xl" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{leaderboard[2]?.avatar}</span>
                  <div className="bg-card/60 border border-border/60 rounded-2xl p-4 w-28 text-center">
                    <div className="font-russo text-2xl text-orange-400">🥉</div>
                    <div className="font-russo text-sm text-foreground mt-1 truncate">{leaderboard[2]?.team.split(" ")[0]}</div>
                    <div className="font-russo text-xl text-orange-400 mt-1">{leaderboard[2]?.score}</div>
                  </div>
                  <div className="bg-orange-500/30 w-28 h-10 rounded-t-xl" />
                </div>
              </div>
            )}

            <div className="space-y-3">
              {leaderboard.map((entry, i) => (
                <div
                  key={i}
                  className={`card-hover flex items-center gap-4 rounded-2xl p-4 border animate-fade-in-up ${
                    entry.rank === 1 ? "bg-yellow-950/20 border-yellow-500/30" :
                    entry.rank === 2 ? "bg-slate-900/40 border-slate-500/30" :
                    entry.rank === 3 ? "bg-orange-950/20 border-orange-500/20" :
                    "bg-card/60 border-border/60"
                  }`}
                >
                  <div className="font-russo text-2xl w-10 text-center flex-shrink-0">{renderRankMedal(entry.rank)}</div>
                  <div className="text-3xl flex-shrink-0">{entry.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-russo text-sm text-foreground truncate">{entry.team}</div>
                    <div className="font-golos text-xs text-muted-foreground">{entry.completed} заданий выполнено</div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <div className={`font-russo text-xl ${
                      entry.rank === 1 ? "text-yellow-400" :
                      entry.rank === 2 ? "text-slate-300" :
                      entry.rank === 3 ? "text-orange-400" : "text-green-400"
                    }`}>{entry.score}</div>
                    <div className="font-golos text-xs text-muted-foreground">баллов</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card/60 border border-border/60 rounded-2xl p-6 animate-fade-in-up">
              <h3 className="font-russo text-base text-foreground mb-4">ПРОГРЕСС КОМАНД</h3>
              <div className="space-y-3">
                {leaderboard.map((entry, i) => {
                  const maxScore = leaderboard[0]?.score || 1;
                  const pct = Math.round((entry.score / maxScore) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-golos text-xs text-muted-foreground">{entry.team}</span>
                        <span className="font-russo text-xs text-green-400">{entry.score} pts</span>
                      </div>
                      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-lime-400 rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== ГАЛЕРЕЯ ===== */}
        {active === "gallery" && (
          <div className="space-y-6">
            <div className="animate-fade-in-up">
              <h2 className="font-russo text-3xl text-foreground">ГАЛЕРЕЯ ПОБЕД</h2>
              <p className="font-golos text-muted-foreground text-sm mt-1">Фото и видео выполненных заданий от всех команд</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {GALLERY_INIT.map((item, i) => (
                <div key={item.id} className="card-hover bg-card/60 border border-border/60 rounded-2xl overflow-hidden animate-fade-in-up">
                  <div className="h-40 bg-gradient-to-br from-green-950/60 to-secondary/40 flex items-center justify-center text-7xl">
                    {item.emoji}
                  </div>
                  <div className="p-4">
                    <div className="font-russo text-sm text-foreground mb-1">{item.team}</div>
                    <div className="font-golos text-xs text-muted-foreground">{item.task}</div>
                  </div>
                </div>
              ))}
              <div className="card-hover bg-card/30 border border-dashed border-border/40 rounded-2xl h-52 flex flex-col items-center justify-center text-muted-foreground gap-2 animate-fade-in-up">
                <Icon name="Plus" size={32} className="opacity-40" />
                <span className="font-golos text-sm opacity-60">Здесь будут ваши результаты</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-950/40 to-card/60 border border-green-500/30 rounded-3xl p-6 animate-fade-in-up">
              <h3 className="font-russo text-lg text-foreground mb-2">📲 КАК ПОПАСТЬ В ГАЛЕРЕЮ?</h3>
              <p className="font-golos text-sm text-muted-foreground mb-4">
                Выполни задание, сделай фото или видео, выложи с тегом{" "}
                <span className="text-green-400 font-semibold">#ЗелёнаяКоманда</span>{" "}
                и отправь ссылку куратору. Лучшие работы появятся здесь!
              </p>
              <button
                onClick={() => setActive("tasks")}
                className="bg-green-500 text-white font-russo text-sm px-5 py-2.5 rounded-xl glow-green hover:bg-green-400 transition-all hover:scale-105"
              >
                К ЗАДАНИЯМ ⚡
              </button>
            </div>
          </div>
        )}

        {/* ===== КОНТАКТЫ ===== */}
        {active === "contacts" && (
          <div className="space-y-6">
            <div className="animate-fade-in-up">
              <h2 className="font-russo text-3xl text-foreground">КУРАТОРЫ</h2>
              <p className="font-golos text-muted-foreground text-sm mt-1">Найди нас и выполни задание — мы всегда рядом!</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {CURATORS.map((c, i) => (
                <div key={i} className="card-hover bg-card/60 border border-border/60 rounded-2xl p-6 text-center animate-fade-in-up">
                  <div className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500/30 flex items-center justify-center text-5xl mx-auto mb-4 glow-green">
                    {c.emoji}
                  </div>
                  <div className="font-russo text-lg text-foreground mb-1">{c.name}</div>
                  <div className="font-golos text-sm text-muted-foreground mb-4">{c.role}</div>
                  <a
                    href={`https://t.me/${c.contact.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 font-golos text-sm px-4 py-2 rounded-xl hover:bg-green-500/20 transition-all hover:scale-105"
                  >
                    <Icon name="MessageCircle" size={14} />
                    {c.contact}
                  </a>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-green-950/40 to-card/60 border border-green-500/30 rounded-3xl p-6 md:p-8 animate-fade-in-up">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-russo text-xl text-foreground mb-3">📍 КАК НАС НАЙТИ?</h3>
                  <ul className="space-y-3 font-golos text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▶</span>Кураторы зелёной команды носят зелёные браслеты или значки</li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▶</span>На общих сборах мы стоим в зелёной зоне</li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▶</span>В столовой ищи столики с зелёными флажками</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-russo text-xl text-foreground mb-3">⏰ РЕЖИМ РАБОТЫ</h3>
                  <ul className="space-y-3 font-golos text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▶</span>Утро: 9:00–11:00 — утренние задания</li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▶</span>День: 14:00–17:00 — основные активности</li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▶</span>Вечер: 19:00–21:00 — подведение итогов</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Модалка добавления в таблицу */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm animate-bounce-in shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-russo text-lg text-foreground">ДОБАВИТЬ КОМАНДУ</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-golos text-sm text-muted-foreground mb-1.5 block">Название команды</label>
                <input
                  type="text"
                  value={newEntry.team}
                  onChange={(e) => setNewEntry({ ...newEntry, team: e.target.value })}
                  placeholder="Например: Красные орлы"
                  className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 font-golos text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500/60 transition-colors"
                />
              </div>
              <div>
                <label className="font-golos text-sm text-muted-foreground mb-1.5 block">Количество баллов</label>
                <input
                  type="number"
                  value={newEntry.score}
                  onChange={(e) => setNewEntry({ ...newEntry, score: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 font-golos text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500/60 transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-secondary/50 border border-border text-foreground font-golos text-sm py-3 rounded-xl hover:bg-secondary transition-all"
              >
                Отмена
              </button>
              <button
                onClick={addLeaderboardEntry}
                className="flex-1 bg-green-500 text-white font-russo text-sm py-3 rounded-xl glow-green hover:bg-green-400 transition-all"
              >
                ДОБАВИТЬ
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="max-w-5xl mx-auto px-4 py-6 mt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <span className="font-russo text-sm text-muted-foreground">ЗЕЛЁНАЯ КОМАНДА</span>
        </div>
        <div className="font-caveat text-muted-foreground/60 text-base">Школа вожатых 2026 • Вместе к победе!</div>
      </footer>
    </div>
  );
}