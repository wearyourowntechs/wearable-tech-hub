import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import ReviewsPage from "./pages/ReviewsPage";
import BuyingGuidesPage from "./pages/BuyingGuidesPage";
import ComparePage from "./pages/ComparePage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:id" component={CategoryPage} />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route path="/buying-guides" component={BuyingGuidesPage} />
      <Route path="/compare" component={ComparePage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Navbar />
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
