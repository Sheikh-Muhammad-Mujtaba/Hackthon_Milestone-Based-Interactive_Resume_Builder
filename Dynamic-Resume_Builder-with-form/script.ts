interface Education {
    degree: string;
    school: string;
    graduationYear: number;
}

interface Experience {
    jobTitle: string;
    company: string;
    startYear: number;
    endYear: number | string;
    jobDescription: string;
}

interface Resume {
    name: string;
    email: string;
    phone: string;
    education: Education[];
    experience: Experience[];
    skills: string[];
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const addEducationBtn = document.getElementById('addEducation') as HTMLButtonElement;
    const addExperienceBtn = document.getElementById('addExperience') as HTMLButtonElement;
    const addSkillBtn = document.getElementById('addSkill') as HTMLButtonElement;
    const skillInput = document.getElementById('skillInput') as HTMLInputElement;
    const skillsList = document.getElementById('skillsList') as HTMLDivElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;

    addEducationBtn.addEventListener('click', () => addField('education'));
    addExperienceBtn.addEventListener('click', () => addField('experience'));
    addSkillBtn.addEventListener('click', addSkill);
    form.addEventListener('submit', generateResume);

    function addField(type: 'education' | 'experience'): void {
        const container = document.getElementById(`${type}Fields`) as HTMLDivElement;
        const newField = document.createElement('div');
        newField.className = `${type}-entry`;
        
        if (type === 'education') {
            newField.innerHTML = `
                <input type="text" name="degree" placeholder="Degree" required>
                <input type="text" name="school" placeholder="School" required>
                <input type="number" name="graduationYear" placeholder="Graduation Year" required>
            `;
        } else {
            newField.innerHTML = `
                <input type="text" name="jobTitle" placeholder="Job Title" required>
                <input type="text" name="company" placeholder="Company" required>
                <input type="number" name="startYear" placeholder="Start Year" required>
                <input type="number" name="endYear" placeholder="End Year">
                <textarea name="jobDescription" placeholder="Job Description" required></textarea>
            `;
        }
        
        container.appendChild(newField);
    }

    function addSkill(): void {
        const skill = skillInput.value.trim();
        if (skill) {
            const skillElement = document.createElement('span');
            skillElement.className = 'skill';
            skillElement.textContent = skill;
            skillsList.appendChild(skillElement);
            skillInput.value = '';
        }
    }

    function generateResume(event: Event): void {
        event.preventDefault();
        const formData = new FormData(form);
        const resume: Resume = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            education: [],
            experience: [],
            skills: Array.from(skillsList.children).map(skill => skill.textContent || '')
        };

        document.querySelectorAll('.education-entry').forEach((entry: Element) => {
            const inputs = entry.querySelectorAll('input');
            resume.education.push({
                degree: (inputs[0] as HTMLInputElement).value,
                school: (inputs[1] as HTMLInputElement).value,
                graduationYear: parseInt((inputs[2] as HTMLInputElement).value)
            });
        });

        document.querySelectorAll('.experience-entry').forEach((entry: Element) => {
            const inputs = entry.querySelectorAll('input');
            const textarea = entry.querySelector('textarea');
            resume.experience.push({
                jobTitle: (inputs[0] as HTMLInputElement).value,
                company: (inputs[1] as HTMLInputElement).value,
                startYear: parseInt((inputs[2] as HTMLInputElement).value),
                endYear: (inputs[3] as HTMLInputElement).value || 'Present',
                jobDescription: (textarea as HTMLTextAreaElement).value
            });
        });

        displayResume(resume);
    }

    function displayResume(resume: Resume): void {
        resumeOutput.innerHTML = `
            <h2>${resume.name}</h2>
            <p>Email: ${resume.email} | Phone: ${resume.phone}</p>
            
            <h3>Education</h3>
            ${resume.education.map(edu => `
                <p>${edu.degree} - ${edu.school}, ${edu.graduationYear}</p>
            `).join('')}
            
            <h3>Experience</h3>
            ${resume.experience.map(exp => `
                <h4>${exp.jobTitle} at ${exp.company}</h4>
                <p>${exp.startYear} - ${exp.endYear}</p>
                <p>${exp.jobDescription}</p>
            `).join('')}
            
            <h3>Skills</h3>
            <p>${resume.skills.join(', ')}</p>
        `;
    }
});