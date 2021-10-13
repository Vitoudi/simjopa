interface IStorage<T> {
  create: () => Promise<void>;
  getAll: () => Promise<T>[];
  get: (id: string) => Promise<T>;
  delete: (id: string) => Promise<void>;
  update: (id: string) => Promise<void>;
}