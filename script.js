"use strict";

/* =========================================================
   STUDYOS — CBSE CLASS 10 STUDY TRACKER
   HTML + CSS + JavaScript
   Saves progress in this browser using localStorage.
   ========================================================= */


/* ==================== 1. CONFIGURATION ==================== */

const STORAGE_KEY = "studyos_class10_data_v1";

const SUBJECTS = [
    "Maths",
    "Science",
    "SST",
    "English",
    "Hindi",
    "IT"
];

const PREBOARD_DATE = "2026-11-19";

const WORKSHEETS = [
    { id: "w1", name: "W1 — NCERT + Exemplar", minutes: 125 },
    { id: "w2", name: "W2 — PYQs", minutes: 135 },
    { id: "w3", name: "W3 — Competency-based", minutes: 105 },
    { id: "w4", name: "W4 — Push Yourself", minutes: 50 }
];


/*
   Starter chapter lists.

   These are editable starter lists, not a guarantee that every
   chapter is included in the final CBSE 2026–27 syllabus.
   You can edit these names to match your school syllabus.
*/

const CHAPTERS = {
    Maths: [
        "Real Numbers",
        "Polynomials",
        "Pair of Linear Equations in Two Variables",
        "Quadratic Equations",
        "Arithmetic Progressions",
        "Triangles",
        "Coordinate Geometry",
        "Introduction to Trigonometry",
        "Some Applications of Trigonometry",
        "Circles",
        "Areas Related to Circles",
        "Surface Areas and Volumes",
        "Statistics",
        "Probability"
    ],

    Science: [
        "Chemical Reactions and Equations",
        "Acids, Bases and Salts",
        "Metals and Non-metals",
        "Carbon and Its Compounds",
        "Life Processes",
        "Control and Coordination",
        "How Do Organisms Reproduce?",
        "Heredity",
        "Light — Reflection and Refraction",
        "The Human Eye and the Colourful World",
        "Electricity",
        "Magnetic Effects of Electric Current",
        "Our Environment"
    ],

    SST: [
        "History — Nationalism in Europe",
        "History — Nationalism in India",
        "History — The Making of a Global World",
        "History — The Age of Industrialisation",
        "History — Print Culture and the Modern World",
        "Geography — Resources and Development",
        "Geography — Forest and Wildlife Resources",
        "Geography — Water Resources",
        "Geography — Agriculture",
        "Geography — Minerals and Energy Resources",
        "Geography — Manufacturing Industries",
        "Geography — Lifelines of National Economy",
        "Civics — Power Sharing",
        "Civics — Federalism",
        "Civics — Gender, Religion and Caste",
        "Civics — Political Parties",
        "Civics — Outcomes of Democracy",
        "Economics — Development",
        "Economics — Sectors of the Indian Economy",
        "Economics — Money and Credit",
        "Economics — Globalisation and the Indian Economy",
        "Economics — Consumer Rights"
    ],

    English: [
        "Reading Skills",
        "Writing Skills",
        "Grammar",
        "Literature — Prose",
        "Literature — Poetry",
        "Supplementary Reader"
    ],

    Hindi: [
        "अपठित बोध",
        "व्याकरण",
        "लेखन कौशल",
        "क्षितिज — गद्य",
        "क्षितिज — काव्य",
        "कृतिका"
    ],

    IT: [
        "Communication Skills",
        "Self-Management Skills",
        "ICT Skills",
        "Entrepreneurial Skills",
        "Green Skills",
        "Digital Documentation",
        "Electronic Spreadsheet",
        "Database Management System",
        "Web Applications and Security"
    ]
};


/* ==================== 2. WEEKLY TIMETABLE ==================== */

