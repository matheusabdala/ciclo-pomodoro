import { TrashIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { DefaultButton } from '../../components/DefaultButton';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState, useMemo } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { ConfirmModal } from '../../components/ConfirmModal';

import styles from './styles.module.css';

const ITEMS_PER_PAGE = 10;

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
    setCurrentPage(1);
  }, [state.tasks]);

  const totalPages = Math.ceil(sortTasksOptions.tasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentTasks = useMemo(() => {
    return sortTasksOptions.tasks.slice(startIndex, endIndex);
  }, [sortTasksOptions.tasks, startIndex, endIndex]);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';
    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
    setCurrentPage(1);
  }

  function handleResetHistory() {
    setIsModalOpen(true);
  }

  function handleConfirmReset() {
    dispatch({ type: TaskActionTypes.RESET_STATE });
    setIsModalOpen(false);
    setCurrentPage(1);
  }

  function handleCancelReset() {
    setIsModalOpen(false);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function getVisiblePages() {
    const maxVisiblePages = 5;
    const pages: number[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        );
      }
    }

    return pages;
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar Todo o Histórico'
                title='Apagar Histórico'
                onClick={handleResetHistory}
              ></DefaultButton>
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <>
            <div className={styles.responsiveTable}>
              <table>
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSortTasks({ field: 'name' })}
                      className={styles.thSort}
                    >
                      Tarefa ↕
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: 'duration' })}
                      className={styles.thSort}
                    >
                      Duração ↕
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: 'startDate' })}
                      className={styles.thSort}
                    >
                      Data ↕
                    </th>
                    <th>Status</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map(task => {
                    const taskTypeDictionary = {
                      workTime: 'Foco',
                      shortBreakTime: 'Descanso curto',
                      longBreakTime: 'Descanso longo',
                    };
                    return (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.duration}min</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{getTaskStatus(task, state.activeTask)}</td>
                        <td>{taskTypeDictionary[task.type]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className={styles.paginationContainer}>
                <div className={styles.paginationInfo}>
                  Mostrando {startIndex + 1} a{' '}
                  {Math.min(endIndex, sortTasksOptions.tasks.length)} de{' '}
                  {sortTasksOptions.tasks.length} tarefas
                </div>

                <div className={styles.paginationControls}>
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                    aria-label='Página anterior'
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {getVisiblePages().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
                      className={`${styles.paginationButton} ${
                        currentPage === page
                          ? styles.paginationButtonActive
                          : ''
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                    aria-label='Próxima página'
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!hasTasks && (
          <p style={{ textAlign: 'center' }}>
            Não existe nenhuma tarefa criada. <br />
            Crie tarefas e volte! 😁
          </p>
        )}
      </Container>
      <ConfirmModal
        text='Tem certeza que deseja apagar todo o histórico?'
        isOpen={isModalOpen}
        onConfirm={handleConfirmReset}
        onCancel={handleCancelReset}
      />
    </MainTemplate>
  );
}
