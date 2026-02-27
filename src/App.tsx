import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon";
import Index from "./pages/Index";
import CycleOfThinking from "./pages/CycleOfThinking";
import Books from "./pages/Books";
import About from "./pages/About";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import InsightsList from "./pages/admin/InsightsList";
import InsightEditor from "./pages/admin/InsightEditor";
import BooksList from "./pages/admin/BooksList";
import BookEditor from "./pages/admin/BookEditor";
import AudienceList from "./pages/admin/AudienceList";
import PdRequestsList from "./pages/admin/PdRequestsList";
import TestimonialsList from "./pages/admin/TestimonialsList";
import ContentManager from "./pages/admin/ContentManager";
import SalesAnalytics from "./pages/admin/SalesAnalytics";
import MediaKit from "./pages/admin/MediaKit";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const hostname = window.location.hostname;
const isMainDomain =
  hostname === "teachingcreations.com" || hostname === "www.teachingcreations.com";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Coming Soon on main domain root */}
            {isMainDomain && <Route path="/" element={<ComingSoon />} />}

            {/* Full site: accessible via /teste on main domain, or normally on other domains */}
            <Route path={isMainDomain ? "/teste" : "/"} element={<Index />} />
            <Route path={isMainDomain ? "/teste/cycle-of-thinking" : "/cycle-of-thinking"} element={<CycleOfThinking />} />
            <Route path={isMainDomain ? "/teste/books" : "/books"} element={<Books />} />
            <Route path={isMainDomain ? "/teste/about" : "/about"} element={<About />} />
            <Route path={isMainDomain ? "/teste/insights" : "/insights"} element={<Insights />} />
            <Route path={isMainDomain ? "/teste/contact" : "/contact"} element={<Contact />} />

            {/* Admin routes always at /admin */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="insights" element={<InsightsList />} />
              <Route path="insights/:id" element={<InsightEditor />} />
              <Route path="books" element={<BooksList />} />
              <Route path="books/:id" element={<BookEditor />} />
              <Route path="sales" element={<SalesAnalytics />} />
              <Route path="audience" element={<AudienceList />} />
              <Route path="pd-requests" element={<PdRequestsList />} />
              <Route path="testimonials" element={<TestimonialsList />} />
              <Route path="media-kit" element={<MediaKit />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
