const projectsGrid = document.getElementById("projectsGrid");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

async function loadProjects() {
  try {
    const response = await fetch("/api/projects");
    const result = await response.json();

    if (!result.success || !result.data.length) {
      projectsGrid.innerHTML = "<p class='loading'>No projects available yet.</p>";
      return;
    }

    projectsGrid.innerHTML = result.data.map((project) => `
      <article class="project-card">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tags">
          ${(project.techStack || []).map((tech) => `<span class="tag">${escapeHtml(tech)}</span>`).join("")}
        </div>
        <div class="project-links">
          ${project.github ? `<a href="${project.github}" target="_blank" rel="noreferrer">GitHub ↗</a>` : ""}
          ${project.live ? `<a href="${project.live}" target="_blank" rel="noreferrer">Live ↗</a>` : ""}
        </div>
      </article>
    `).join("");
  } catch (error) {
    projectsGrid.innerHTML = "<p class='loading'>Unable to load projects. Check the server.</p>";
  }
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "Sending...";

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    formStatus.textContent = result.message;

    if (result.success) contactForm.reset();
  } catch (error) {
    formStatus.textContent = "Could not send message. Please try again.";
  }
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadProjects();
