const skillButtons = document.querySelectorAll(".skill");
const selectedContainer = document.getElementById("skillsSelected");
const hiddenInput = document.getElementById("skillsInput");
const toggleButton = document.getElementById("toggleButton");
const hiddenSkills = document.querySelector(".hidden-skills");
const otherButton = document.getElementById("otherButton");
const otherInputContainer = document.getElementById("otherInputContainer");
const otherInput = document.getElementById("otherInput");
const addOther = document.getElementById("addOther");

let selectedSkills = [];
let expanded = false;

// Gestion clics sur les boutons métiers
skillButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const skill = btn.textContent;

    if (selectedSkills.includes(skill)) {
      selectedSkills = selectedSkills.filter(s => s !== skill);
      btn.classList.remove("selected");
    } else {
      selectedSkills.push(skill);
      btn.classList.add("selected");
    }

    updateSelectedDisplay();
  });
});

toggleButton.addEventListener("click", () => {
  expanded = !expanded;
  hiddenSkills.style.display = expanded ? "flex" : "none";
  toggleButton.textContent = expanded ? "Voir moins" : "Voir plus";
});

otherButton.addEventListener("click", () => {
  otherInputContainer.style.display = "block";
  otherInput.focus();
});

addOther.addEventListener("click", () => {
  const value = otherInput.value.trim();
  if (value && !selectedSkills.includes(value)) {
    selectedSkills.push(value);
    updateSelectedDisplay();
    otherInput.value = "";
  }
});

// Affichage des tags + suppression
function updateSelectedDisplay() {
  selectedContainer.innerHTML = "";

  selectedSkills.forEach(skill => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = skill;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.innerHTML = "×";
    removeBtn.title = "Supprimer";

    removeBtn.addEventListener("click", () => {
      selectedSkills = selectedSkills.filter(s => s !== skill);
      // Déselectionner bouton si existant
      skillButtons.forEach(btn => {
        if (btn.textContent === skill) btn.classList.remove("selected");
      });
      updateSelectedDisplay();
    });

    tag.appendChild(removeBtn);
    selectedContainer.appendChild(tag);
  });

  hiddenInput.value = selectedSkills.join(",");
}
