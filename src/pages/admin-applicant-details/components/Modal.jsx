import { useState } from "react";
import Modal from '@mui/material/Modal';
import Select from 'react-select';
import { Close } from '@material-ui/icons';

export default function StatusRemarksModal({open, handleClose}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
  };

  const options = [
    { value: '', label: 'Select an option' },
    { value: 'Pre-screened', label: 'Pre-screened' },
    { value: 'For HR Interview', label: 'For HR Interview' },
    { value: 'For Technical Interview', label: 'For Technical Interview' },
    { value: 'For Final Interview', label: 'For Final Interview' },
    { value: 'For Job Offer', label: 'For Job Offer' },
    { value: 'Accepted the Job Offer', label: 'Accepted the Job Offer' },
  ];


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      className="flex items-center justify-center h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
          <form onSubmit={handleSubmit} className="rounded-md">
            <div className="bg-white w-96 items-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="grid grid-cols-1 gap-6">
                <div>
                <label className="flex items-center justify-between">
                  <span className="block text-gray-700 font-bold mb-2">Status</span>
                  <Close onClick={handleClose} className="cursor-pointer" />
                </label>
                  <Select
                    options={options}
                    value={options.find(option => option.value === selectedOption)}
                    onChange={(selectedOption) => setSelectedOption(selectedOption.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="remarks"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="appearance-none border rounded w-full py-2 px-3 min-h-[200px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button className="bg-red-600 w-[100%] text-white py-3 px-4 rounded-md">
                                  Update Status
              </button>
            </div>
        </form>
  </Modal>
)};
