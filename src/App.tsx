import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/cycle-of-thinking" element={<CycleOfThinking />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="content" element={<AdminPlaceholder />} />
            <Route path="insights" element={<AdminPlaceholder />} />
            <Route path="books" element={<AdminPlaceholder />} />
            <Route path="sales" element={<AdminPlaceholder />} />
            <Route path="audience" element={<AdminPlaceholder />} />
            <Route path="pd-requests" element={<AdminPlaceholder />} />
            <Route path="testimonials" element={<AdminPlaceholder />} />
            <Route path="media-kit" element={<AdminPlaceholder />} />
            <Route path="settings" element={<AdminPlaceholder />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
