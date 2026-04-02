import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PathPrefixProvider } from "@/contexts/PathPrefixContext";
import ComingSoon from "./pages/ComingSoon";
import Index from "./pages/Index";
import CycleOfThinking from "./pages/CycleOfThinking";
import Books from "./pages/Books";
import About from "./pages/About";

import Contact from "./pages/Contact";
import Evidence from "./pages/Evidence";
import ProfessionalDevelopmentFeedback from "./pages/ProfessionalDevelopmentFeedback";
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
import IndexV2 from "./pages/IndexV2";
import Speaking from "./pages/Speaking";
import { useTrackingScripts } from "./hooks/useTrackingScripts";

const queryClient = new QueryClient();

const TrackingScripts = () => {
  useTrackingScripts();
  return null;
};

const hostname = window.location.hostname;
const isMainDomain =
  hostname === "teachingcreations.com" || hostname === "www.teachingcreations.com";

/** Wraps children with the /teste prefix so all links point to /teste/... */
const TestePrefix = ({ children }: { children: React.ReactNode }) => (
  <PathPrefixProvider prefix="/teste">{children}</PathPrefixProvider>
);

const TesteV2Prefix = ({ children }: { children: React.ReactNode }) => (
  <PathPrefixProvider prefix="/teste-v2">{children}</PathPrefixProvider>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TrackingScripts />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root: V2 landing page */}
            <Route path="/" element={<IndexV2 />} />

            {/* /teste routes — full site preview on main domain */}
            <Route path="/teste" element={<TestePrefix><Index /></TestePrefix>} />
            <Route path="/teste/cycle-of-thinking" element={<TestePrefix><CycleOfThinking /></TestePrefix>} />
            <Route path="/teste/books" element={<TestePrefix><Books /></TestePrefix>} />
            <Route path="/teste/about" element={<TestePrefix><About /></TestePrefix>} />
            
            <Route path="/teste/contact" element={<TestePrefix><Contact /></TestePrefix>} />
            <Route path="/teste/evidence" element={<TestePrefix><Evidence /></TestePrefix>} />

            {/* /teste-v2 routes — new landing page version */}
            <Route path="/teste-v2" element={<TesteV2Prefix><IndexV2 /></TesteV2Prefix>} />
            <Route path="/teste-v2/cycle-of-thinking" element={<TesteV2Prefix><CycleOfThinking /></TesteV2Prefix>} />
            <Route path="/teste-v2/books" element={<TesteV2Prefix><Books /></TesteV2Prefix>} />
            <Route path="/teste-v2/about" element={<TesteV2Prefix><About /></TesteV2Prefix>} />
            <Route path="/teste-v2/insights" element={<TesteV2Prefix><Insights /></TesteV2Prefix>} />
            <Route path="/teste-v2/contact" element={<TesteV2Prefix><Contact /></TesteV2Prefix>} />
            <Route path="/teste-v2/evidence" element={<TesteV2Prefix><Evidence /></TesteV2Prefix>} />

            {/* Standard routes (always accessible) */}
            <Route path="/cycle-of-thinking" element={<CycleOfThinking />} />
            <Route path="/books" element={<Books />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/evidence" element={<Evidence />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/professional-development-feedback" element={<ProfessionalDevelopmentFeedback />} />

            {/* Admin routes */}
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
