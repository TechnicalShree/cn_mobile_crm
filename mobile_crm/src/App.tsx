import { Switch, Route } from "wouter";
import { FrappeProvider } from "frappe-react-sdk";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import Dashboard from "./pages/dashboard";
import Leads from "./pages/leads";
import LeadDetail from "./pages/lead-detail";
import Visits from "./pages/visits";
import NotFound from "./pages/not-found";
import LoginPage from "./pages/login";

function Router() {
  return (
    <Switch>
      {/* Login page for testing only */}
      <Route path="/" component={LoginPage} />
      <Route path="/mobile_crm" component={Dashboard} />
      <Route path="/mobile_crm/leads" component={Leads} />
      <Route path="/mobile_crm/leads/:id" component={LeadDetail} />
      <Route path="/mobile_crm/visits" component={Visits} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="App">
      <FrappeProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <Toaster />
        </QueryClientProvider>
      </FrappeProvider>
    </div>
  );
}

export default App;
