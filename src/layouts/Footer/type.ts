export interface CardFooter {
  title: string
  children: CardFooterItem[]
}

interface CardFooterItem {
  title?: string
  image?: string
}
