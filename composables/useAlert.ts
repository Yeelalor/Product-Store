import Swal from "sweetalert2";

export const useAlert = () => {
  const showSuccess = (message: string) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      confirmButtonText: "OK",
      text: message,
      heightAuto: false,
      didOpen: () => {
        const container = document.querySelector(
          ".swal2-container"
        ) as HTMLElement | null;
        const popup = document.querySelector(
          ".swal2-popup"
        ) as HTMLElement | null;
        if (container) container.style.zIndex = "9999999";
        if (popup) popup.style.zIndex = "10000000";
      },
      customClass: {
        confirmButton: "my-confirm-button",
      },
    });
  };

  const showError = (message: string) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      showCancelButton: true,
      text: message,
      heightAuto: false,
      didOpen: () => {
        const container = document.querySelector(
          ".swal2-container"
        ) as HTMLElement | null;
        const popup = document.querySelector(
          ".swal2-popup"
        ) as HTMLElement | null;
        if (container) container.style.zIndex = "9999999";
        if (popup) popup.style.zIndex = "10000000";
      },
      customClass: {
        cancelButton: "my-cancel-button",
      },
    });
  };
  const showWarning = (message: string) => {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      confirmButtonText: "OK",
      text: message,
      width: 500,
      heightAuto: false,
      didOpen: () => {
        const container = document.querySelector(
          ".swal2-container"
        ) as HTMLElement | null;
        const popup = document.querySelector(
          ".swal2-popup"
        ) as HTMLElement | null;
        if (container) container.style.zIndex = "9999999";
        if (popup) popup.style.zIndex = "10000000";
      },
      customClass: {
        confirmButton: "my-warning-button",
      },
    });
  };
  const showConfirm = (message: string, onConfirm: () => void) => {
    Swal.fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      cancelButtonColor: "gray",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "white",
      customClass: {
        confirmButton: "my-confirm-button",
        cancelButton: "my-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // perform action
        console.log("===========confirm");
        onConfirm();
      }
    });
  };
  return {
    showConfirm,
    showSuccess,
    showError,
    showWarning,
  };
};
