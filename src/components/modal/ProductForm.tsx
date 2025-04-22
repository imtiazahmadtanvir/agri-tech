interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function ProductForm({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/20 z-50">hi</div>;
}
