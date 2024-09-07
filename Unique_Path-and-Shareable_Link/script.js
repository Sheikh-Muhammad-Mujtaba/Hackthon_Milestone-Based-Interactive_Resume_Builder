document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const setUsernameButton = document.getElementById('setUsername');
    const resumeForm = document.getElementById('resumeForm');
    const resumeOutput = document.getElementById('resumeOutput');
    const shareOptions = document.getElementById('shareOptions');
    const shareLink = document.getElementById('shareLink');
    const copyLinkButton = document.getElementById('copyLink');
    const downloadPDFButton = document.getElementById('downloadPDF');
    const editResumeButton = document.getElementById('editResume');
    const addEducationButton = document.getElementById('addEducation');
    const addExperienceButton = document.getElementById('addExperience');
    const addSkillButton = document.getElementById('addSkill');
    const educationFields = document.getElementById('educationFields');
    const experienceFields = document.getElementById('experienceFields');
    const skillsList = document.getElementById('skillsList');

    let username = '';

    // Set Username
    setUsernameButton.addEventListener('click', () => {
        if (usernameInput.value.trim()) {
            username = usernameInput.value.trim();
            document.getElementById('usernameInput').style.display = 'none';
            resumeForm.classList.remove('hidden');
        } else {
            alert('Please enter a valid username.');
        }
    });

    // Add Education Field
    addEducationButton.addEventListener('click', () => {
        const educationDiv = document.createElement('div');
        educationDiv.classList.add('education-entry');
        educationDiv.innerHTML = `
            <input type="text" name="degree" placeholder="Degree">
            <input type="text" name="school" placeholder="School">
            <input type="number" name="graduationYear" placeholder="Graduation Year">
            <button type="button" class="removeButton">Remove</button>
        `;
        educationFields.appendChild(educationDiv);

        // Add event listener for the remove button
        educationDiv.querySelector('.removeButton').addEventListener('click', () => {
            educationDiv.remove();
        });
    });

    // Add Experience Field
    addExperienceButton.addEventListener('click', () => {
        const experienceDiv = document.createElement('div');
        experienceDiv.classList.add('experience-entry');
        experienceDiv.innerHTML = `
            <input type="text" name="jobTitle" placeholder="Job Title">
            <input type="text" name="company" placeholder="Company">
            <input type="number" name="startYear" placeholder="Start Year">
            <input type="number" name="endYear" placeholder="End Year">
            <textarea name="jobDescription" placeholder="Job Description"></textarea>
            <button type="button" class="removeButton">Remove</button>
        `;
        experienceFields.appendChild(experienceDiv);

        // Add event listener for the remove button
        experienceDiv.querySelector('.removeButton').addEventListener('click', () => {
            experienceDiv.remove();
        });
    });

    // Add Skill
    addSkillButton.addEventListener('click', () => {
        const skillInput = document.getElementById('skillInput');
        if (skillInput.value.trim()) {
            const skillSpan = document.createElement('span');
            skillSpan.textContent = skillInput.value.trim();
            skillsList.appendChild(skillSpan);
            skillInput.value = '';
        } else {
            alert('Please enter a skill.');
        }
    });

    // Handle Resume Form Submission
    resumeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(resumeForm);
        const resumeContent = generateResumeContent(formData);
        
        resumeOutput.innerHTML = resumeContent;
        resumeOutput.classList.remove('hidden');
        shareOptions.classList.remove('hidden');
        
        // Set Share Link (simulated as a static URL for demo purposes)
        shareLink.value = 'https://example.com/resume/' + username;
    });

    // Copy Share Link
    copyLinkButton.addEventListener('click', () => {
        shareLink.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });

    // Download Resume as PDF
    downloadPDFButton.addEventListener('click', () => {
        // Implement PDF download functionality (e.g., using jsPDF library)
        alert('PDF download functionality is not implemented in this demo.');
    });

    // Edit Resume
    editResumeButton.addEventListener('click', () => {
        resumeOutput.classList.add('hidden');
        resumeForm.classList.remove('hidden');
    });

    function generateResumeContent(formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const profilePicture = formData.get('profilePicture');
        const skills = formData.getAll('skill').join(', ');

        let educationHTML = '';
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach(entry => {
            const degree = entry.querySelector('input[name="degree"]').value;
            const school = entry.querySelector('input[name="school"]').value;
            const graduationYear = entry.querySelector('input[name="graduationYear"]').value;
            if (degree || school || graduationYear) {
                educationHTML += `
                    <div>
                        <strong>${degree}</strong><br>
                        ${school}<br>
                        Graduation Year: ${graduationYear}<br>
                    </div>
                `;
            }
        });

        let experienceHTML = '';
        const experienceEntries = document.querySelectorAll('.experience-entry');
        experienceEntries.forEach(entry => {
            const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
            const company = entry.querySelector('input[name="company"]').value;
            const startYear = entry.querySelector('input[name="startYear"]').value;
            const endYear = entry.querySelector('input[name="endYear"]').value;
            const jobDescription = entry.querySelector('textarea[name="jobDescription"]').value;
            if (jobTitle || company || startYear || endYear || jobDescription) {
                experienceHTML += `
                    <div>
                        <strong>${jobTitle}</strong> at ${company}<br>
                        ${startYear} - ${endYear}<br>
                        ${jobDescription}<br>
                    </div>
                `;
            }
        });

        return `
    ${profilePicture ? `<img src="${URL.createObjectURL(profilePicture)}" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%;">` : ''}
            <h2 style="flex: 1; text-align:right">${name}</h2>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
        
            <h3>Skills</h3>
            <p>${skills}</p>
            <h3>Education</h3>
            ${educationHTML || '<p>No education details provided.</p>'}
            <h3>Work Experience</h3>
            ${experienceHTML || '<p>No work experience provided.</p>'}
        `;
    }
});
