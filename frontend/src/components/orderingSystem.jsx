import { useEffect, useState } from "react";
import { fetchMenu } from "../utils/api.js";

function normalizeItem(row, index) {
  return {
    id: row.item_id ?? row.id ?? row.menu_id ?? index,
    product:
      row.item_product ?? row.product ?? row.product_name ?? "Unnamed item",
    category: row.category ?? row.item_category ?? row.category_name ?? "",
    price: row.price ?? row.item_price ?? 0,
    image: row.image ?? row.image_url ?? row.item_image ?? "/food.jpg",
  };
}

function imageUrl(image) {
  if (!image) return "/food.jpg";
  if (/^https?:\/\//.test(image) || image.charAt(0) === "/") return image;
  return `/${image}`;
}

function OrderingSystem() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchMenu()
      .then((data) => {
        const rows = Array.isArray(data) ? data : data.menu || data.items || [];
        if (active) setItems(rows.map(normalizeItem));
      })
      .catch((err) => {
        if (active) setError(err.message || "Could not load the menu.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function addToCart(id) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  }

  return (
    <>
      <header>
        <p>Sinalab Garden</p>
        <h1>Order Management</h1>
      </header>

      <nav>
        <div>
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search menu"
          />
          <button type="button">Find</button>
        </div>
        <div>
          <a className="clickable" href="#meals" aria-label="View cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </a>
        </div>
      </nav>

      <section id="meals">
        <h1>Meals</h1>

        {loading && <p className="menu-status">Loading menu...</p>}
        {error && <p className="menu-status menu-status--error">{error}</p>}

        {!loading && !error && (
          <div className="menu-items">
            {items.length === 0 && (
              <p className="menu-status">No menu items available.</p>
            )}

            {items.map((item) => {
              const quantity = cart[item.id] || 0;
              return (
                <article
                  key={item.id}
                  className={quantity > 0 ? "card card--added" : "card"}
                >
                  <a
                    href="#meals"
                    className="tappable-card"
                    onClick={(event) => {
                      event.preventDefault();
                      addToCart(item.id);
                    }}
                  >
                    <span className="card-body">
                      <img src={imageUrl(item.image)} alt={item.product} />
                      <h3>{item.product}</h3>
                      <p className="card-price">
                        ₱{Number(item.price).toFixed(2)}
                      </p>
                      <p className="card-hint">
                        {quantity > 0 ? `In cart: ${quantity}` : "Tap to add"}
                      </p>
                    </span>
                  </a>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default OrderingSystem;
