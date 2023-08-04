import React from "react";
import { extend, render } from "@shopify/admin-ui-extensions-react";

import Remove from "./components/Remove.jsx";

extend(
  "Admin::Product::SubscriptionPlan::Remove",
  render(() => <Remove />)
);