const DEFAULT_TIMETABLE = [
    {
        day: "Monday",
        blocks: [
            {
                time: "90 min",
                subject: "Maths",
                task: "Practise questions and review difficult problems"
            },
            {
                time: "60 min",
                subject: "Science",
                task: "Revise concepts and solve questions"
            },
            {
                time: "20 min",
                subject: "Mistake review",
                task: "Correct mistakes from today's practice"
            }
        ]
    },

    {
        day: "Tuesday",
        blocks: [
            {
                time: "90 min",
                subject: "SST",
                task: "Learn concepts, maps and important answers"
            },
            {
                time: "45 min",
                subject: "English",
                task: "Practise literature, grammar or writing"
            },
            {
                time: "20 min",
                subject: "Active recall",
                task: "Recall key facts without looking at notes"
            }
        ]
    },

    {
        day: "Wednesday",
        blocks: [
            {
                time: "90 min",
                subject: "Maths",
                task: "Timed question-bank practice"
            },
            {
                time: "70 min",
                subject: "Science",
                task: "Numericals, diagrams and written answers"
            },
            {
                time: "20 min",
                subject: "Mistake review",
                task: "Review incorrect answers"
            }
        ]
    },

    {
        day: "Thursday",
        blocks: [
            {
                time: "80 min",
                subject: "SST",
                task: "Practise answers and revise weak topics"
            },
            {
                time: "50 min",
                subject: "Hindi",
                task: "Literature, grammar or writing practice"
            },
            {
                time: "20 min",
                subject: "Active recall",
                task: "Revise without looking at notes"
            }
        ]
    },

    {
        day: "Friday",
        blocks: [
            {
                time: "90 min",
                subject: "Maths",
                task: "Timed practice and challenging questions"
            },
            {
                time: "40 min",
                subject: "IT",
                task: "Theory and practical-based questions"
            },
            {
                time: "30 min",
                subject: "English / Hindi",
                task: "Alternate language practice each week"
            }
        ]
    },

    {
        day: "Saturday",
        blocks: [
            {
                time: "75 min",
                subject: "Science",
                task: "Revise a chapter and solve questions"
            },
            {
                time: "60 min",
                subject: "SST",
                task: "Revise one topic and practise answers"
            },
            {
                time: "45 min",
                subject: "Backlog",
                task: "Complete pending work or revise weak areas"
            }
        ]
    },

    {
        day: "Sunday",
        blocks: [
            {
                time: "90–120 min",
                subject: "Mock test",
                task: "Attempt a timed paper or subject test"
            },
            {
                time: "30 min",
                subject: "Test analysis",
                task: "Identify mistakes and lost marks"
            },
            {
                time: "45 min",
                subject: "Weak topics",
                task: "Revise the topics revealed by your test"
            }
        ]
    }
];


/* ==================== 3. DAILY CHECKLIST DEFAULTS ==================== */

const DEFAULT_TASKS = [
    "Complete today's main Maths or Science practice",
    "Revise one important topic",
    "Practise written or competency-based questions",
    "Review mistakes from today's work",
    "Revise what I studied without looking at notes"
];


/* ==================== 4. UTILITIES ==================== */

function $(id) {
    return document.getElementById(id);
}

function todayKey() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return replacements[character];
    });
}

function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}

function percentage(obtained, maximum) {
    if (!maximum || maximum <= 0) return 0;
    return (obtained / maximum) * 100;
}

function formatPercent(value) {
    return `${Math.round(value)}%`;
}

function formatDate(dateString) {
    if (!dateString) return "No date";

    const date = new Date(`${dateString}T12:00:00`);

    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function dayName() {
    return new Date().toLocaleDateString("en-IN", {
        weekday: "long"
    });
}

function showToast(message) {
    const toast = $("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

function safeArray(value) {
    return Array.isArray(value) ? value : [];
}


/* ==================== 5. DATA MODEL ==================== */

function createDefaultData() {
    const chapters = {};

    for (const subject of SUBJECTS) {
        chapters[subject] = {};

        for (const chapter of CHAPTERS[subject]) {
            chapters[subject][chapter] = {
                status: "Not started",
                worksheets: {
                    w1: false,
                    w2: false,
                    w3: false,
                    w4: false
                }
            };
        }
    }

    return {
        version: 1,

        chapters,

        tests: [],

        timetable: JSON.parse(JSON.stringify(DEFAULT_TIMETABLE)),

        tasksByDate: {},

        settings: {
            chapterFilter: "All",
            questionFilter: "All",
            search: ""
        }
    };
}

function normalizeData(raw) {
    const base = createDefaultData();

    if (!raw || typeof raw !== "object") {
        return base;
    }

    // Restore recognised chapter statuses and worksheet states.
    if (raw.chapters && typeof raw.chapters === "object") {
        for (const subject of SUBJECTS) {
            const incomingSubject = raw.chapters[subject];

            if (!incomingSubject || typeof incomingSubject !== "object") {
                continue;
            }

            for (const chapter of CHAPTERS[subject]) {
                const incoming = incomingSubject[chapter];

                if (!incoming || typeof incoming !== "object") {
                    continue;
                }

                const validStatuses = [
                    "Not started",
                    "In progress",
                    "Completed"
                ];

                if (validStatuses.includes(incoming.status)) {
                    base.chapters[subject][chapter].status = incoming.status;
                }

                if (incoming.worksheets && typeof incoming.worksheets === "object") {
                    for (const worksheet of WORKSHEETS) {
                        base.chapters[subject][chapter].worksheets[worksheet.id] =
                            incoming.worksheets[worksheet.id] === true;
                    }
                }
            }
        }
    }

    // Restore valid mock-test records.
    if (Array.isArray(raw.tests)) {
        base.tests = raw.tests
            .filter(test => {
                return test &&
                    typeof test.id === "string" &&
                    typeof test.name === "string" &&
                    Number.isFinite(Number(test.marks)) &&
                    Number.isFinite(Number(test.total)) &&
                    Number(test.total) > 0 &&
                    Number(test.marks) >= 0 &&
                    Number(test.marks) <= Number(test.total) &&
                    typeof test.date === "string";
            })
            .map(test => ({
                id: test.id,
                subject: SUBJECTS.includes(test.subject) ||
                    test.subject === "Full syllabus"
                    ? test.subject
                    : "Maths",
                name: test.name.slice(0, 70),
                marks: Number(test.marks),
                total: Number(test.total),
                date: test.date,
                notes: String(test.notes || "").slice(0, 1000)
            }));
    }

    // Restore checklist history.
    if (raw.tasksByDate && typeof raw.tasksByDate === "object") {
        for (const [date, tasks] of Object.entries(raw.tasksByDate)) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Array.isArray(tasks)) {
                continue;
            }

            base.tasksByDate[date] = tasks
                .filter(task => task && typeof task.text === "string")
                .slice(0, 100)
                .map(task => ({
                    id: String(task.id || cryptoId()),
                    text: task.text.slice(0, 100),
                    done: task.done === true,
                    custom: task.custom === true
                }));
        }
    }

    // Keep the default timetable structure unless a valid replacement exists.
    if (Array.isArray(raw.timetable) && raw.timetable.length === 7) {
        const dayNames = DEFAULT_TIMETABLE.map(day => day.day);

        const valid = raw.timetable.every((day, index) => {
            return day &&
                day.day === dayNames[index] &&
                Array.isArray(day.blocks);
        });

        if (valid) {
            base.timetable = raw.timetable.map(day => ({
                day: day.day,
                blocks: day.blocks
                    .filter(block => block && typeof block === "object")
                    .slice(0, 10)
                    .map(block => ({
                        time: String(block.time || ""),
                        subject: String(block.subject || ""),
                        task: String(block.task || "")
                    }))
            }));
        }
    }

    if (raw.settings && typeof raw.settings === "object") {
        if (typeof raw.settings.chapterFilter === "string") {
            base.settings.chapterFilter = raw.settings.chapterFilter;
        }

        if (typeof raw.settings.questionFilter === "string") {
            base.settings.questionFilter = raw.settings.questionFilter;
        }

        if (typeof raw.settings.search === "string") {
            base.settings.search = raw.settings.search.slice(0, 100);
        }
    }

    return base;
}

function cryptoId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return createDefaultData();
        }

        return normalizeData(JSON.parse(saved));
    } catch (error) {
        console.error("Could not load saved StudyOS data:", error);

        showToast("Saved data could not be read. Starting with fresh data.");

        return createDefaultData();
    }
}

