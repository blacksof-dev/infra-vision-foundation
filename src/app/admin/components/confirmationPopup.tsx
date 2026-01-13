import { Button } from "./button";

interface ConfirmationPopupProps {
   
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmationPopup({
  
  onClose,
  onDelete,
  title = "Confirm deletion",
  message = "This action cannot be undone. Are you sure you want to delete?",
}: ConfirmationPopupProps) {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-99  ">
      <div className="absolute inset-0 " onClick={onClose} />
      <div className="w-[24rem] flex flex-col relative blade-top-padding-s bg-white rounded-md shadow-2xl h-55  max-h-[70vh] overflow-auto overflow-x-hidden p-6">
        
        <div className="flex justify-between items-center mb-4">
          <h6 className="text-xl font-medium">{title}</h6>
        </div>
        <p className="text-sm text-darkgray/80">{message}</p>
        <div className="mt-auto flex justify-end gap-3">
          <Button
            text="Cancel"
            theme="transparentGray"
            size="small"
            onClick={onClose}
          />
          <Button text="Delete" theme="pink" size="small" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}
