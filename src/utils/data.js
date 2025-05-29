export const footerLinks = [
    {
        id: "01",
        title: "Организация",
        links: ["Главная", "О нас", "Наша команда"]
    },
    {
        id: "02",
        title: "Политика",
        links: ["Правила", "Контакты", "FAQ"]
    },
    {
        id: "03",
        title: "Поддержка",
        links: ["Центр поддержки", "Обратная связь"]
    }
]

export const jobStatuses = {
    CREATED: {
        name: "Испонитель не выбран",
        color: "bg-blue-500"
    },
    WORKED: {
        name: "В работе",
        color: "bg-green-500"
    },
    FINISH: {
        name: "Ожидают оплаты",
        color: "bg-yellow-500"
    },
    PAID: {
        name: "Завершено",
        color: "bg-purple-500"
    },
    CANCELLED: {
        name: "Отменено",
        color: "bg-gray-500"
    },
}

export const transactionStatuses = {
    TOP_UP: {
        name: "Пополнение",
        color: "bg-green-500",
        textColor: "text-green-500",
        sign: "+"
    },
    WITHDRAW: {
        name: "Вывод",
        color: "bg-red-500",
        textColor: "text-red-500",
        sign: "-"
    },
};

export const transactionCustomerStatuses = {
    FINISHED: {
        name: "Успешная",
        color: "bg-green-500",
    },
    REJECTED: {
        name: "Отклонённая",
        color: "bg-red-500",
    },
    CREATED: {
        name: "В процессе",
        color: "bg-gray-500",
    },
};

export const jobTypes = ["Full-Time", "Part-Time", "ContracT", "Intern"];

export const experience = [
    { title: "Under 1 Year", value: "0-1" },
    { title: "1 -2 Year", value: "1-2" },
    { title: "2 -6 Year", value: "2-6" },
    { title: "Over 6 Years", value: "6" },
];

export const popularSearch = [
    "Software Engineer",
    "Developer",
    "Full-Stack Developer",
    "Data Scientist",
    "Remote",
    "Full-Time",
    "Sales",
    "Office Assistant",
];

