export interface IProps {
    item: IFeed
}

export interface IComments {
    avatar: string
    comment: string
}
export interface IFeed{
    id: number
    image: string
    small: string
    aspectRatio: number
    description: string
    authoriId: number
    author: string
    isFavorite?: boolean
    likes: string[]
    comments: IComments[]
}