import { useEffect, useState, type CSSProperties } from 'react'
import { Bell, Check, Flame, Headphones, Play, Plus, Sparkles, Target } from 'lucide-react'

type Task = {
  id: number
  title: string
  detail: string
  duration: string
  completed: boolean
}

const initialTasks: Task[] = [
  { id: 1, title: 'Beber água', detail: 'Seu primeiro combustível do dia', duration: '2 min', completed: true },
  { id: 2, title: 'Respiração consciente', detail: 'Prepare sua mente para vencer', duration: '3 min', completed: false },
  { id: 3, title: 'Definir a prioridade', detail: 'Escolha uma vitória importante', duration: '5 min', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [alarmActive, setAlarmActive] = useState(true)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const completedCount = tasks.filter((task) => task.completed).length
  const progress = Math.round((completedCount / tasks.length) * 100)
  const toggleTask = (id: number) => setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))

  return (
    <main className="app-shell">
      <nav className="topbar">
        <div className="brand"><span className="brand-mark"><Sparkles size={18} /></span><span>Alarme de <strong>Sucesso</strong></span></div>
        <div className="topbar-actions"><span className="live-dot" /> <span>Segunda, 24 de junho</span><button className="icon-button" aria-label="Notificações"><Bell size={19} /></button><div className="avatar">AS</div></div>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">SEGUNDA-FEIRA, 24 JUN</p>
          <h1>Bom dia, <span>Artur.</span><br />Vamos começar bem.</h1>
          <p className="hero-subtitle">Pequenas vitórias constroem grandes dias. Sua próxima está a poucos minutos.</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => setAlarmActive(!alarmActive)}><Play size={17} fill="currentColor" /> {alarmActive ? 'Alarme ativo' : 'Ativar alarme'}</button><button className="secondary-button"><Headphones size={17} /> Ouvir motivação</button></div>
        </div>
        <div className={`alarm-card ${alarmActive ? 'is-active' : ''}`}>
          <div className="alarm-card-top"><span className="alarm-label"><span className="pulse" /> ALARME DE HOJE</span><span className="alarm-status">{alarmActive ? 'ATIVO' : 'PAUSADO'}</span></div>
          <div className="alarm-time">06:30 <span>AM</span></div>
          <div className="alarm-meta"><span><Bell size={14} /> Todos os dias úteis</span><span><Target size={14} /> 3 desafios</span></div>
          <div className="alarm-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <button className="edit-alarm">Editar alarme <span>↗</span></button>
        </div>
      </section>

      <section className="stats-row"><article className="stat-card streak-card"><div className="stat-icon orange"><Flame size={22} /></div><div><p>Sequência de vitórias</p><strong>12 <small>dias</small></strong><span className="stat-note">+2 desde a semana passada</span></div><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div></article><article className="stat-card"><div className="stat-icon blue"><Target size={22} /></div><div><p>Progresso de hoje</p><strong>{progress}<small>%</small></strong><span className="stat-note">{completedCount} de {tasks.length} desafios concluídos</span></div><div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` } as CSSProperties}><b>{progress}%</b></div></article><article className="quote-card"><Sparkles size={25} /><p>“A disciplina de hoje<br />é a liberdade de amanhã.”</p><span>— James Clear</span></article></section>

      <section className="content-grid"><div className="tasks-panel"><div className="section-heading"><div><p className="eyebrow">SEU RITUAL MATINAL</p><h2>Vitórias de hoje</h2></div><button className="add-button"><Plus size={17} /> Adicionar</button></div><div className="task-list">{tasks.map((task) => <button className={`task-row ${task.completed ? 'completed' : ''}`} key={task.id} onClick={() => toggleTask(task.id)}><span className="check-circle">{task.completed && <Check size={15} strokeWidth={3} />}</span><span className="task-info"><strong>{task.title}</strong><small>{task.detail}</small></span><span className="task-duration">{task.duration}</span></button>)}</div></div><aside className="focus-panel"><div className="focus-heading"><span className="focus-icon"><Sparkles size={17} /></span><span><b>Modo Foco</b><small>Proteja sua manhã</small></span><span className="toggle on" /></div><div className="focus-line"><span>Próxima notificação</span><strong>06:35</strong></div><p>Sem soneca. Apenas o próximo passo.</p><button className="focus-button">Configurar modo foco <span>→</span></button></aside></section>
      <footer><span>Seu dia começa com uma decisão.</span><span>Feito para começar. <b>●</b> Feito para vencer.</span></footer>
    </main>
  )
}

export default App
