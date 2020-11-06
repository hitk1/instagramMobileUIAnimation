import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

import { IProps, IFeed } from './interface';

import {
    Container,
    Header,
    UserInfoWrapper,
    Avatar,
    Name,
    FollowLink,
    OptionsButton,
    IconsWrapper,
    LikeButton,
    CommentButton,
    DirectMessageButton,
    Description
} from './styles';

const Post: React.FC<IProps> = ({ item }) => {

    const [post, setPost] = useState<IFeed>({ ...item, isFavorite: false })

    return (
        <Container>
            <Header>
                <UserInfoWrapper>
                    <Avatar source={{ uri: post.author.avatar }} />
                    <Name>{post.author.name}</Name>
                </UserInfoWrapper>
                <OptionsButton>
                    <SimpleLineIcon
                        name="options-vertical"
                        size={22}
                        color='#000'
                    />
                </OptionsButton>
            </Header>

            <ImageBackground
                source={{ uri: post.image }}
                resizeMode="contain"
                style={{
                    width: '100%',
                    aspectRatio: post.aspectRatio
                }}
            /*
                AspectRatio é calculado com base na largura e altura da imagem original
                é uma maneira de definir a altura da imagem automaticamente
                
                AspectRatio = width / height
            */
            />
            <IconsWrapper>
                <LikeButton
                    onPress={() => { setPost({ ...post, isFavorite: !post.isFavorite }) }}
                >
                    <MaterialIcon
                        name={!post.isFavorite ? "favorite-border" : "favorite"}
                        size={26}
                        color={!post.isFavorite ? '#000' : "red"}
                    />
                </LikeButton>
                <CommentButton>
                    <IonIcon
                        name="md-chatbox-outline"
                        size={26}
                        color='#000'
                    />
                </CommentButton>
                <DirectMessageButton>
                    <IonIcon
                        name="md-paper-plane-outline"
                        size={26}
                        color="#000"
                    />
                </DirectMessageButton>
            </IconsWrapper>
            <Description>
                <Name>{post.description}</Name> {post.description}
            </Description>
        </Container >
    )
}

export default Post;