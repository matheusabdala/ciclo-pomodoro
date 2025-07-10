import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useState } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

import styles from './styles.module.css';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const [taskName, setTaskName] = useState('');

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!taskName.trim()) {
      alert('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, // verificar
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining), // verificar
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action=''>
      <div className={styles.formRow}>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Digite algo...'
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          disabled={!!state.activeTask}
        />
      </div>
      <div className={styles.formRow}>
        <span>Próximo tempo de foco é de 25min</span>
      </div>

      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}

      <div className={styles.formRow}>
        {!state.activeTask ? (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
          />
        ) : (
          <DefaultButton
            aria-label='Interroper tarefa atual'
            title='Interroper tarefa atual'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
          />
        )}
      </div>
    </form>
  );
}
