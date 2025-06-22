import { TagIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const SalesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount (%)",
      type: "number",
      description: "Amount in percentage or fixed value",
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
    }),
    defineField({
      name: "validFrom",
      title: "Valid From",
      type: "datetime",
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Toggle to activate or deactivate the sale",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare({ title, discountAmount, couponCode, isActive }) {
      const status = isActive ? "Active" : "Inactive";
      return {
        title: title || "Untitled Sale",
        subtitle: `${discountAmount}% off with code ${couponCode} - ${status}`,
      };
    },
  },
});