export const jobs = [
    {
        id: "1",
        company: {
            name: "Microsoft Corporation",
            location: "Califonia",
            email: "support@microsoft.com",
            contact: "support@microsoft",
            about:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            profileUrl: "Twitter",
        },
        jobTitle: "Software Engineer",
        location: "West US",
        jobType: "Full-Time",
        salary: "1200",
        detail: [
            {
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                requirement:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ],
        applicants: ["1", "2", "3", "4"],
        vacancies: 25,
        createdAt: new Date(),
    },
    {
        id: "2",
        company: {
            name: "Google Corporation",
            location: "Califonia",
            email: "support@google.com",
            contact: "support@google",
            about:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            profileUrl: "Google",
        },
        jobTitle: "System Analyst",
        location: "New York",
        jobType: "Full-Time",
        salary: "1200",
        detail: [
            {
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                requirement:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ],
        applicants: ["1", "2", "3", "4"],
        vacancies: 25,
        createdAt: new Date(),
    },
    {
        id: "3",
        company: {
            name: "LinkedIn Corporation",
            location: "Germany",
            email: "support@microsoft.com",
            contact: "support@microsoft",
            about:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            profileUrl: "Linkedin",
        },
        jobTitle: "Social Meia Manager",
        location: "India, Mumbai",
        jobType: "Full-Time",
        salary: "1200",
        detail: [
            {
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                requirement:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ],
        applicants: ["1", "2", "3", "4"],
        vacancies: 25,
        createdAt: new Date(),
    },
    {
        id: "4",
        company: {
            name: "Spotify Corporation",
            location: "Germany",
            email: "support@microsoft.com",
            contact: "support@microsoft",
            about:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            profileUrl: "Spotify",
        },
        jobTitle: "CFO",
        location: "Norway",
        jobType: "Full-Time",
        salary: "1200",
        detail: [
            {
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                requirement:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ],
        applicants: ["1", "2", "3", "4"],
        vacancies: 25,
        createdAt: new Date(),
    },
    {
        id: "5",
        company: {
            name: "Facebook Corporation",
            location: "Germany",
            email: "support@microsoft.com",
            contact: "support@microsoft",
            about:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            profileUrl: "Facebook",
        },
        jobTitle: "CFO",
        location: "Norway",
        jobType: "Full-Time",
        salary: "1200",
        detail: [
            {
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                requirement:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ],
        applicants: ["1", "2", "3", "4"],
        vacancies: 25,
        createdAt: new Date(),
    },
    {
        id: "6",
        company: {
            name: "WhatsApp Corporation",
            location: "Germany",
            email: "support@microsoft.com",
            contact: "support@microsoft",
            about:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            profileUrl: "WhatsApp",
        },
        jobTitle: "Product Manager",
        location: "Norway",
        jobType: "Full-Time",
        salary: "1200",
        detail: [
            {
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                requirement:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ],
        applicants: ["1", "2", "3", "4"],
        vacancies: 25,
        createdAt: new Date(),
    },
    {
        id: "7",
        company: {
            name: "Instagram Corporation",
            location: "Germany",
            email: "support@microsoft.com",
            contact: "support@microsoft",
            about:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            profileUrl: "Instagram",
        },
        jobTitle: "Product Manager",
        location: "Norway",
        jobType: "Full-Time",
        salary: "1200",
        detail: [
            {
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                requirement:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ],
        applicants: ["1", "2", "3", "4"],
        vacancies: 25,
        createdAt: new Date(),
    },
    {
        id: "8",
        company: {
            name: "Youtube Corporation",
            location: "Germany",
            email: "support@microsoft.com",
            contact: "support@microsoft",
            about:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            profileUrl: "Youtube",
        },
        jobTitle: "Product Manager",
        location: "Norway",
        jobType: "Full-Time",
        salary: "1200",
        detail: [
            {
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                requirement:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ],
        applicants: ["1", "2", "3", "4"],
        vacancies: 25,
        createdAt: new Date(),
    },
    {
        id: "9",
        company: {
            name: "CodeWave Solutions",
            location: "India",
            email: "support@microsoft.com",
            contact: "support@microsoft",
            about:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            profileUrl: "CodeWave",
        },
        jobTitle: "Subscribe Please",
        location: "Norway",
        jobType: "Full-Time",
        salary: "1200",
        detail: [
            {
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

                requirement:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ],
        applicants: ["1", "2", "3", "4"],
        vacancies: 25,
        createdAt: new Date(),
    },
];

export const companies = [
    {
        _id: 1,
        name: "Microsoft Corporation",
        location: "Califonia",
        email: "support@microsoft.com",
        contact: "support@microsoft",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "Twitter",
        jobPosts: ["1", "2"],
    },
    {
        _id: 2,
        name: "Google Corporation",
        location: "Califonia",
        email: "support@google.com",
        contact: "support@google",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "Google",
        jobPosts: ["1", "2"],
    },
    {
        _id: 3,
        name: "LinkedIn Corporation",
        location: "Germany",
        email: "support@microsoft.com",
        contact: "support@microsoft",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "Linkedin",
        jobPosts: ["1", "2"],
    },
    {
        _id: 4,
        name: "Spotify Corporation",
        location: "Germany",
        email: "support@microsoft.com",
        contact: "support@microsoft",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "Spotify",
        jobPosts: ["1", "2"],
    },
    {
        _id: 5,
        name: "Facebook Corporation",
        location: "Germany",
        email: "support@microsoft.com",
        contact: "support@microsoft",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "Facebook",
        jobPosts: ["1", "2"],
    },
    {
        _id: 6,
        name: "WhatsApp Corporation",
        location: "Germany",
        email: "support@microsoft.com",
        contact: "support@microsoft",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "WhatsApp",
        jobPosts: ["1", "2"],
    },
    {
        _id: 7,
        name: "Instagram Corporation",
        location: "India",
        email: "support@microsoft.com",
        contact: "support@microsoft",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "Instagram",
        jobPosts: ["1", "2"],
    },
    {
        _id: 8,
        name: "Youtube Corporation",
        location: "Germany",
        email: "support@microsoft.com",
        contact: "support@microsoft",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "Youtube",
        jobPosts: ["1", "2"],
    },
    {
        _id: 9,
        name: "CodeWave Solutions",
        location: "Ghana",
        email: "support@microsoft.com",
        contact: "support@microsoft",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "CodeWave",
        jobPosts: ["1", "2"],
    },
];

export const users = [
    {
        name: "Google Corporation",
        location: "Califonia",
        email: "support@google.com",
        contact: "support@google",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "Google",
        jobPosts: ["1", "2"],
        token: "gjhsdgsjgdjh",
    },
    {
        firstName: "CodeWaver",
        lastName: "Solutions",
        email: "support@code.com",
        contact: "support@google",
        about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        profileUrl: "CodeWave",
        accountType: "freelancer",
        cvUrl: "",
        token: "gjhsdgsjgdjh",
    },
];

export const dashboardData = [
    { title: "Пользователей", count: 3 },
    { title: "Заказов", count: 4 },
    { title: "Заказчиков", count: 2 },
    { title: "Исполнителей", count: 2 },
];

export const profitData = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
    datasets: [
        {
            label: 'Прибыль',
            data: [2000, 2500, 3000, 3500, 4000, 4500],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        },
    ],
};