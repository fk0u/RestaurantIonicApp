import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { AppProvider } from './store/AppContext';

import OnboardingScreen from './components/OnboardingScreen';
import TableSelectionGrid from './components/TableSelectionGrid';
import MenuBrowsingGrid from './components/MenuBrowsingGrid';
import ShoppingCartDetails from './components/ShoppingCartDetails';
import PaymentQRISDialog from './components/PaymentQRISDialog';
import DigitalReceiptPreview from './components/DigitalReceiptPreview';
import CashierPOSMode from './components/CashierPOSMode';
import KitchenOrderTickets from './components/KitchenOrderTickets';
import AdminDashboard from './components/AdminDashboard';
import DesignSystemUIKit from './components/DesignSystemUIKit';

setupIonicReact({ mode: 'ios' });

const App: React.FC = () => (
  <IonApp>
    <AppProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/onboarding" component={OnboardingScreen} />
          <Route exact path="/tables" component={TableSelectionGrid} />
          <Route exact path="/menu" component={MenuBrowsingGrid} />
          <Route exact path="/cart" component={ShoppingCartDetails} />
          <Route exact path="/payment" component={PaymentQRISDialog} />
          <Route exact path="/receipt" component={DigitalReceiptPreview} />
          <Route exact path="/cashier" component={CashierPOSMode} />
          <Route exact path="/kitchen" component={KitchenOrderTickets} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/design-system" component={DesignSystemUIKit} />
          <Redirect exact from="/" to="/onboarding" />
        </IonRouterOutlet>
      </IonReactRouter>
    </AppProvider>
  </IonApp>
);

export default App;
