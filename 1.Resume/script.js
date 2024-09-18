// Get the button and skills section by ID
var toggleButton = document.getElementById('toggle-skills');
var skillsSection = document.getElementById('skills');
// Event listener for button click to toggle visibility
toggleButton.addEventListener('click', function () {
    if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
        // Show the skills section and change button text to "Hide Skills"
        skillsSection.style.display = 'block';
        toggleButton.textContent = 'Hide Skills';
    }
    else {
        // Hide the skills section and change button text to "Show Skills"
        skillsSection.style.display = 'none';
        toggleButton.textContent = 'Show Skills';
    }
});
