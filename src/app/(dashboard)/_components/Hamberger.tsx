import React, { useState } from "react";
import Sidenav from "./Sidenav";
import { Menu } from "lucide-react";

const Hamberger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle the modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to trigger the modal */}
      <button onClick={toggleModal}>
        <Menu />
      </button>
      {/* Modal */}{" "}
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Background backdrop */}
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={toggleModal} // Close modal when clicking outside
          ></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              {/* Adjust the side from where the panel comes in */}
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <div
                  className={`transform transition-transform ease-in-out duration-500 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                  } pointer-events-auto relative w-screen max-w-md`}
                >
                  {/* Close button */}
                  <div className="absolute right-0 top-0 -mr-8 flex pr-2 pt-4 sm:-mr-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5"></span>
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Modal content */}
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="relative mt-6 flex-1 px-4 sm:px-6 overflow-hidden">
                      <Sidenav setIsOpen={setIsOpen} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hamberger;
