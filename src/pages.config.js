import { lazy } from 'react';
import __Layout from './Layout.jsx';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreatePortfolio = lazy(() => import('./pages/CreatePortfolio'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Home = lazy(() => import('./pages/Home'));
const LeadCapture = lazy(() => import('./pages/LeadCapture'));
const PortfolioSummary = lazy(() => import('./pages/PortfolioSummary'));
const PackageInquiry = lazy(() => import('./pages/PackageInquiry'));
const CareerAgent = lazy(() => import('./pages/CareerAgent'));
const Candidates = lazy(() => import('./pages/Candidates'));
const Interviews = lazy(() => import('./pages/Interviews'));


export const PAGES = {
    "Dashboard": Dashboard,
    "CreatePortfolio": CreatePortfolio,
    "Portfolio": Portfolio,
    "Home": Home,
    "LeadCapture": LeadCapture,
    "PortfolioSummary": PortfolioSummary,
    "PackageInquiry": PackageInquiry,
    "CareerAgent": CareerAgent,
    "Candidates": Candidates,
    "Interviews": Interviews,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};