let data = loadData();

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        updateDashboard();
        return true;
    } catch (error) {
        console.error("Could not save StudyOS data:", error);

        showToast("Could not save. Export a backup and check browser storage.");

        return false;
    }
}


/* ==================== 6. NAVIGATION ==================== */

const VIEW_TITLES = {
    dashboard: "Dashboard",
    chapters: "Chapter Tracker",
    questions: "Question Banks",
    tests: "Mock Tests",
    timetable: "Weekly Timetable",
    daily: "Daily Checklist"
};

function showView(viewId) {
    if (!VIEW_TITLES[viewId]) return;

    document.querySelectorAll(".view").forEach(view => {
        view.classList.toggle("active", view.id === viewId);
    });

    document.querySelectorAll(".nav[data-view]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.view === viewId
        );
    });

    $("pageTitle").textContent = VIEW_TITLES[viewId];

    $("sidebar").classList.remove("open");

    if (viewId === "chapters") renderChapters();
    if (viewId === "questions") renderQuestions();
    if (viewId === "tests") renderTests();
    if (viewId === "timetable") renderTimetable();
    if (viewId === "daily") renderDailyTasks();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.querySelectorAll(".nav[data-view]").forEach(button => {
    button.addEventListener("click", () => {
        showView(button.dataset.view);
    });
});

document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
        showView(button.dataset.go);
    });
});

$("menuBtn").addEventListener("click", () => {
    $("sidebar").classList.toggle("open");
});

document.addEventListener("click", event => {
    const sidebar = $("sidebar");
    const menuButton = $("menuBtn");

    if (
        window.innerWidth <= 760 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !menuButton.contains(event.target)
    ) {
        sidebar.classList.remove("open");
    }
});


/* ==================== 7. CHAPTER TRACKER ==================== */

function getChapterCounts(subject) {
    const chapterMap = data.chapters[subject];

    const names = Object.keys(chapterMap);

    const completed = names.filter(name => {
        return chapterMap[name].status === "Completed";
    }).length;

    const inProgress = names.filter(name => {
        return chapterMap[name].status === "In progress";
    }).length;

    return {
        total: names.length,
        completed,
        inProgress,
        notStarted: names.length - completed - inProgress
    };
}

