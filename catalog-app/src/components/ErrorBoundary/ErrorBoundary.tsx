import { Component, type ErrorInfo, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.mainWrapper}>
          <h2 className={styles.title}>Что-то пошло не так.</h2>
          <p className={styles.description}> Приложение столкнулось с непредвиденной ошибкой.</p>
          <button className={styles.reloadButton} onClick={() => window.location.reload()}>
            Обновить страницу
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}