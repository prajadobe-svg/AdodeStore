"use client";

import { useEffect, useRef } from "react";
import { getStoredUser } from "@/lib/auth-client";
import { sendAdobeEvent } from "@/lib/adobe";

type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
};

export function ProductViewTracker({
  product,
}: {
  product: Product;
}) {
  const trackedProducts = useRef<Set<string>>(new Set());
  const storedUser = getStoredUser();
  useEffect(() => {
    const trackingKey = product.slug;

    // Prevent duplicate product-view events during React development rendering.
    if (trackedProducts.current.has(trackingKey)) {
      return;
    }

    // Mark it before sending so React Strict Mode does not create
    // two simultaneous events.
    trackedProducts.current.add(trackingKey);

    void sendAdobeEvent({
      eventType: "commerce.productViews",
      user: storedUser || undefined,
      aamSignals: {
        c_store_event: "product_view",
        ...(storedUser ? { c_authenticated: "true" } : {}),
        c_product_category: product.category.toLowerCase(),
        c_product_sku: product.slug,
      },
      xdm: {
        commerce: {
          productViews: {
            value: 1,
          },
        },
        productListItems: [
          {
            SKU: product.slug,
            name: product.name,
            priceTotal: product.price,
          },
        ],
      },
    }).catch((error) => {
      // Permit a later retry if the Web SDK request fails.
      trackedProducts.current.delete(trackingKey);
      console.error("Adobe product-view event failed", error);
    });
  }, [product.slug, product.name, product.category, product.price]);

  return null;
}