import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Tips() {
  const { state } = useTaskContext();
  // tips
  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        ⏳ Concentre-se pelos próximos{' '}
        <strong>{state.config.workTime}min.</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        🧘 Pausa curta: aproveite
        <strong> {state.config.shortBreakTime}min</strong> para relaxar
      </span>
    ),
    longBreakTime: (
      <span>
        🌴 Hora de um descanso maior
        <strong>
          {' '}
          {state.config.longBreakTime}min para recarregar as energias
        </strong>
      </span>
    ),
  };

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        🎯 O próximo ciclo será de{' '}
        <strong> {state.config.workTime}min de foco</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        🧘 Em seguida vem uma pausa rápida de
        <strong> {state.config.shortBreakTime}min.</strong>
      </span>
    ),
    longBreakTime: (
      <span>
        🌴 O próximo ciclo será um descanso longo de
        <strong> {state.config.longBreakTime}minutos</strong>
      </span>
    ),
  };

  return (
    <div className={styles.textCenter}>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </div>
  );
}
