// ========== SIDEBAR FUNCTIONALITY ==========

// Get sidebar elements
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeSidebar = document.getElementById("closeSidebar");

// Function to open sidebar
function openSidebar() {
  sidebar.classList.remove("sidebar-closed");
  sidebar.classList.add("sidebar-open");
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Function to close sidebar
function closeSidebarFunc() {
  sidebar.classList.add("sidebar-closed");
  sidebar.classList.remove("sidebar-open");
  overlay.classList.add("hidden");
  document.body.style.overflow = ""; // Restore scrolling
}

// Event listeners for sidebar
hamburger.addEventListener("click", openSidebar);
closeSidebar.addEventListener("click", closeSidebarFunc);
overlay.addEventListener("click", closeSidebarFunc);

// Close sidebar with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebarFunc();
});

// ========== FILTER TABS FUNCTIONALITY ==========

// Get filter elements
const filterTabs = document.querySelectorAll(".filter-tab");
const loanTableContainer = document.getElementById("loan-table-container");
const monthlyReleasesContainer = document.getElementById(
  "monthly-releases-container",
);
const monthlyCollectionsContainer = document.getElementById(
  "monthly-collections-container",
);
const loanRows = document.querySelectorAll(".loan-row");

// Add click event to each filter tab
filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    filterTabs.forEach((t) => t.classList.remove("active"));
    // Add active class to clicked tab
    tab.classList.add("active");

    // Get filter type from data attribute
    const filter = tab.dataset.filter;

    // Hide all containers first
    loanTableContainer.classList.add("hidden");
    monthlyReleasesContainer.classList.add("hidden");
    monthlyCollectionsContainer.classList.add("hidden");

    // Show appropriate container based on filter
    if (filter === "monthly-releases") {
      monthlyReleasesContainer.classList.remove("hidden");
    } else if (filter === "monthly-collections") {
      monthlyCollectionsContainer.classList.remove("hidden");
    } else {
      loanTableContainer.classList.remove("hidden");

      // Filter loan rows by status
      loanRows.forEach((row) => {
        if (filter === "all") {
          row.style.display = ""; // Show all rows
        } else {
          // Show only rows matching the filter status
          if (row.dataset.status === filter) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        }
      });
    }
  });
});

// ========== LOAN APPLICATION MODAL ==========

// Get loan modal elements
const loanModal = document.getElementById("loanModal");
const openLoanModalButton = document.getElementById("openLoanModalButton");
const closeModalButton = document.getElementById("closeModal");

// Open loan modal
openLoanModalButton.addEventListener("click", () => {
  loanModal.classList.remove("hidden");
});

// Close loan modal
closeModalButton.addEventListener("click", () => {
  loanModal.classList.add("hidden");
});

// Close modal when clicking outside
loanModal.addEventListener("click", (e) => {
  if (e.target === loanModal) {
    loanModal.classList.add("hidden");
  }
});

// ========== PAYMENT SCHEDULE MODAL ==========

// Get payment schedule modal elements
const viewPaymentScheduleButtons = document.querySelectorAll(
  ".viewPaymentScheduleBtn",
);
const paymentScheduleModal = document.getElementById("paymentScheduleModal");
const closePaymentScheduleModalButton = document.getElementById(
  "closePaymentScheduleModal",
);

// Function to show payment schedule modal
function showPaymentScheduleModal() {
  paymentScheduleModal.classList.remove("hidden");
}

// Function to hide payment schedule modal
function hidePaymentScheduleModal() {
  paymentScheduleModal.classList.add("hidden");
  actionMenu.classList.add("hidden"); // Also hide action menu
}

// Add click event to all "View Payment Schedule" buttons
viewPaymentScheduleButtons.forEach((button) => {
  button.addEventListener("click", showPaymentScheduleModal);
});

// Close button event
if (closePaymentScheduleModalButton) {
  closePaymentScheduleModalButton.addEventListener(
    "click",
    hidePaymentScheduleModal,
  );
}

// Close when clicking outside modal
if (paymentScheduleModal) {
  paymentScheduleModal.addEventListener("click", (e) => {
    if (e.target === paymentScheduleModal) {
      hidePaymentScheduleModal();
    }
  });
}

// ========== CALCULATION MODAL ==========

// Get calculation modal elements
const openCalcModalButton = document.getElementById("open-calc-modal");
const calcModal = document.getElementById("calculation-modal");
const closeCalcModalButton = document.getElementById("closeCalcModal");
const calcCancelButton = document.getElementById("calc-cancel-button");
const calcApplyButton = document.getElementById("calc-apply-button");

// Function to show calculation modal
const showCalcModal = () => {
  calcModal.classList.remove("hidden");
};

// Function to hide calculation modal
const hideCalcModal = () => {
  calcModal.classList.add("hidden");
};

// Open calculation modal
if (openCalcModalButton) {
  openCalcModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    showCalcModal();
  });
}

// Close calculation modal - X button
if (closeCalcModalButton) {
  closeCalcModalButton.addEventListener("click", hideCalcModal);
}

