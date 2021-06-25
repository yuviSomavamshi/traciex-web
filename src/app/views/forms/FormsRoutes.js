import { MatxLoadable } from "matx";

const Customers = MatxLoadable({
  loader: () => import("../Customers")
});
const BarcodePage = MatxLoadable({
  loader: () => import("../BarcodePage")
});
const RamanReader = MatxLoadable({
  loader: () => import("../RamanReader")
});
const formsRoutes = [
  {
    path: "/customers",
    component: Customers
  },
  {
    path: "/barcode",
    component: BarcodePage
  },
  {
    path: "/raman-reader",
    component: RamanReader
  }
];

export default formsRoutes;
