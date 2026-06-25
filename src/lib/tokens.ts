export const sizeTypes = ['sm', 'md', 'lg'] as const;
export type SizeType = (typeof sizeTypes)[number];

export const variantTypes = ['solid', 'secondary', 'ghost', 'link'] as const;
export type VariantType = (typeof variantTypes)[number];

export const DEFAULT_SIZE: SizeType = 'md';