function renderChapterFilters() {
    const container = $("chapterFilters");

    const filters = ["All", ...SUBJECTS];

    container.innerHTML = filters.map(subject => `
        <button
            type="button"
            class="filter-btn ${data.settings.chapterFilter === subject ? "active" : ""}"
            data-chapter-filter="${escapeHTML(subject)}">
            ${escapeHTML(subject)}
        </button>
    `).join("");

    container.querySelectorAll("[data-chapter-filter]").forEach(button => {
        button.addEventListener("click", () => {
            data.settings.chapterFilter = button.dataset.chapterFilter;

            saveData();
            renderChapters();
        });
    });
}

function renderChapters() {
    renderChapterFilters();

    const container = $("chapterList");
    const search = $("chapterSearch").value.trim().toLowerCase();

    const selectedSubject = data.settings.chapterFilter;

    let html = "";

    for (const subject of SUBJECTS) {
        if (selectedSubject !== "All" && selectedSubject !== subject) {
            continue;
        }

        const chapterMap = data.chapters[subject];

        for (const [chapter, details] of Object.entries(chapterMap)) {
            const searchableText = `${subject} ${chapter}`.toLowerCase();

            if (search && !searchableText.includes(search)) {
                continue;
            }

            const statusClass = details.status
                .toLowerCase()
                .replaceAll(" ", "-");

            html += `
                <article class="chapter-card">
                    <div class="chapter-info">
                        <p>${escapeHTML(subject)}</p>
                        <h3>${escapeHTML(chapter)}</h3>
                        <span class="status ${statusClass}">
                            ${escapeHTML(details.status)}
                        </span>
                    </div>

                    <div class="chapter-actions">
                        <select
                            aria-label="Status for ${escapeHTML(chapter)}"
                            data-status-subject="${escapeHTML(subject)}"
                            data-status-chapter="${escapeHTML(chapter)}">

                            <option value="Not started"
                                ${details.status === "Not started" ? "selected" : ""}>
                                Not started
                            </option>

                            <option value="In progress"
                                ${details.status === "In progress" ? "selected" : ""}>
                                In progress
                            </option>

                            <option value="Completed"
                                ${details.status === "Completed" ? "selected" : ""}>
                                Completed
                            </option>
                        </select>
                    </div>
                </article>
            `;
        }
    }

    container.innerHTML = html;

    container.querySelectorAll("[data-status-subject]").forEach(select => {
        select.addEventListener("change", () => {
            const subject = select.dataset.statusSubject;
            const chapter = select.dataset.statusChapter;

            data.chapters[subject][chapter].status = select.value;

            saveData();
            renderChapters();
        });
    });

    if (!html) {
        container.innerHTML = `
            <article class="panel">
                <p class="muted">No matching chapters found.</p>
            </article>
        `;
    }
}

$("chapterSearch").addEventListener("input", renderChapters);


/* ==================== 8. QUESTION-BANK TRACKER ==================== */

function renderQuestionFilters() {
    const container = $("questionFilters");

    const filters = ["All", ...SUBJECTS];

    container.innerHTML = filters.map(subject => `
        <button
            type="button"
            class="filter-btn ${data.settings.questionFilter === subject ? "active" : ""}"
            data-question-filter="${escapeHTML(subject)}">
            ${escapeHTML(subject)}
        </button>
    `).join("");

    container.querySelectorAll("[data-question-filter]").forEach(button => {
        button.addEventListener("click", () => {
            data.settings.questionFilter = button.dataset.questionFilter;

            saveData();
            renderQuestions();
        });
    });
}

function countWorksheets(subject) {
    let total = 0;
    let completed = 0;

    for (const chapter of Object.values(data.chapters[subject])) {
        for (const worksheet of WORKSHEETS) {
            total++;

            if (chapter.worksheets[worksheet.id]) {
                completed++;
            }
        }
    }

    return { total, completed };
}

function renderQuestions() {
    renderQuestionFilters();

    const container = $("questionList");

    const selectedSubject = data.settings.questionFilter;

    let html = "";

    for (const subject of SUBJECTS) {
        if (selectedSubject !== "All" && selectedSubject !== subject) {
            continue;
        }

        for (const [chapterName, details] of Object.entries(data.chapters[subject])) {
            const doneCount = WORKSHEETS.filter(worksheet => {
                return details.worksheets[worksheet.id];
            }).length;

            const checks = WORKSHEETS.map(worksheet => `
                <label class="worksheet-check">
                    <input
                        type="checkbox"
                        data-worksheet-subject="${escapeHTML(subject)}"
                        data-worksheet-chapter="${escapeHTML(chapterName)}"
                        data-worksheet-id="${worksheet.id}"
                        ${details.worksheets[worksheet.id] ? "checked" : ""}>

                    <span>${escapeHTML(worksheet.name)}</span>
                </label>
            `).join("");

            html += `
                <article class="question-card">
                    <div class="question-info">
                        <p>${escapeHTML(subject)}</p>
                        <h3>${escapeHTML(chapterName)}</h3>
                        <p>${doneCount} of ${WORKSHEETS.length} worksheets completed</p>

                        <div class="track" style="margin-top:10px">
                            <i style="width:${(doneCount / WORKSHEETS.length) * 100}%"></i>
                        </div>
                    </div>

                    <div class="worksheet-checks">
                        ${checks}
                    </div>
                </article>
            `;
        }
    }

    container.innerHTML = html;

    container.querySelectorAll("[data-worksheet-id]").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const subject = checkbox.dataset.worksheetSubject;
            const chapter = checkbox.dataset.worksheetChapter;
            const worksheetId = checkbox.dataset.worksheetId;

            data.chapters[subject][chapter].worksheets[worksheetId] =
                checkbox.checked;

            saveData();
            renderQuestions();
        });
    });

    if (!html) {
        container.innerHTML = `
            <article class="panel">
                <p class="muted">No chapters available for this subject.</p>
            </article>
        `;
    }
}


