export type MouseContextType = {
  showCloseButton: boolean;
  setShowCloseButton: React.Dispatch<React.SetStateAction<boolean>>;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
}