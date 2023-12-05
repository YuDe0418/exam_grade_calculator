document.getElementById('addSubjectBtn').addEventListener('click', addSubject);
document.getElementById('calculateBtn').addEventListener('click', calculateGrades);

const defaultSubjects = [
    { name: '國文', credits: 4 },
    { name: '英文', credits: 4 },
    { name: '數學', credits: 4 },
    { name: '公民', credits: 2 },
    { name: '地理', credits: 2 },
    { name: '歷史', credits: 2 },
    { name: '物理', credits: 2 },
    { name: '化學', credits: 2 }
];

defaultSubjects.forEach(subject => {
    addSubject(subject.name, subject.credits);
});

function addSubject(subjectName = '', credits = 0) 
{
    const subjectsDiv = document.getElementById('subjects');
    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject');

    subjectDiv.innerHTML = `
        <label for="subjectName">學科名稱：</label>
        <input type="text" class="subjectName" value="${subjectName}" placeholder="請輸入學科名稱" required>
        <label for="score">分數：</label>
        <input type="number" class="score" placeholder="請輸入成績" required>
        <label for="credits">學分：</label>
        <input type="text" class="credits" value="${credits}" placeholder="請輸入學分" required>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '刪除';
    deleteBtn.addEventListener('click', () => {
        subjectsDiv.removeChild(subjectDiv);
    });

    subjectDiv.appendChild(deleteBtn);
    subjectsDiv.appendChild(subjectDiv);
}

function calculateGrades() 
{
    const subjects = document.querySelectorAll('.subject');
    let totalScore = 0;
    let totalCredits = 0;
    let weightedTotal = 0;
    let failedSubjects = 0;
    let inputError = false;

    subjects.forEach(subject => {
        const scoreInput = subject.querySelector('.score');
        const creditsInput = subject.querySelector('.credits');
        const subjectNameInput = subject.querySelector('.subjectName');

        const score = parseFloat(scoreInput.value);
        const credits = parseFloat(creditsInput.value);
        const subjectName = subjectNameInput.value.trim();

        if (isNaN(score) || score < 0 || score > 100 || isNaN(credits) || subjectName === '') 
        {
            inputError = true;
            subjectNameInput.style.borderColor = 'red';
            scoreInput.style.borderColor = 'red';
            creditsInput.style.borderColor = 'red';
        } 
        else 
        {
            subjectNameInput.style.borderColor = '';
            scoreInput.style.borderColor = '';
            creditsInput.style.borderColor = '';

            totalScore += score;
            totalCredits += credits;
            weightedTotal += score * credits;

            if (score < 60) 
            {
                subject.classList.add('fail');
                failedSubjects++;
            } 
            else 
            {
                subject.classList.remove('fail');
            }
        }
    });

    if (inputError) 
    {
        displayError('請輸入合理範圍內的成績');
    } 
    else 
    {
        const average = totalScore / subjects.length;
        const weightedAverage = weightedTotal / totalCredits;

        displayResults(totalScore, average, weightedTotal, weightedAverage, failedSubjects);
    }
}

function displayResults(totalScore, average, weightedTotal, weightedAverage, failedSubjects) 
{
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>總分：${totalScore}</p>
        <p>平均：${average.toFixed(2)}</p>
        <p>加權總分：${weightedTotal.toFixed(2)}</p>
        <p>加權平均：${weightedAverage.toFixed(2)}</p>
        <p>不及格學科數：${failedSubjects}</p>
    `;
}

function displayError(errorMessage) 
{
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p style="color: red; font-size: 18px;">${errorMessage}</p>`;
}
