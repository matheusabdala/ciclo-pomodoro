import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useState } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

import styles from './styles.module.css';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
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

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
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
        <Tips />
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
            key='submit_button'
          />
        ) : (
          <DefaultButton
            aria-label='Interroper tarefa atual'
            title='Interroper tarefa atual'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key='button_button'
          />
        )}
      </div>
    </form>
  );
}
