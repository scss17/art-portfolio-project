// Function to handle setting up the active class on buttons
const setActiveButton = () => {
  const buttons = document.querySelectorAll(".btn-project");
  const projectCards = document.querySelectorAll(".project-card");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Check if the button is active
      const isActive = button.classList.contains("active");

      // Remove the 'active' class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));

      if (isActive) {
        // If the button was active, show all cards
        projectCards.forEach((card) => card.classList.remove("inactive"));
      } else {
        // Otherwise, activate the clicked button
        button.classList.add("active");

        // Filter the cards based on the button type
        const buttonType = button.classList[1];

        projectCards.forEach((card) => {
          const cardType = card.classList[1];

          if (cardType !== buttonType) {
            card.classList.add("inactive");
          } else {
            card.classList.remove("inactive");
          }
        });
      }
    });
  });
};

// Function to create and load the project buttons
const loadButtons = () => {
  const buttons = {
    painting: {
      active: "01_painting_active",
      inactive: "01_painting_inactive",
    },
    photography: {
      active: "02_photography_active",
      inactive: "02_photography_inactive",
    },
    ceramics: {
      active: "03_ceramics_active",
      inactive: "03_ceramics_inactive",
    },
    printmaking: {
      active: "04_printmaking_active",
      inactive: "04_printmaking_inactive",
    },
    // architecture: {
    //   active: "05_architecture_active",
    //   inactive: "05_architecture_inactive",
    // },
    sculpture: {
      active: "06_sculpture_active",
      inactive: "06_sculpture_inactive",
    },
  };

  const projectButtons = document.getElementById("project-buttons");

  // Loop through each project type in the buttons object and create buttons
  for (let key in buttons) {
    if (buttons.hasOwnProperty(key)) {
      const { active, inactive } = buttons[key];

      const button = document.createElement("button");
      button.classList.add("btn-project");
      button.classList.add(`project-${key}`);

      // Set custom properties for the images using inline styles
      button.style.setProperty(
        "--image-default",
        `url('../img/buttons/${inactive}.png')`
      );
      button.style.setProperty(
        "--image-active",
        `url('../img/buttons/${active}.png')`
      );

      // Append the button to the projectButtons container
      projectButtons.appendChild(button);
    }
  }
};

// Function to load the cards for the projects
const loadCards = async () => {
  const cardContainer = document.querySelector(".cards-grid");

  try {
    // Fetch project data from JSON file
    const response = await fetch("data/project_images.json");
    const projectFiles = await response.json();

    Object.entries(projectFiles).forEach(([type, projects]) => {
      Object.keys(projects).forEach((project, index) => {
        const card = document.createElement("div");
        card.classList.add("project-card", `project-${type}`);

        // Set background image using inline styles
        const cardUrl = `url(img/cards/${index + 1}_${type}.jpg)`;
        card.style.backgroundImage = cardUrl;

        //* Redirect on a link
        card.addEventListener("click", () => {
          window.location.href = `project.html?type=${type}&project=${project}`;
        });

        // Append card to the container
        cardContainer.appendChild(card);
      });
    });
  } catch (error) {
    console.error("Error loading project cards: ", error);
  }
};

// Main function to initialize everything on page load
const setupPage = async () => {
  const buttons = document.querySelectorAll(".btn-project");
  const projectCards = document.querySelectorAll(".project-card");

  if (buttons.length === 0) {
    // Load and create buttons
    loadButtons();

    if (projectCards.length === 0) {
      // Load the cards for the projects
      await loadCards();
    }

    // Set up event listeners for active button logic
    setActiveButton();
  }
};

// Call setupPage when the document is fully loaded
window.addEventListener("DOMContentLoaded", setupPage);
