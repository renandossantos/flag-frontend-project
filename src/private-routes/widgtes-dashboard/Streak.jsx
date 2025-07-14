import React, { useEffect, useState } from "react";
import {
  Star,
  Trophy,
  Flame,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Target,
} from "lucide-react";
import "./Streak.css";

const weekdays = ["D", "S", "T", "Q", "Q", "F", "S"];

const achievements = [
  {
    days: 3,
    label: "Estrela",
    icon: <Star size={24} />,
    challenge: "Treine por 3 dias consecutivos",
    color: "#FFC700",
  },
  {
    days: 5,
    label: "Superestrela",
    icon: <Zap size={24} />,
    challenge: "Treine por 5 dias consecutivos",
    color: "#FF6B35",
  },
  {
    days: 7,
    label: "Campeão",
    icon: <Trophy size={24} />,
    challenge: "Treine por 7 dias consecutivos",
    color: "#4ECDC4",
  },
  {
    days: 31,
    label: "Ícone",
    icon: <Award size={24} />,
    challenge: "Treine por 31 dias consecutivos",
    color: "#A8E6CF",
  },
  {
    days: 100,
    label: "Lenda",
    icon: <Flame size={24} />,
    challenge: "Treine por 100 dias consecutivos",
    color: "#FF6B6B",
  },
];

// Função para calcular streak flexível
const calculateStreakFlexible = (dates) => {
  if (!dates || dates.length === 0) {
    return 0;
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const sortedDates = dates.map((date) => new Date(date)).sort((a, b) => b - a);

  let streak = 0;
  let currentDate = new Date(today);

  for (let i = 0; i < sortedDates.length; i++) {
    const dateToCheck = new Date(currentDate);
    dateToCheck.setHours(0, 0, 0, 0);

    const trainingDate = new Date(sortedDates[i]);
    trainingDate.setHours(0, 0, 0, 0);

    if (dateToCheck.getTime() === trainingDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (i === 0 && dateToCheck.getTime() > trainingDate.getTime()) {
      // Se não treinou hoje, verificar se treinou ontem
      const yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      if (yesterday.getTime() === trainingDate.getTime()) {
        streak++;
        currentDate = new Date(yesterday);
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return streak;
};

// Função para gerar progresso semanal
const getWeekProgress = (dates) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekProgress = new Array(7).fill(false);

  if (dates) {
    dates.forEach((dateStr) => {
      const date = new Date(dateStr);
      const dayOfWeek = date.getDay();
      const weekStart = new Date(startOfWeek);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      if (date >= weekStart && date <= weekEnd) {
        weekProgress[dayOfWeek] = true;
      }
    });
  }

  return weekProgress;
};

const getMotivation = (streak) => {
  if (streak === 0) return "Comece sua sequência!";
  if (streak === 1) return "Mandou bem!";
  if (streak < 3) return "Continue assim!";
  if (streak < 7) return "Você está pegando ritmo!";
  if (streak < 31) return "Incrível! Mantenha a sequência!";
  if (streak < 100) return "Você é um ícone!";
  return "Lenda viva!";
};

const StreakWidget = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [weekProgress, setWeekProgress] = useState(new Array(7).fill(false));
  const [dates, setDates] = useState([]);
  const [page, setPage] = useState(0);

  const achievementsPerPage = 3;
  const totalPages = Math.ceil(achievements.length / achievementsPerPage);

  // Simular dados de treino(substituir por dados reais)
  useEffect(() => {
    // Exemplo de dados de treino - substituir pelos seus dados reais
    const mockDates = [
      "2025-07-10", // hoje
      "2025-07-09", // ontem
      "2025-07-08", // anteontem
      "2025-07-06", // sábado
      "2025-07-05", // sexta
    ];

    setDates(mockDates);
    setCurrentStreak(calculateStreakFlexible(mockDates));
    setWeekProgress(getWeekProgress(mockDates));
  }, []);

  // Adicionar um novo treino (função exemplo)
  const addWorkout = () => {
    const today = new Date().toISOString().split("T")[0];
    const newDates = [...dates];

    if (!newDates.includes(today)) {
      newDates.push(today);
      setDates(newDates);
      setCurrentStreak(calculateStreakFlexible(newDates));
      setWeekProgress(getWeekProgress(newDates));
    }
  };

  // Descobrir próxima conquista
  const nextAchievement = achievements.find((a) => currentStreak < a.days);

  // Verificar se o streak atual é válido (treinou hoje)
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const isStreakValid = dates.includes(todayStr);

  // Conquistas para a página atual
  const pagedAchievements = achievements.slice(
    page * achievementsPerPage,
    (page + 1) * achievementsPerPage
  );
  /* ####################################### */

  return (
    <div className="streak-widget">
      <div className="streak-header">
        <div className="streak-title">
          <Calendar size={20} className="streak-icon" />
          <span>Sequência de Treinos</span>
        </div>
        <Flame
          size={28}
          className={`flame-icon ${isStreakValid ? "active" : "inactive"}`}
        />
      </div>

      <div className="streak-main">
        <div className="streak-count">
          {currentStreak} {currentStreak === 1 ? "dia" : "dias"} de vitória
        </div>
        <div className="streak-motivation">{getMotivation(currentStreak)}</div>
      </div>

      {/* Progresso semanal */}
      <div className="week-progress">
        <div className="week-title">Esta semana</div>
        <div className="week-days">
          {weekdays.map((day, idx) => (
            <div key={day + idx} className="week-day">
              <div
                className={`day-circle ${weekProgress[idx] ? "completed" : ""}`}
              >
                {weekProgress[idx] ? <Star size={16} /> : day}
              </div>
              <span className="day-label">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="streak-divider"></div>

      {/* Conquistas */}
      <div className="achievements-section">
        <div className="achievements-header">
          <button
            className="page-btn"
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="achievements-grid">
            {pagedAchievements.map((ach) => {
              const isUnlocked = currentStreak >= ach.days;
              return (
                <div
                  key={ach.days}
                  className={`achievement ${isUnlocked ? "unlocked" : ""}`}
                  title={isUnlocked ? "✅ Desbloqueado!" : ach.challenge}
                >
                  <div
                    className="achievement-icon"
                    style={{
                      backgroundColor: isUnlocked ? ach.color : "#e0e0e0",
                      color: isUnlocked ? "white" : "#999",
                    }}
                  >
                    {ach.icon}
                  </div>
                  <div className="achievement-label">{ach.label}</div>
                  <div className="achievement-days">{ach.days} dias</div>
                </div>
              );
            })}
          </div>

          <button
            className="page-btn"
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
          >
            <ChevronRight size={10} />
          </button>
        </div>
      </div>

      {/* Próxima conquista */}
      <div className="next-achievement">
        {nextAchievement ? (
          <div>
            <Target size={16} className="target-icon" />
            Próxima conquista: <strong>
              {nextAchievement.days} dias
            </strong> - {nextAchievement.label}
          </div>
        ) : (
          <div className="all-unlocked">
            🎉 Você desbloqueou todas as conquistas!
          </div>
        )}
      </div>

      {/* Botão para adicionar treino (exemplo) */}
      <button className="add-workout-btn" onClick={addWorkout}>
        + Registrar treino de hoje
      </button>
    </div>
  );
};

export default StreakWidget;
