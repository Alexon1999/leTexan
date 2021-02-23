import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import NavBarContextProvider from "./contexts/Navbar/NavBarState";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import Commander from "./pages/Commander";
import Panier from "./pages/Panier";
import Contact from "./pages/Contact";
import Alerts from "./components/alert/Alerts";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// + Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Paiement from "./pages/Paiement";
import Felicitation from "./pages/Felicitation";
import Admin from "./pages/Admin";

// publish key c'est pour identifier votre compte stripe, ce n'est pas un secret key
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISH_KEY ||
    "pk_test_51IIvIiJnUZH8vWLUUchVy18GC4RMwtaLZPxLWWsroa6WPrml7zUkSHS1zqbo2nr9qIrgzZuBhjIiAfuecpbKWsqL00LTFHUPLH"
);

function App() {
  return (
    <div className='App'>
      <Alerts />
      <Router>
        <NavBarContextProvider>
          <NavBar />
        </NavBarContextProvider>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/commander' component={Commander} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/panier' component={Panier} />
          <Route exact path='/paiement'>
            <Elements stripe={stripePromise}>
              <Paiement />
            </Elements>
          </Route>
          <Route exact path='/felicitation' component={Felicitation} />
          <Route path='/admin' component={Admin} />
          <Route exact component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