// Close calculation modal - Cancel button
if (calcCancelButton) {
  calcCancelButton.addEventListener("click", hideCalcModal);
}

// Close when clicking outside modal
if (calcModal) {
  calcModal.addEventListener("click", (e) => {
    if (e.target === calcModal) {
      hideCalcModal();
    }
  });
}

// ========== SUCCESS MODAL ==========

// Get success modal elements
const successModal = document.getElementById("success-modal");
const successOkButton = document.getElementById("success-ok-button");
const successTitle = document.getElementById("success-title");
const successMessage = document.getElementById("success-message");
const successIconContainer = document.getElementById("success-icon-container");

/**
 * Show success modal with custom content
 * @param {string} title - Modal title
 * @param {string} message - Success message
 * @param {string} iconHtml - HTML for icon
 * @param {boolean} isLoanSuccess - Whether this is a loan approval success
 */
const showSuccessModal = (title, message, iconHtml, isLoanSuccess = false) => {
  successTitle.textContent = title;
  successMessage.textContent = message;
  successIconContainer.innerHTML = iconHtml;
  successModal.classList.remove("hidden");

  // If loan success, also close loan modal when clicking OK
  if (isLoanSuccess) {
    successOkButton.onclick = () => {
      hideSuccessModal();
      loanModal.classList.add("hidden");
      successOkButton.onclick = hideSuccessModal; // Reset onclick
    };
  } else {
    successOkButton.onclick = hideSuccessModal;
  }
};

// Function to hide success modal
const hideSuccessModal = () => {
  successModal.classList.add("hidden");
};

// OK button event
successOkButton.addEventListener("click", hideSuccessModal);

// Apply Loan Button - Show success modal
if (calcApplyButton) {
  calcApplyButton.addEventListener("click", () => {
    hideCalcModal();
    const loanTitle = "Loan Approved!";
    const loanMessage =
      "The loan application was successfully processed and approved.";
    const loanIcon =
      '<svg class="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

    showSuccessModal(loanTitle, loanMessage, loanIcon, true);
  });
}

// ========== ACTION MENU (CONTEXT MENU) ==========

// Get action menu elements
const actionMenu = document.getElementById("actionMenu");
const sendActionTriggers = document.querySelectorAll(".send-action-trigger");
const actionButtons = document.querySelectorAll(".action-button");

// Track which send icon was clicked
let currentSendIcon = null;

/**
 * Show action menu near clicked icon
 * @param {Event} event - Click event
 */
const showActionMenu = (event) => {
  event.stopPropagation();
  hideActionMenu(); // Hide any existing menu first

  // Store reference to clicked icon
  currentSendIcon = event.currentTarget;
  const rect = currentSendIcon.getBoundingClientRect();

  // Position menu next to the icon
  actionMenu.style.top = `${rect.top + window.scrollY}px`;
  actionMenu.style.left = `${rect.left + rect.width + 10 + window.scrollX}px`;
  actionMenu.classList.remove("hidden");
};

// Function to hide action menu
const hideActionMenu = () => {
  actionMenu.classList.add("hidden");
  currentSendIcon = null;
};

// Add click event to all send action trigger icons
sendActionTriggers.forEach((icon) => {
  icon.addEventListener("click", showActionMenu);
});

// Handle action button clicks
actionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    // Get action type and data from current icon
    const action = button.dataset.action;
    const ref = currentSendIcon.dataset.ref;
    const date = currentSendIcon.dataset.date;
    let message = "";
    let title = "";
    let icon = "";

    // Set message based on action type
    if (action === "reminder") {
      message = `Reminder message successfully sent for the payment due on ${date}.`;
      title = "Reminder Sent";
      icon = '<i class="text-green-600 fa-4x fas fa-bell"></i>';
    } else if (action === "overdue") {
      message = `Overdue notice sent for loan #${ref}. The borrower has been notified.`;
      title = "Overdue Notice Sent";
      icon = '<i class="text-red-600 fa-4x fas fa-exclamation-triangle"></i>';
    } else if (action === "sms") {
      message = `SMS message successfully sent to the borrower's contact number.`;
      title = "SMS Sent";
      icon = '<i class="w-16 h-16 text-blue-600 fas fa-sms"></i>';
    }

    // Hide menu and show success modal
    hideActionMenu();
    showSuccessModal(title, message, icon);
  });
});

// Close action menu when clicking anywhere else on page
document.addEventListener("click", (e) => {
  if (
    !actionMenu.contains(e.target) &&
    !e.target.closest(".send-action-trigger")
  ) {
    hideActionMenu();
  }
});

// Close modals with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideActionMenu();
    hideSuccessModal();
  }
});

// ========== AUTO-SELECT TAB FROM URL HASH ==========

window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.substring(1); // Remove the # symbol

  if (hash) {
    const targetTab = document.querySelector(`[data-filter="${hash}"]`);

    if (targetTab) {
      targetTab.click();
    }
  }
});
