export const imageLoader: ({ src, width, quality }: { src: string; width: number; quality?: number; }) => string = ({ src, width, quality }) => {
	return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${quality || 75}`
}