/* ==================== 9. MOCK TESTS ==================== */

$("testDate").value = todayKey();

function renderTests() {
    const container = $("testHistory");

    const tests = [...data.tests].sort((a, b) => {
        return b.date.localeCompare(a.date);
    });

    $("historyCount").textContent =
        `${tests.length} ${tests.length === 1 ? "test" : "tests"}`;

    if (tests.length === 0) {
        container.innerHTML = `
            <article class="panel">
                <p class="muted">
                    No tests recorded yet. Add your first result!
                </p>
            </article>
        `;
    } else {
        container.innerHTML = tests.map(test => {
            const scorePercent = percentage(test.marks, test.total);

            return `
                <article class="test-card">
                    <div class="test-card-top">
                        <div>
                            <h4>${escapeHTML(test.name)}</h4>
                            <p>
                                ${escapeHTML(test.subject)}
                                · ${formatDate(test.date)}
                            </p>
                        </div>

                        <div class="test-score">
                            ${formatPercent(scorePercent)}
                        </div>
                    </div>

                    <p>
                        Score: <b>${test.marks} / ${test.total}</b>
                    </p>

                    <div class="track">
                        <i style="width:${clamp(scorePercent, 0, 100)}%"></i>
                    </div>

                    ${
                        test.notes
                            ? `<div class="test-notes">${escapeHTML(test.notes)}</div>`
                            : ""
                    }

                    <div class="test-card-actions">
                        <button
                            class="delete-btn"
                            type="button"
                            data-delete-test="${escapeHTML(test.id)}">
                            Delete result
                        </button>
                    </div>
                </article>
            `;
        }).join("");
    }

    container.querySelectorAll("[data-delete-test]").forEach(button => {
        button.addEventListener("click", () => {
            const test = data.tests.find(item => {
                return item.id === button.dataset.deleteTest;
            });

            if (!test) return;

            if (!confirm(`Delete the test "${test.name}"?`)) {
                return;
            }

            data.tests = data.tests.filter(item => {
                return item.id !== test.id;
            });

            saveData();
            renderTests();

            showToast("Test result deleted.");
        });
    });

    drawChart($("chartLarge"), $("chartEmptyLarge"), true);
    drawChart($("chart"), $("chartEmpty"), false);
}

$("testForm").addEventListener("submit", event => {
    event.preventDefault();

    const subject = $("testSubject").value;
    const name = $("testName").value.trim();
    const marks = Number($("testMarks").value);
    const total = Number($("testTotal").value);
    const date = $("testDate").value;
    const notes = $("testNotes").value.trim();

    const error = $("formError");
    error.textContent = "";

    if (!name) {
        error.textContent = "Please enter a test name.";
        return;
    }

    if (!Number.isFinite(marks) || !Number.isFinite(total)) {
        error.textContent = "Enter valid marks.";
        return;
    }

    if (total <= 0 || marks < 0 || marks > total) {
        error.textContent =
            "Marks must be between 0 and the maximum marks.";
        return;
    }

    if (!date) {
        error.textContent = "Please choose the test date.";
        return;
    }

    data.tests.push({
        id: cryptoId(),
        subject,
        name,
        marks,
        total,
        date,
        notes
    });

    saveData();

    $("testForm").reset();
    $("testDate").value = todayKey();
    $("testTotal").value = "80";

    renderTests();

    showToast("Mock-test result saved!");
});


/* ==================== 10. GRAPHS ==================== */

