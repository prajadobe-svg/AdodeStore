"use client";

export function AddToCartButton({ productSlug }: { productSlug: string }) {
  return (
    <button
      type="button"
      className="btn-primary"
      onClick={() => console.log("add_to_cart", productSlug)}
    >
      Add to cart
    </button>
  );
}