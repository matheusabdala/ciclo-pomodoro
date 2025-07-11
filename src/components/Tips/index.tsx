import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  // tips
  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        Foque por <strong> {state.config.workTime}min</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        Descanse por
        <strong> {state.config.shortBreakTime}min</strong>
      </span>
    ),
    longBreakTime: (
      <span>
        Descanso longo de <strong>{state.config.longBreakTime}min</strong>
      </span>
    ),
  };

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <strong> {state.config.workTime}min de foco</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        Próximo descanso é de
        <strong> {state.config.shortBreakTime}min</strong>
      </span>
    ),
    longBreakTime: (
      <span>
        Próximo ciclo é de
        <strong> {state.config.longBreakTime}min de descanso longo</strong>
      </span>
    ),
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