function drawChart(canvas, emptyMessage, large) {
    if (!canvas || !emptyMessage) return;

    const context = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    const width = Math.max(260, rect.width || 400);
    const height = large ? 300 : 210;

    const pixelRatio = Math.max(1, window.devicePixelRatio || 1);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    canvas.style.width = "100%";
    canvas.style.height = `${height}px`;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    const tests = [...data.tests].sort((a, b) => {
        return a.date.localeCompare(b.date);
    });

    if (tests.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    const padding = {
        left: 38,
        right: 15,
        top: 20,
        bottom: 38
    };

    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    const scores = tests.map(test => percentage(test.marks, test.total));

    // Grid and Y-axis labels.
    context.font = "10px Segoe UI, Arial";
    context.textAlign = "right";
    context.textBaseline = "middle";

    for (let value = 0; value <= 100; value += 20) {
        const y = padding.top + graphHeight * (1 - value / 100);

        context.beginPath();
        context.moveTo(padding.left, y);
        context.lineTo(width - padding.right, y);

        context.strokeStyle = "rgba(145,164,194,0.15)";
        context.lineWidth = 1;
        context.stroke();

        context.fillStyle = "#91a4c2";
        context.fillText(`${value}%`, padding.left - 8, y);
    }

    const points = scores.map((score, index) => {
        const x = tests.length === 1
            ? padding.left + graphWidth / 2
            : padding.left + (index / (tests.length - 1)) * graphWidth;

        const y = padding.top + graphHeight * (1 - score / 100);

        return { x, y, score };
    });

    // Connect data points.
    if (points.length > 1) {
        context.beginPath();

        points.forEach((point, index) => {
            if (index === 0) {
                context.moveTo(point.x, point.y);
            } else {
                context.lineTo(point.x, point.y);
            }
        });

        context.strokeStyle = "#65c7ff";
        context.lineWidth = 2.5;
        context.lineJoin = "round";
        context.stroke();
    }

    // Draw points and labels.
    points.forEach((point, index) => {
        context.beginPath();
        context.arc(point.x, point.y, 4, 0, Math.PI * 2);

        context.fillStyle = "#65c7ff";
        context.fill();

        context.strokeStyle = "#0c1e3b";
        context.lineWidth = 2;
        context.stroke();

        context.fillStyle = "#edf4ff";
        context.font = "10px Segoe UI, Arial";
        context.textAlign = "center";

        context.fillText(
            `${Math.round(point.score)}%`,
            point.x,
            Math.max(10, point.y - 12)
        );

        // Limit labels to avoid overcrowding.
        const showDate =
            tests.length <= 6 ||
            index === 0 ||
            index === tests.length - 1 ||
            index % Math.ceil(tests.length / 5) === 0;

        if (showDate) {
            context.fillStyle = "#91a4c2";

            const label = tests[index].date.slice(5);

            context.fillText(
                label,
                point.x,
                height - 16
            );
        }
    });
}

window.addEventListener("resize", () => {
    drawChart($("chart"), $("chartEmpty"), false);
    drawChart($("chartLarge"), $("chartEmptyLarge"), true);
});


/* ==================== 11. DAILY CHECKLIST ==================== */

function getTodayTasks() {
    const key = todayKey();

    if (!Array.isArray(data.tasksByDate[key])) {
        data.tasksByDate[key] = DEFAULT_TASKS.map(text => ({
            id: cryptoId(),
            text,
            done: false,
            custom: false
        }));
    }

    return data.tasksByDate[key];
}

function renderDailyTasks() {
    const tasks = getTodayTasks();

    const container = $("dailyTasks");

    const completed = tasks.filter(task => task.done).length;

    $("dailyHeading").textContent =
        new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });

    $("dailyCount").textContent = `${completed} / ${tasks.length}`;

    container.innerHTML = tasks.map(task => `
        <article class="task-card ${task.done ? "done" : ""}">
            <input
                id="task-${escapeHTML(task.id)}"
                type="checkbox"
                data-task-toggle="${escapeHTML(task.id)}"
                ${task.done ? "checked" : ""}>

            <label for="task-${escapeHTML(task.id)}">
                ${escapeHTML(task.text)}
            </label>

            ${
                task.custom
                    ? `<button
                        class="task-delete"
                        type="button"
                        data-task-delete="${escapeHTML(task.id)}"
                        aria-label="Delete task">×</button>`
                    : ""
            }
        </article>
    `).join("");

    container.querySelectorAll("[data-task-toggle]").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const task = tasks.find(item => {
                return item.id === checkbox.dataset.taskToggle;
            });

            if (!task) return;

            task.done = checkbox.checked;

            saveData();
            renderDailyTasks();
        });
    });

    container.querySelectorAll("[data-task-delete]").forEach(button => {
        button.addEventListener("click", () => {
            data.tasksByDate[todayKey()] =
                getTodayTasks().filter(task => {
                    return task.id !== button.dataset.taskDelete;
                });

            saveData();
            renderDailyTasks();

            showToast("Task removed.");
        });
    });

    renderMiniTasks();
}

$("addTaskForm").addEventListener("submit", event => {
    event.preventDefault();

    const input = $("newTask");
    const text = input.value.trim();

    if (!text) return;

    const tasks = getTodayTasks();

    if (tasks.length >= 100) {
        showToast("You've reached the daily task limit.");
        return;
    }

    tasks.push({
        id: cryptoId(),
        text: text.slice(0, 100),
        done: false,
        custom: true
    });

    input.value = "";

    saveData();
    renderDailyTasks();

    showToast("Task added!");
});

