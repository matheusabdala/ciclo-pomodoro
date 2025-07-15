import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useState } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

import styles from './styles.module.css';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';
  const [taskName, setTaskName] = useState(lastTaskName);

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (!taskName.trim()) {
      showMessage.warn(
        'Você precisa digitar o nome da tarefa antes de começar.',
      );
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
    showMessage.success(`Tarefa iniciada com sucesso! Bom foco. 🚀`);
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    showMessage.error(
      `Tarefa interrompida. Tudo bem, recomece quando estiver pronto.`,
    );
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action=''>
      <div className={styles.formRow}>
        <DefaultInput
          labelText='Nome da tarefa'
          id='meuInput'
          type='text'
          placeholder='Ex: Estudar React'
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
            aria-label='Começar tarefa'
            title='Começar tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            key='submit_button'
          />
        ) : (
          <DefaultButton
            aria-label='Interromper tarefa'
            title='Interromper tarefa atual'
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
