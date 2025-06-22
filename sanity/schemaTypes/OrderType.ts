import { BasketIcon } from "@sanity/icons";
import { defineType, defineField, defineArrayMember } from "sanity";

export const OrderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(1).error("Order number is required"),
    }),
    defineField({
      name: "stripeCheckoutSession",
      title: "Stripe Checkout Session ID",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(1).error("Stripe Checkout Session is required"),
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(1).error("Customer ID is required"),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(1).error("Customer Name is required"),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().min(1).error("Email is required"),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(1).error("Payment Intent ID is required"),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Bought",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
              validation: (Rule) => Rule.min(1).error("Must be at least 1"),
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
            },
            prepare({ product, quantity, image, price }) {
              return {
                title: `${product} x ${quantity}`,
                subtitle: price && quantity ? `$${(price * quantity).toFixed(2)}` : "",
                media: image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) =>
        Rule.required().min(0).error("Total price must be a positive number"),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule) => Rule.required().error("Currency is required"),
    }),
    defineField({
      name: "amountDiscounted",
      title: "Amount Discounted",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .error("Discount must be a positive number"),
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Order status is required"),
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().error("Order date is required"),
    }),
  ],
  preview: {
    select: {
      customerName: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare({ customerName, amount, currency, orderId, email }) {
      const orderIdSnippet = orderId
        ? `${orderId.slice(0, 5)}...${orderId.slice(-5)}`
        : "N/A";

      const formattedAmount =
        typeof amount === "number" ? amount.toFixed(2) : "0.00";

      return {
        title: `Order #${orderIdSnippet} by ${customerName}`,
        subtitle: `Total: ${currency ?? ""} ${formattedAmount} | Email: ${email}`,
        media: BasketIcon,
      };
    },
  },
});
