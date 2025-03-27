// function to get the query parameters from the url
const getQueryParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    type: urlParams.get("type"),
    project: urlParams.get("project"),
  };
};

// Function to check if the type and project are valid
const checkTypeAndProject = (type, project) => {
  const projectFiles = {
    painting: ["hues_of_home"],
    photography: ["the_taste_of_books", "built_out_of_stone"],
    ceramics: ["the_shore_of_another_world"],
    printmaking: [
      "just_planted",
      "sunday_morning",
      "i_find_you",
      "in_the_middle_of_nowhere",
    ],
    sculpture: ["trust_the_process", "beyond_the_frame"],
  };

  return (
    Object.keys(projectFiles).includes(type) &&
    projectFiles[type].includes(project)
  );
};

// Function to load projects based on the query parameters
const loadProjects = async () => {
  const { type, project } = getQueryParameters();
  const isThereAProject = checkTypeAndProject(type, project);

  if (!isThereAProject) {
    document
      .getElementById("project-not-available")
      .classList.remove("inactive");
    return;
  }

  try {
    const response = await fetch("data/project_images.json");
    const projectData = await response.json();
    const imageCount = projectData[type]?.[project] || 0;

    if (imageCount > 0) {
      const projectImages = document.getElementById("project-images");

      for (let i = 0; i < imageCount; i++) {
        const image = document.createElement("img");
        image.src = `img/projects/${type}/${project}/${project}_${i + 1}.jpg`;

        image.classList.add("project-image");

        projectImages.appendChild(image);
      }
    }
  } catch (error) {
    console.error("Error loading project images:", error);
  }
};

// Call setupPage when the document is fully loaded
window.addEventListener("DOMContentLoaded", loadProjects);