$("clearTasks").addEventListener("click", () => {
    if (!confirm("Untick all of today's tasks?")) {
        return;
    }

    getTodayTasks().forEach(task => {
        task.done = false;
    });

    saveData();
    renderDailyTasks();

    showToast("Today's checklist has been reset.");
});

function renderMiniTasks() {
    const container = $("miniTasks");
    const tasks = getTodayTasks();

    const preview = tasks.slice(0, 4);

    container.innerHTML = preview.map(task => `
        <div class="mini-task ${task.done ? "done" : ""}">
            <input
                type="checkbox"
                data-mini-toggle="${escapeHTML(task.id)}"
                aria-label="Complete ${escapeHTML(task.text)}"
                ${task.done ? "checked" : ""}>

            <label>${escapeHTML(task.text)}</label>
        </div>
    `).join("");

    const completed = tasks.filter(task => task.done).length;

    $("miniSummary").textContent =
        `${completed} of ${tasks.length} tasks completed`;

    container.querySelectorAll("[data-mini-toggle]").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const task = tasks.find(item => {
                return item.id === checkbox.dataset.miniToggle;
            });

            if (!task) return;

            task.done = checkbox.checked;

            saveData();
            renderDailyTasks();
        });
    });
}


/* ==================== 12. WEEKLY TIMETABLE ==================== */

function renderTimetable() {
    const container = $("timetableGrid");
    const today = dayName();

    container.innerHTML = data.timetable.map(day => {
        const isToday = day.day === today;

        const blocks = day.blocks.map(block => `
            <div class="study-block">
                <div class="study-time">
                    ${escapeHTML(block.time)}
                </div>

                <div class="study-details">
                    <b>${escapeHTML(block.subject)}</b>
                    <small>${escapeHTML(block.task)}</small>
                </div>
            </div>
        `).join("");

        const duration = day.blocks.reduce((sum, block) => {
            const match = block.time.match(/\d+/);

            if (!match) return sum;

            const minutes = Number(match[0]);

            return sum + (
                block.time.includes("120")
                    ? 120
                    : minutes
            );
        }, 0);

        return `
            <article class="day-card ${isToday ? "today" : ""}">
                <div class="day-card-head">
                    <h3>${escapeHTML(day.day)}</h3>

                    ${
                        isToday
                            ? `<span class="today-tag">TODAY</span>`
                            : ""
                    }
                </div>

                ${blocks}

                <div class="day-total">
                    Planned study blocks: ${day.blocks.length}
                </div>
            </article>
        `;
    }).join("");

    renderTodayPlan();
}

function renderTodayPlan() {
    const container = $("todayPlan");

    const today = dayName();

    const day = data.timetable.find(item => item.day === today);

    if (!day) {
        container.innerHTML = `<p class="muted">No plan found for today.</p>`;
        return;
    }

    container.innerHTML = day.blocks.map(block => `
        <div class="study-block">
            <div class="study-time">${escapeHTML(block.time)}</div>

            <div class="study-details">
                <b>${escapeHTML(block.subject)}</b>
                <small>${escapeHTML(block.task)}</small>
            </div>
        </div>
    `).join("");
}

$("resetTimetable").addEventListener("click", () => {
    if (!confirm("Restore the original weekly timetable?")) {
        return;
    }

    data.timetable = JSON.parse(JSON.stringify(DEFAULT_TIMETABLE));

    saveData();
    renderTimetable();

    showToast("Weekly timetable restored.");
});


/* ==================== 13. PREBOARD COUNTDOWN ==================== */

function updateCountdown() {
    const element = $("countdown");

    if (!element) return;

    const now = new Date();

    const target = new Date(`${PREBOARD_DATE}T00:00:00`);

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const targetDay = new Date(
        target.getFullYear(),
        target.getMonth(),
        target.getDate()
    );

    const difference = Math.ceil(
        (targetDay.getTime() - today.getTime()) / 86400000
    );

    if (difference > 1) {
        element.textContent = `${difference} days`;
    } else if (difference === 1) {
        element.textContent = "1 day";
    } else if (difference === 0) {
        element.textContent = "Today!";
    } else {
        element.textContent = "Started";
    }
}


/* ==================== 14. DASHBOARD PROGRESS ==================== */

function calculateOverallProgress() {
    let totalChapters = 0;
    let completedChapters = 0;

    let totalWorksheets = 0;
    let completedWorksheets = 0;

    for (const subject of SUBJECTS) {
        for (const chapter of Object.values(data.chapters[subject])) {
            totalChapters++;

            if (chapter.status === "Completed") {
                completedChapters++;
            }

            for (const worksheet of WORKSHEETS) {
                totalWorksheets++;

                if (chapter.worksheets[worksheet.id]) {
                    completedWorksheets++;
                }
            }
        }
    }

    const chapterProgress = totalChapters
        ? completedChapters / totalChapters
        : 0;

    const worksheetProgress = totalWorksheets
        ? completedWorksheets / totalWorksheets
        : 0;

    /*
       Equal weighting between chapter status and worksheet completion.
       This is a study-progress indicator, not a predicted board percentage.
    */

    const overall = (
        chapterProgress * 50 +
        worksheetProgress * 50
    );

    return {
        totalChapters,
        completedChapters,
        totalWorksheets,
        completedWorksheets,
        overall
    };
}

