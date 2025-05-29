import {
    About, Admin,
    Auth,
    ClientProfile,
    ClientProfilePublic,
    FindClients,
    FindJobs, FreelancerAnalytics,
    FreelancerJobs, FreelancerTransaction,
    JobDetailCustomer,
    JobDetailFreelancer,
    JobDetailPublic,
    JobProgressCustomer,
    JobProgressFreelancer,
    NotFound,
    UploadJob,
    UserProfile,
    UserProfilePublic
} from "./pages";
import SuccessPage from "./pages/payment/SuccessPage";
import {Cancel} from "axios";
import CancelPage from "./pages/payment/CancelPage";
import CustomerTransaction from "./pages/CustomerTransaction";
import FreelancerFindJobs from "./pages/FreelancerFindJobs";

const defaultRoutes = [
    {
        path: "/",
        isNavigate: true,
        navigatePath: "/find-jobs",
        isVisit: false
    },
    {
        path: "/about-us",
        element: <About/>,
        name: "О нас",
        isVisit: true,
    },
    {
        path: "/find-clients",
        element: <FindClients/>,
        name: "Заказчики",
        isVisit: true
    },
    {
        path: "/client-profile/:id",
        element: <ClientProfilePublic/>,
        name: "",
        isVisit: false
    },
    {
        path: "/user-profile/:id",
        element: <UserProfilePublic/>,
        name: "",
        isVisit: false
    },
    {
        path: "*",
        element: <NotFound/>,
        name: "",
        isVisit: false
    },
    {
        path: "/not-found",
        element: <NotFound/>,
        name: "",
        isVisit: false
    }
];
const publicRoutes = [
    {
        path: "/find-jobs",
        element: <FindJobs/>,
        name: "Найти заказ",
        isVisit: true,
    },
    ...defaultRoutes,
    {
        path: "/user-auth",
        element: <Auth/>,
        name: "Авторизация",
        isVisit: false
    },
    {
        path: "/job-detail/:id",
        element: <JobDetailPublic/>,
        name: "",
        isVisit: false
    },
];

const freelancerRoutes = [
    {
        path: "/find-jobs",
        element: <FreelancerFindJobs/>,
        name: "Найти заказ",
        isVisit: true,
    },
    ...defaultRoutes,
    {
        path: "/user-profile",
        element: <UserProfile/>,
        name: "",
        isVisit: false
    },
    {
        path: "/user-auth",
        isNavigate: true,
        navigatePath: "/find-jobs",
        isVisit: false
    },
    {
        path: "/job-detail/:id",
        element: <JobDetailFreelancer/>,
        name: "",
        isVisit: false
    },
    {
        path: "/job-progress/:id",
        element: <JobProgressFreelancer/>,
        name: "",
        isVisit: false
    },
    {
        path: "/my-job",
        element: <FreelancerJobs/>,
        name: "Мои заказы",
        isVisit: true,
    },
    {
        path: "/my-transaction",
        element: <FreelancerTransaction/>,
        name: "Мои транзакции",
        isVisit: true,
    },
    {
        path: "/analytics",
        element: <FreelancerAnalytics/>,
        name: "Аналитика",
        isVisit: true,
    }
];

const customerRoutes = [
    {
        path: "/find-jobs",
        element: <FindJobs/>,
        name: "Найти заказ",
        isVisit: true,
    },
    ...defaultRoutes,
    {
        path: "/client-profile",
        element: <ClientProfile/>,
        name: "",
        isVisit: false
    },
    {
        path: "/job-payment/success/:id",
        element: <SuccessPage/>,
        name: "",
        isVisit: false
    },
    {
        path: "/job-payment/cancel/:id",
        element: <CancelPage/>,
        name: "",
        isVisit: false
    },
    {
        path: "/user-auth",
        isNavigate: true,
        navigatePath: "/find-jobs",
        isVisit: false
    },
    {
        path: "/job-detail/:id",
        element: <JobDetailCustomer/>,
        name: "",
        isVisit: false
    },
    {
        path: "/job-progress/:id",
        element: <JobProgressCustomer/>,
        name: "",
        isVisit: false
    },
    {
        path: "/upload-job",
        element: <UploadJob/>,
        name: "Разместить заказ",
        isVisit: true
    },
    {
        path: "/my-transaction",
        element: <CustomerTransaction/>,
        name: "Мои транзакции",
        isVisit: true,
    },
];

const adminRoutes = [
    {
        path: "/find-jobs",
        element: <FindJobs/>,
        name: "Найти заказ",
        isVisit: true,
    },
    ...defaultRoutes,
    {
        path: "/admin-panel",
        element: <Admin/>,
        name: "Админ-панель",
        isVisit: true,
    },
    {
        path: "/job-detail/:id",
        element: <JobDetailPublic/>,
        name: "",
        isVisit: false
    },
    {
        path: "/user-auth",
        isNavigate: true,
        navigatePath: "/find-jobs",
        isVisit: false
    },
];

export {
    publicRoutes,
    freelancerRoutes,
    customerRoutes,
    adminRoutes
};