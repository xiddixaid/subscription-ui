import React, { useEffect, useMemo } from "react";
import {
  Banner,
  useData,
  useContainer,
  useSessionToken,
  useLocale,
} from "@shopify/admin-ui-extensions-react";

import fetchApi from "../utils/fetchApi.jsx";

const translations = {
  en: {
    hello: "Remove Product",
  },
};

function Remove() {
  const data = useData();
  const { close, done, setPrimaryAction, setSecondaryAction } = useContainer();

  const locale = useLocale();
  const localizedStrings = useMemo(() => {
    return translations[locale] || translations.en;
  }, [locale]);

  const { getSessionToken } = useSessionToken();

  useEffect(() => {
    setPrimaryAction({
      content: "Remove from plan",
      onAction: async () => {
        const token = await getSessionToken();

        // The product ID, variant ID, variant IDs, and the selling plan group ID
        let payload = {
          sellingPlanGroupId: data.sellingPlanGroupId,
          productId: data.productId,
          variantId: data.variantId,
          variantIds: data.variantIds,
          token,
        };

        const url =
          "https://testuat-sim.zugdev.com/StorePreOrderProduct/RemoveProductFromSellingPlanGroup";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "shopify-auth": token || "unknown token",
            "ngrok-skip-browser-warning": true,
          },
          body: JSON.stringify(payload),
        };

        try {
          await fetchApi(url, options);
          done();
        } catch (error) {
          console.log(error.message);
        } finally {
          close();
        }
      },
    });

    setSecondaryAction({
      content: "Cancel",
      onAction: () => close(),
    });
  }, [getSessionToken, close, done, setPrimaryAction, setSecondaryAction]);

  return (
    <>
      <Banner
        status="critical"
        title="Are you realy want to remove product from Selling Plan?"
        onDismiss={() => close()}
      />
    </>
  );
}

export default Remove;
