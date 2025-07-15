import { useState, useEffect } from 'react';
import { Container } from '../../components/Container';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { DefaultButton } from '../../components/DefaultButton';
import { PlusIcon, CheckIcon } from 'lucide-react';
import { showMessage } from '../../adapters/showMessage';

const STORAGE_KEY = 'taskList';

export function TaskList() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Erro ao carregar tarefas do localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    if (taskName.trim() === '') {
      showMessage.dismiss();
      showMessage.error('Digite uma Tarefa');
      return;
    }
    setTasks(prev => [...prev, taskName.trim()]);
    setTaskName('');
  }

  function handleRemoveTask(index: number) {
    setTasks(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          Lista de Tarefas
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<PlusIcon />}
              aria-label='Adicionar tarefa'
              title='Adicionar tarefa'
              onClick={handleAddTask}
            />
          </span>
        </Heading>
        <p style={{ textAlign: 'center' }}>
          Essa é uma lista de tarefas independente do pomodoro, para melhorar
          sua organização!
        </p>
      </Container>

      <Container>
        <div className={styles.formRow}>
          <DefaultInput
            labelText='Nome da Tarefa'
            id='addTask'
            type='text'
            placeholder='Digite a sua tarefa...'
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
          />
        </div>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Tarefas</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={index}
                  className={styles.taskRow}
                  onClick={() => handleRemoveTask(index)}
                >
                  <td className={styles.taskCell}>
                    <span className={styles.checkWrapper}>
                      <CheckIcon className={styles.checkIcon} />
                    </span>
                    <span>{task}</span>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td>Nenhuma tarefa adicionada ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
