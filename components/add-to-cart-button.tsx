"use client";

import { useState } from "react";
import { getStoredUser } from "@/lib/auth-client";
import { sendAdobeEvent } from "@/lib/adobe";

type Product = { slug: string; name: string; category: string; price: number };

export function AddToCartButton({ product }: { product: Product }) {
  const [sent, setSent] = useState(false);

  const addToCart = async () => {
    try {
      await sendAdobeEvent({
        eventType: "commerce.productListAdds",
        user: getStoredUser() || undefined,
        aamSignals: {
          c_store_event: "add_to_cart",
          c_product_category: product.category.toLowerCase(),
          c_product_sku: product.slug,
        },
        xdm: {
          commerce: { productListAdds: { value: 1 } },
          productListItems: [{ SKU: product.slug, name: product.name, priceTotal: product.price }],
        },
      });
      setSent(true);
    } catch (error) {
      console.error("Adobe add-to-cart event failed", error);
    }
  };

  return (
    <button type="button" className="btn-primary" onClick={addToCart}>
      {sent ? "Added" : "Add to cart"}
    </button>
  );
}