function calculateMockAverage() {
    if (data.tests.length === 0) return null;

    const scores = data.tests.map(test => {
        return percentage(test.marks, test.total);
    });

    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function renderSubjectProgress() {
    const container = $("subjectProgress");

    container.innerHTML = SUBJECTS.map(subject => {
        const counts = getChapterCounts(subject);

        const progress = counts.total
            ? (counts.completed / counts.total) * 100
            : 0;

        return `
            <div class="subject-row">
                <div class="subject-row-top">
                    <span>${escapeHTML(subject)}</span>
                    <span>${counts.completed}/${counts.total} chapters</span>
                </div>

                <div class="track">
                    <i style="width:${progress}%"></i>
                </div>
            </div>
        `;
    }).join("");
}

function updateDashboard() {
    const progress = calculateOverallProgress();

    $("statChapters").textContent =
        `${progress.completedChapters} / ${progress.totalChapters}`;

    $("statQuestions").textContent =
        formatPercent(
            progress.totalWorksheets
                ? progress.completedWorksheets /
                    progress.totalWorksheets * 100
                : 0
        );

    const average = calculateMockAverage();

    $("statAverage").textContent =
        average === null ? "—" : formatPercent(average);

    $("testCount").textContent =
        `${data.tests.length} ${data.tests.length === 1 ? "test" : "tests"} recorded`;

    $("overallPercent").textContent = formatPercent(progress.overall);

    $("overallBar").style.width = `${progress.overall}%`;
    $("sideBar").style.width = `${progress.overall}%`;

    $("sidePercent").textContent =
        `${Math.round(progress.overall)}% progress`;

    $("progressLabel").textContent =
        progress.overall >= 80
            ? "Great progress!"
            : progress.overall >= 40
                ? "Keep building"
                : "Getting started";

    renderSubjectProgress();

    updateCountdown();

    renderMiniTasks();
    renderTodayPlan();

    drawChart($("chart"), $("chartEmpty"), false);
}


/* ==================== 15. EXPORT BACKUP ==================== */

$("exportBtn").addEventListener("click", () => {
    const backup = {
        app: "StudyOS",
        version: 1,
        exportedAt: new Date().toISOString(),
        data
    };

    const blob = new Blob(
        [JSON.stringify(backup, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `StudyOS-backup-${todayKey()}.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showToast("Backup exported!");
});


/* ==================== 16. IMPORT BACKUP ==================== */

$("importBtn").addEventListener("click", () => {
    $("importFile").click();
});

$("importFile").addEventListener("change", async event => {
    const file = event.target.files[0];

    if (!file) return;

    try {
        if (file.size > 5 * 1024 * 1024) {
            throw new Error("Backup file is too large.");
        }

        const text = await file.text();

        const parsed = JSON.parse(text);

        const importedData =
            parsed && parsed.app === "StudyOS"
                ? parsed.data
                : parsed;

        if (!importedData || typeof importedData !== "object") {
            throw new Error("This is not a valid StudyOS backup.");
        }

        const confirmed = confirm(
            "Import this backup? Your current tracker data will be replaced."
        );

        if (!confirmed) {
            event.target.value = "";
            return;
        }

        const previousData = data;

        data = normalizeData(importedData);

        if (!saveData()) {
            data = previousData;
            throw new Error("Could not save the imported backup.");
        }

        renderChapters();
        renderQuestions();
        renderTests();
        renderTimetable();
        renderDailyTasks();

        showView("dashboard");

        showToast("Backup imported successfully!");
    } catch (error) {
        console.error("Import error:", error);

        showToast(error.message || "Could not import backup.");
    }

    event.target.value = "";
});


/* ==================== 17. DATE AND INITIALISATION ==================== */

function updateTodayLabel() {
    $("today").textContent = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function initialiseApp() {
    updateTodayLabel();

    // Ensure today's checklist exists.
    getTodayTasks();

    renderChapters();
    renderQuestions();
    renderTests();
    renderTimetable();
    renderDailyTasks();

    updateDashboard();

    $("pageTitle").textContent = "Dashboard";

    document.querySelectorAll(".view").forEach(view => {
        view.classList.toggle("active", view.id === "dashboard");
    });

    document.querySelectorAll(".nav[data-view]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.view === "dashboard"
        );
    });

    // Persist newly initialised checklist data.
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.warn("Initial data could not be saved.", error);
    }
}

initialiseApp();