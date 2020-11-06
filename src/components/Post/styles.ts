import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  margin-top: 10px;
  background-color: '#FFF';
`;

export const UserInfoWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const FollowLink = styled.Text`
    color: blue;
    font-weight: bold;
`;

export const OptionsButton = styled(RectButton)`
    height: 32px;
    width: 32px;
    align-items: center;
    justify-content: center;
`;

export const Header = styled.View`
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 10px;
`;

export const Name = styled.Text`
    color: #000;
    font-weight: bold;
`;

export const PostImage = styled.Image`
    aspect-ratio: ${(props: any) => props.ratio};
    width: 100%;
`;

export const Description = styled.Text`
    padding: 0 15px;
    line-height: 18px;
    color: #000;
`;

export const IconsWrapper = styled.View`
    padding: 8px;
    flex-direction: row;
`;

export const LikeButton = styled(RectButton)`
    height: 32px;
    width: 32px;
    align-items: center;
    justify-content: center;
`;

export const CommentButton = styled(RectButton)`
    height: 32px;
    width: 32px;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
`;

export const DirectMessageButton = styled(RectButton)`
    height: 32px;
    width: 32px;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
`;