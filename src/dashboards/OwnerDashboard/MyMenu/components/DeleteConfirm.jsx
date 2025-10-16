import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

const DeleteConfirm = ({ isOpen, onClose, itemName, onConfirm }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40" />
      <div className="flex min-h-screen items-center justify-center p-4">
        <DialogPanel className="w-full z-50 max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Delete
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Are you sure you want to delete{' '}
                <span className="font-medium text-red-600">"{itemName}"</span>?
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteConfirm;
