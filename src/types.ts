export interface Todo {
  id: string;
  title: string;
  body?: string;
  complete: boolean;
  timestamp: string;
}

export interface Settings {
  serverLocation: string;
}

// props

export interface TodosActionBarProps {
  getTodos: () => void;
}

export interface TodosProps {
  completed?: boolean;
}

export interface TodoProps {
  todo: Todo;
}

export interface SettingsProps {
  serverLocation: string;
  setSettings: (s: Settings) => void;
}
