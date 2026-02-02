export function useFilterWithPagination<T>(
  setter: (value: T) => void,
  resetPage: () => void
) {
  return (value: T) => {
    setter(value);
    resetPage();
  };
}
