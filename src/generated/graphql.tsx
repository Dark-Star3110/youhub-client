import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export enum Action {
  Activate = "ACTIVATE",
  Disactivate = "DISACTIVATE",
}

export type Catagory = {
  __typename?: "Catagory";
  id: Scalars["ID"];
  name: Scalars["String"];
  videos?: Maybe<Array<Video>>;
};

export type Comment = {
  __typename?: "Comment";
  content: Scalars["String"];
  createdAt: Scalars["String"];
  deletedAt: Scalars["String"];
  id: Scalars["ID"];
  numUsersDisLiked?: Maybe<Scalars["Float"]>;
  numUsersLiked?: Maybe<Scalars["Float"]>;
  parentComment?: Maybe<Comment>;
  updatedAt: Scalars["String"];
  user: User;
  voteStatus: Scalars["Int"];
};

export type CommentMutationResponse = MutationResponse & {
  __typename?: "CommentMutationResponse";
  code: Scalars["Float"];
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type CreateCommentInput = {
  content: Scalars["String"];
  parentCommentId?: InputMaybe<Scalars["String"]>;
};

export type CreateVideoInput = {
  commentable?: InputMaybe<Scalars["Boolean"]>;
  description: Scalars["String"];
  id: Scalars["ID"];
  size: Scalars["String"];
  thumbnailUrl?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type FieldError = {
  __typename?: "FieldError";
  error: Scalars["String"];
  type: Scalars["String"];
};

export type GetCommentInput = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Float"];
  parentCmtId?: InputMaybe<Scalars["String"]>;
  videoId: Scalars["String"];
};

export type LoginInput = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: Scalars["Boolean"];
  createComment: CommentMutationResponse;
  createVideo: VideoMutationResponse;
  deleteComment: CommentMutationResponse;
  deleteVideo: VideoMutationResponse;
  forgotPassword: Scalars["Boolean"];
  login: UserMutationResponse;
  logout: Scalars["Boolean"];
  onNotification: UserMutationResponse;
  refreshToken: UserMutationResponse;
  signup: UserMutationResponse;
  subscribe: UserMutationResponse;
  updateComment: CommentMutationResponse;
  updateInfo: UserMutationResponse;
  updateVideo: VideoMutationResponse;
  voteComment: CommentMutationResponse;
  voteVideo: VideoMutationResponse;
  watchLater: VideoMutationResponse;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
  parentCommentId?: InputMaybe<Scalars["ID"]>;
  videoId: Scalars["ID"];
};

export type MutationCreateVideoArgs = {
  createVideoInput: CreateVideoInput;
};

export type MutationDeleteCommentArgs = {
  commentId: Scalars["ID"];
};

export type MutationDeleteVideoArgs = {
  videoId: Scalars["ID"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  loginInput?: InputMaybe<LoginInput>;
  socialLogin?: InputMaybe<SocialLogin>;
};

export type MutationOnNotificationArgs = {
  action: Action;
  chanelId: Scalars["ID"];
};

export type MutationSignupArgs = {
  signupInput: SignupInput;
};

export type MutationSubscribeArgs = {
  action: Action;
  chanelId: Scalars["ID"];
};

export type MutationUpdateCommentArgs = {
  commentId: Scalars["ID"];
  updateCommentInput: UpdateCommentInput;
};

export type MutationUpdateInfoArgs = {
  updateInput: UpdateUserInfoInput;
};

export type MutationUpdateVideoArgs = {
  updateVideoInput: UpdateVideoInput;
  videoId: Scalars["ID"];
};

export type MutationVoteCommentArgs = {
  action: Action;
  commentId: Scalars["ID"];
  type: VoteType;
};

export type MutationVoteVideoArgs = {
  action: Action;
  type: VoteType;
  videoId: Scalars["ID"];
};

export type MutationWatchLaterArgs = {
  action: Action;
  videoId: Scalars["ID"];
};

export type MutationResponse = {
  code: Scalars["Float"];
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type Notification = {
  __typename?: "Notification";
  _id: Scalars["ID"];
  avatar_url?: Maybe<Scalars["String"]>;
  commentId?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  createdAt: Scalars["String"];
  readed: Scalars["Boolean"];
  thumnail?: Maybe<Scalars["String"]>;
  type: Scalars["String"];
  videoId?: Maybe<Scalars["String"]>;
};

export type PaginatedComments = PaginatedResponse & {
  __typename?: "PaginatedComments";
  cursor: Scalars["DateTime"];
  hasMore: Scalars["Boolean"];
  paginatedComments: Array<Comment>;
  totalCount: Scalars["Float"];
};

export type PaginatedNotification = {
  __typename?: "PaginatedNotification";
  cursor: Scalars["Int"];
  hasMore: Scalars["Boolean"];
  paginatedNotification: Array<Notification>;
  totalCount: Scalars["Float"];
};

export type PaginatedResponse = {
  cursor: Scalars["DateTime"];
  hasMore: Scalars["Boolean"];
  totalCount: Scalars["Float"];
};

export type PaginatedVideos = PaginatedResponse & {
  __typename?: "PaginatedVideos";
  cursor: Scalars["DateTime"];
  hasMore: Scalars["Boolean"];
  paginatedVideos: Array<Video>;
  totalCount: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  comment?: Maybe<Comment>;
  comments?: Maybe<PaginatedComments>;
  find?: Maybe<PaginatedVideos>;
  hello: Scalars["String"];
  me?: Maybe<User>;
  notification?: Maybe<Notification>;
  notifications?: Maybe<PaginatedNotification>;
  user?: Maybe<User>;
  video?: Maybe<Video>;
  videoConcern?: Maybe<PaginatedVideos>;
  videoUser?: Maybe<PaginatedVideos>;
  videos?: Maybe<PaginatedVideos>;
  videosVoted?: Maybe<PaginatedVideos>;
  videosWatchLater?: Maybe<PaginatedVideos>;
};

export type QueryCommentArgs = {
  id: Scalars["String"];
};

export type QueryCommentsArgs = {
  getCmtInput: GetCommentInput;
};

export type QueryFindArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
  query: Scalars["String"];
};

export type QueryNotificationArgs = {
  id: Scalars["ID"];
};

export type QueryNotificationsArgs = {
  cursor?: InputMaybe<Scalars["Int"]>;
  limit: Scalars["Int"];
};

export type QueryUserArgs = {
  userId: Scalars["ID"];
};

export type QueryVideoArgs = {
  id: Scalars["ID"];
};

export type QueryVideoConcernArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
  videoId: Scalars["ID"];
};

export type QueryVideoUserArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
  userId: Scalars["ID"];
};

export type QueryVideosArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryVideosVotedArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
  type: Scalars["Float"];
};

export type QueryVideosWatchLaterArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type SignupInput = {
  dateOfBirth?: InputMaybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type SocialLogin = {
  accessToken: Scalars["String"];
  type: Strategy;
};

/** strategy login with social */
export enum Strategy {
  Google = "GOOGLE",
  Local = "LOCAL",
}

export type SubscribeStatus = {
  __typename?: "SubscribeStatus";
  notification: Scalars["Boolean"];
  status: Scalars["Boolean"];
};

export type UpdateCommentInput = {
  content: Scalars["String"];
};

export type UpdateUserInfoInput = {
  banner_id?: InputMaybe<Scalars["String"]>;
  channelDecscription?: InputMaybe<Scalars["String"]>;
  dateOfBirth?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  image_url?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
};

export type UpdateVideoInput = {
  commentable?: InputMaybe<Scalars["Boolean"]>;
  description?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  banner_url?: Maybe<Scalars["String"]>;
  chanelsSubscribe?: Maybe<Array<User>>;
  channelDecscription?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  dateOfBirth?: Maybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  fullName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  image_url?: Maybe<Scalars["String"]>;
  lastName: Scalars["String"];
  numSubscribers: Scalars["Int"];
  numVideo: Scalars["Int"];
  role: Scalars["String"];
  socialId?: Maybe<Scalars["String"]>;
  subscribeStatus: SubscribeStatus;
  subscribers?: Maybe<Array<User>>;
  updatedAt: Scalars["String"];
  username?: Maybe<Scalars["String"]>;
};

export type UserMutationResponse = MutationResponse & {
  __typename?: "UserMutationResponse";
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
  token?: Maybe<Scalars["String"]>;
};

export type Video = {
  __typename?: "Video";
  catagories?: Maybe<Array<Catagory>>;
  commentable: Scalars["Boolean"];
  createdAt: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["ID"];
  numUsersDisLiked?: Maybe<Scalars["Float"]>;
  numUsersLiked?: Maybe<Scalars["Float"]>;
  size: Scalars["String"];
  thumbnailUrl?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt: Scalars["String"];
  user: User;
  voteStatus: Scalars["Int"];
};

export type VideoMutationResponse = MutationResponse & {
  __typename?: "VideoMutationResponse";
  code: Scalars["Float"];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
  video?: Maybe<Video>;
};

export enum VoteType {
  Dislike = "DISLIKE",
  Like = "LIKE",
}

export type CatagoryInfoFragment = {
  __typename?: "Catagory";
  id: string;
  name: string;
};

export type CommentInfoFragment = {
  __typename?: "Comment";
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type FieldErrorFragment = {
  __typename?: "FieldError";
  type: string;
  error: string;
};

export type NotificationInfoFragment = {
  __typename?: "Notification";
  _id: string;
  type: string;
  videoId?: string | null | undefined;
  commentId?: string | null | undefined;
  readed: boolean;
  content: string;
  avatar_url?: string | null | undefined;
  thumnail?: string | null | undefined;
  createdAt: string;
};

type MutationStatuses_CommentMutationResponse_Fragment = {
  __typename?: "CommentMutationResponse";
  code: number;
  success: boolean;
  message?: string | null | undefined;
};

type MutationStatuses_UserMutationResponse_Fragment = {
  __typename?: "UserMutationResponse";
  code: number;
  success: boolean;
  message?: string | null | undefined;
};

type MutationStatuses_VideoMutationResponse_Fragment = {
  __typename?: "VideoMutationResponse";
  code: number;
  success: boolean;
  message?: string | null | undefined;
};

export type MutationStatusesFragment =
  | MutationStatuses_CommentMutationResponse_Fragment
  | MutationStatuses_UserMutationResponse_Fragment
  | MutationStatuses_VideoMutationResponse_Fragment;

export type UserInfoFragment = {
  __typename?: "User";
  id: string;
  username?: string | null | undefined;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string | null | undefined;
  channelDecscription?: string | null | undefined;
  numSubscribers: number;
  image_url?: string | null | undefined;
  banner_url?: string | null | undefined;
  dateOfBirth?: any | null | undefined;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type VideoInfoFragment = {
  __typename?: "Video";
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string | null | undefined;
  createdAt: string;
  updatedAt: string;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: boolean;
};

export type CreateCommentMutationVariables = Exact<{
  videoId: Scalars["ID"];
  createCommentInput: CreateCommentInput;
  parentCommentId?: InputMaybe<Scalars["ID"]>;
}>;

export type CreateCommentMutation = {
  __typename?: "Mutation";
  createComment: {
    __typename?: "CommentMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
    comment?:
      | {
          __typename?: "Comment";
          id: string;
          content: string;
          createdAt: string;
          updatedAt: string;
          user: {
            __typename?: "User";
            firstName: string;
            lastName: string;
            image_url?: string | null | undefined;
          };
        }
      | null
      | undefined;
    errors?:
      | Array<{ __typename?: "FieldError"; type: string; error: string }>
      | null
      | undefined;
  };
};

export type CreateVideoMutationVariables = Exact<{
  createVideoInput: CreateVideoInput;
}>;

export type CreateVideoMutation = {
  __typename?: "Mutation";
  createVideo: {
    __typename?: "VideoMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
    video?:
      | {
          __typename?: "Video";
          id: string;
          title: string;
          description: string;
          thumbnailUrl?: string | null | undefined;
          createdAt: string;
          updatedAt: string;
        }
      | null
      | undefined;
    errors?:
      | Array<{ __typename?: "FieldError"; type: string; error: string }>
      | null
      | undefined;
  };
};

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars["ID"];
}>;

export type DeleteCommentMutation = {
  __typename?: "Mutation";
  deleteComment: {
    __typename?: "CommentMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
  };
};

export type DeleteVideoMutationVariables = Exact<{
  videoId: Scalars["ID"];
}>;

export type DeleteVideoMutation = {
  __typename?: "Mutation";
  deleteVideo: {
    __typename?: "VideoMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
  loginInput?: InputMaybe<LoginInput>;
  socialLogin?: InputMaybe<SocialLogin>;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserMutationResponse";
    token?: string | null | undefined;
    code: number;
    success: boolean;
    message?: string | null | undefined;
    errors?:
      | Array<{ __typename?: "FieldError"; type: string; error: string }>
      | null
      | undefined;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type OnNotifyMutationVariables = Exact<{
  chanelId: Scalars["ID"];
  action: Action;
}>;

export type OnNotifyMutation = {
  __typename?: "Mutation";
  onNotification: {
    __typename?: "UserMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
  };
};

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken: {
    __typename?: "UserMutationResponse";
    token?: string | null | undefined;
    code: number;
    success: boolean;
    message?: string | null | undefined;
    errors?:
      | Array<{ __typename?: "FieldError"; type: string; error: string }>
      | null
      | undefined;
  };
};

export type SignupMutationVariables = Exact<{
  signupInput: SignupInput;
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: {
    __typename?: "UserMutationResponse";
    token?: string | null | undefined;
    code: number;
    success: boolean;
    message?: string | null | undefined;
    errors?:
      | Array<{ __typename?: "FieldError"; type: string; error: string }>
      | null
      | undefined;
  };
};

export type SubscribeMutationVariables = Exact<{
  chanelId: Scalars["ID"];
  action: Action;
}>;

export type SubscribeMutation = {
  __typename?: "Mutation";
  subscribe: {
    __typename?: "UserMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
  };
};

export type UpdateCommentMutationVariables = Exact<{
  updateCommentInput: UpdateCommentInput;
  commentId: Scalars["ID"];
}>;

export type UpdateCommentMutation = {
  __typename?: "Mutation";
  updateComment: {
    __typename?: "CommentMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
  };
};

export type UpdateUserInfoMutationVariables = Exact<{
  updateInput: UpdateUserInfoInput;
}>;

export type UpdateUserInfoMutation = {
  __typename?: "Mutation";
  updateInfo: {
    __typename?: "UserMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
  };
};

export type UpdateVideoMutationVariables = Exact<{
  updateVideoInput: UpdateVideoInput;
  videoId: Scalars["ID"];
}>;

export type UpdateVideoMutation = {
  __typename?: "Mutation";
  updateVideo: {
    __typename?: "VideoMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
  };
};

export type VoteCommentMutationVariables = Exact<{
  action: Action;
  type: VoteType;
  voteCommentCommentId2: Scalars["ID"];
}>;

export type VoteCommentMutation = {
  __typename?: "Mutation";
  voteComment: {
    __typename?: "CommentMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
    errors?:
      | Array<{ __typename?: "FieldError"; type: string; error: string }>
      | null
      | undefined;
  };
};

export type VoteVideoMutationVariables = Exact<{
  action: Action;
  type: VoteType;
  videoId: Scalars["ID"];
}>;

export type VoteVideoMutation = {
  __typename?: "Mutation";
  voteVideo: {
    __typename?: "VideoMutationResponse";
    code: number;
    success: boolean;
    message?: string | null | undefined;
    errors?:
      | Array<{ __typename?: "FieldError"; type: string; error: string }>
      | null
      | undefined;
  };
};

export type CommentQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type CommentQuery = {
  __typename?: "Query";
  comment?:
    | {
        __typename?: "Comment";
        numUsersLiked?: number | null | undefined;
        voteStatus: number;
        id: string;
        content: string;
        createdAt: string;
        updatedAt: string;
        user: {
          __typename?: "User";
          id: string;
          firstName: string;
          lastName: string;
          image_url?: string | null | undefined;
        };
      }
    | null
    | undefined;
};

export type CommentsQueryVariables = Exact<{
  getCmtInput: GetCommentInput;
}>;

export type CommentsQuery = {
  __typename?: "Query";
  comments?:
    | {
        __typename?: "PaginatedComments";
        totalCount: number;
        cursor: any;
        hasMore: boolean;
        paginatedComments: Array<{ __typename?: "Comment"; id: string }>;
      }
    | null
    | undefined;
};

export type FindQueryVariables = Exact<{
  query: Scalars["String"];
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type FindQuery = {
  __typename?: "Query";
  find?:
    | {
        __typename?: "PaginatedVideos";
        totalCount: number;
        cursor: any;
        hasMore: boolean;
        paginatedVideos: Array<{
          __typename?: "Video";
          id: string;
          title: string;
          description: string;
          thumbnailUrl?: string | null | undefined;
          createdAt: string;
          updatedAt: string;
          user: {
            __typename?: "User";
            id: string;
            firstName: string;
            lastName: string;
            fullName?: string | null | undefined;
            image_url?: string | null | undefined;
            role: string;
          };
        }>;
      }
    | null
    | undefined;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?:
    | {
        __typename?: "User";
        id: string;
        username?: string | null | undefined;
        email: string;
        firstName: string;
        lastName: string;
        fullName?: string | null | undefined;
        channelDecscription?: string | null | undefined;
        numSubscribers: number;
        image_url?: string | null | undefined;
        banner_url?: string | null | undefined;
        dateOfBirth?: any | null | undefined;
        role: string;
        createdAt: string;
        updatedAt: string;
      }
    | null
    | undefined;
};

export type NotificationQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type NotificationQuery = {
  __typename?: "Query";
  notification?:
    | {
        __typename?: "Notification";
        _id: string;
        type: string;
        videoId?: string | null | undefined;
        commentId?: string | null | undefined;
        readed: boolean;
        content: string;
        avatar_url?: string | null | undefined;
        thumnail?: string | null | undefined;
        createdAt: string;
      }
    | null
    | undefined;
};

export type NotificationsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["Int"]>;
}>;

export type NotificationsQuery = {
  __typename?: "Query";
  notifications?:
    | {
        __typename?: "PaginatedNotification";
        totalCount: number;
        cursor: number;
        hasMore: boolean;
        paginatedNotification: Array<{
          __typename?: "Notification";
          _id: string;
          type: string;
          videoId?: string | null | undefined;
          commentId?: string | null | undefined;
          readed: boolean;
          content: string;
          avatar_url?: string | null | undefined;
          thumnail?: string | null | undefined;
          createdAt: string;
        }>;
      }
    | null
    | undefined;
};

export type UserQueryVariables = Exact<{
  userId: Scalars["ID"];
}>;

export type UserQuery = {
  __typename?: "Query";
  user?:
    | {
        __typename?: "User";
        numVideo: number;
        id: string;
        username?: string | null | undefined;
        email: string;
        firstName: string;
        lastName: string;
        fullName?: string | null | undefined;
        channelDecscription?: string | null | undefined;
        numSubscribers: number;
        image_url?: string | null | undefined;
        banner_url?: string | null | undefined;
        dateOfBirth?: any | null | undefined;
        role: string;
        createdAt: string;
        updatedAt: string;
        subscribeStatus: {
          __typename?: "SubscribeStatus";
          status: boolean;
          notification: boolean;
        };
      }
    | null
    | undefined;
};

export type UserVideosQueryVariables = Exact<{
  limit: Scalars["Int"];
  userId: Scalars["ID"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type UserVideosQuery = {
  __typename?: "Query";
  videoUser?:
    | {
        __typename?: "PaginatedVideos";
        totalCount: number;
        cursor: any;
        hasMore: boolean;
        paginatedVideos: Array<{
          __typename?: "Video";
          id: string;
          title: string;
          description: string;
          thumbnailUrl?: string | null | undefined;
          createdAt: string;
          updatedAt: string;
          user: { __typename?: "User"; fullName?: string | null | undefined };
        }>;
      }
    | null
    | undefined;
};

export type VideoQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type VideoQuery = {
  __typename?: "Query";
  video?:
    | {
        __typename?: "Video";
        commentable: boolean;
        numUsersLiked?: number | null | undefined;
        voteStatus: number;
        id: string;
        title: string;
        description: string;
        thumbnailUrl?: string | null | undefined;
        createdAt: string;
        updatedAt: string;
        user: {
          __typename?: "User";
          id: string;
          firstName: string;
          lastName: string;
          fullName?: string | null | undefined;
          image_url?: string | null | undefined;
          numSubscribers: number;
          role: string;
          subscribeStatus: {
            __typename?: "SubscribeStatus";
            status: boolean;
            notification: boolean;
          };
        };
      }
    | null
    | undefined;
};

export type VideoConcernQueryVariables = Exact<{
  videoId: Scalars["ID"];
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type VideoConcernQuery = {
  __typename?: "Query";
  videoConcern?:
    | {
        __typename?: "PaginatedVideos";
        totalCount: number;
        hasMore: boolean;
        cursor: any;
        paginatedVideos: Array<{
          __typename?: "Video";
          id: string;
          title: string;
          description: string;
          thumbnailUrl?: string | null | undefined;
          createdAt: string;
          updatedAt: string;
          user: {
            __typename?: "User";
            id: string;
            firstName: string;
            lastName: string;
            fullName?: string | null | undefined;
            image_url?: string | null | undefined;
            role: string;
          };
        }>;
      }
    | null
    | undefined;
};

export type VideosQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type VideosQuery = {
  __typename?: "Query";
  videos?:
    | {
        __typename?: "PaginatedVideos";
        totalCount: number;
        cursor: any;
        hasMore: boolean;
        paginatedVideos: Array<{
          __typename?: "Video";
          id: string;
          title: string;
          description: string;
          thumbnailUrl?: string | null | undefined;
          createdAt: string;
          updatedAt: string;
          user: {
            __typename?: "User";
            id: string;
            firstName: string;
            lastName: string;
            fullName?: string | null | undefined;
            image_url?: string | null | undefined;
            role: string;
          };
        }>;
      }
    | null
    | undefined;
};

export const CatagoryInfoFragmentDoc = gql`
  fragment catagoryInfo on Catagory {
    id
    name
  }
`;
export const CommentInfoFragmentDoc = gql`
  fragment commentInfo on Comment {
    id
    content
    createdAt
    updatedAt
  }
`;
export const FieldErrorFragmentDoc = gql`
  fragment fieldError on FieldError {
    type
    error
  }
`;
export const NotificationInfoFragmentDoc = gql`
  fragment notificationInfo on Notification {
    _id
    type
    videoId
    commentId
    readed
    content
    avatar_url
    thumnail
    createdAt
  }
`;
export const MutationStatusesFragmentDoc = gql`
  fragment mutationStatuses on MutationResponse {
    code
    success
    message
  }
`;
export const UserInfoFragmentDoc = gql`
  fragment userInfo on User {
    id
    username
    email
    firstName
    lastName
    fullName
    channelDecscription
    numSubscribers
    image_url
    banner_url
    dateOfBirth
    role
    createdAt
    updatedAt
  }
`;
export const VideoInfoFragmentDoc = gql`
  fragment videoInfo on Video {
    id
    title
    description
    thumbnailUrl
    createdAt
    updatedAt
  }
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword)
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const CreateCommentDocument = gql`
  mutation CreateComment(
    $videoId: ID!
    $createCommentInput: CreateCommentInput!
    $parentCommentId: ID
  ) {
    createComment(
      videoId: $videoId
      createCommentInput: $createCommentInput
      parentCommentId: $parentCommentId
    ) {
      code
      success
      message
      comment {
        ...commentInfo
        user {
          firstName
          lastName
          image_url
        }
      }
      errors {
        ...fieldError
      }
    }
  }
  ${CommentInfoFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      createCommentInput: // value for 'createCommentInput'
 *      parentCommentId: // value for 'parentCommentId'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult =
  Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const CreateVideoDocument = gql`
  mutation CreateVideo($createVideoInput: CreateVideoInput!) {
    createVideo(createVideoInput: $createVideoInput) {
      ...mutationStatuses
      video {
        ...videoInfo
      }
      errors {
        ...fieldError
      }
    }
  }
  ${MutationStatusesFragmentDoc}
  ${VideoInfoFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export type CreateVideoMutationFn = Apollo.MutationFunction<
  CreateVideoMutation,
  CreateVideoMutationVariables
>;

/**
 * __useCreateVideoMutation__
 *
 * To run a mutation, you first call `useCreateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoMutation, { data, loading, error }] = useCreateVideoMutation({
 *   variables: {
 *      createVideoInput: // value for 'createVideoInput'
 *   },
 * });
 */
export function useCreateVideoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateVideoMutation,
    CreateVideoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateVideoMutation, CreateVideoMutationVariables>(
    CreateVideoDocument,
    options
  );
}
export type CreateVideoMutationHookResult = ReturnType<
  typeof useCreateVideoMutation
>;
export type CreateVideoMutationResult =
  Apollo.MutationResult<CreateVideoMutation>;
export type CreateVideoMutationOptions = Apollo.BaseMutationOptions<
  CreateVideoMutation,
  CreateVideoMutationVariables
>;
export const DeleteCommentDocument = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      ...mutationStatuses
    }
  }
  ${MutationStatusesFragmentDoc}
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DeleteCommentDocument, options);
}
export type DeleteCommentMutationHookResult = ReturnType<
  typeof useDeleteCommentMutation
>;
export type DeleteCommentMutationResult =
  Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;
export const DeleteVideoDocument = gql`
  mutation DeleteVideo($videoId: ID!) {
    deleteVideo(videoId: $videoId) {
      ...mutationStatuses
    }
  }
  ${MutationStatusesFragmentDoc}
`;
export type DeleteVideoMutationFn = Apollo.MutationFunction<
  DeleteVideoMutation,
  DeleteVideoMutationVariables
>;

/**
 * __useDeleteVideoMutation__
 *
 * To run a mutation, you first call `useDeleteVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideoMutation, { data, loading, error }] = useDeleteVideoMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useDeleteVideoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteVideoMutation,
    DeleteVideoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteVideoMutation, DeleteVideoMutationVariables>(
    DeleteVideoDocument,
    options
  );
}
export type DeleteVideoMutationHookResult = ReturnType<
  typeof useDeleteVideoMutation
>;
export type DeleteVideoMutationResult =
  Apollo.MutationResult<DeleteVideoMutation>;
export type DeleteVideoMutationOptions = Apollo.BaseMutationOptions<
  DeleteVideoMutation,
  DeleteVideoMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
  Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($loginInput: LoginInput, $socialLogin: SocialLogin) {
    login(loginInput: $loginInput, socialLogin: $socialLogin) {
      ...mutationStatuses
      token
      errors {
        ...fieldError
      }
    }
  }
  ${MutationStatusesFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *      socialLogin: // value for 'socialLogin'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const OnNotifyDocument = gql`
  mutation OnNotify($chanelId: ID!, $action: Action!) {
    onNotification(chanelId: $chanelId, action: $action) {
      ...mutationStatuses
    }
  }
  ${MutationStatusesFragmentDoc}
`;
export type OnNotifyMutationFn = Apollo.MutationFunction<
  OnNotifyMutation,
  OnNotifyMutationVariables
>;

/**
 * __useOnNotifyMutation__
 *
 * To run a mutation, you first call `useOnNotifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOnNotifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [onNotifyMutation, { data, loading, error }] = useOnNotifyMutation({
 *   variables: {
 *      chanelId: // value for 'chanelId'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useOnNotifyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    OnNotifyMutation,
    OnNotifyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<OnNotifyMutation, OnNotifyMutationVariables>(
    OnNotifyDocument,
    options
  );
}
export type OnNotifyMutationHookResult = ReturnType<typeof useOnNotifyMutation>;
export type OnNotifyMutationResult = Apollo.MutationResult<OnNotifyMutation>;
export type OnNotifyMutationOptions = Apollo.BaseMutationOptions<
  OnNotifyMutation,
  OnNotifyMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken {
      ...mutationStatuses
      token
      errors {
        ...fieldError
      }
    }
  }
  ${MutationStatusesFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const SignupDocument = gql`
  mutation Signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      ...mutationStatuses
      token
      errors {
        ...fieldError
      }
    }
  }
  ${MutationStatusesFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signupInput: // value for 'signupInput'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const SubscribeDocument = gql`
  mutation Subscribe($chanelId: ID!, $action: Action!) {
    subscribe(chanelId: $chanelId, action: $action) {
      ...mutationStatuses
    }
  }
  ${MutationStatusesFragmentDoc}
`;
export type SubscribeMutationFn = Apollo.MutationFunction<
  SubscribeMutation,
  SubscribeMutationVariables
>;

/**
 * __useSubscribeMutation__
 *
 * To run a mutation, you first call `useSubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeMutation, { data, loading, error }] = useSubscribeMutation({
 *   variables: {
 *      chanelId: // value for 'chanelId'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useSubscribeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubscribeMutation,
    SubscribeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SubscribeMutation, SubscribeMutationVariables>(
    SubscribeDocument,
    options
  );
}
export type SubscribeMutationHookResult = ReturnType<
  typeof useSubscribeMutation
>;
export type SubscribeMutationResult = Apollo.MutationResult<SubscribeMutation>;
export type SubscribeMutationOptions = Apollo.BaseMutationOptions<
  SubscribeMutation,
  SubscribeMutationVariables
>;
export const UpdateCommentDocument = gql`
  mutation UpdateComment(
    $updateCommentInput: UpdateCommentInput!
    $commentId: ID!
  ) {
    updateComment(
      updateCommentInput: $updateCommentInput
      commentId: $commentId
    ) {
      ...mutationStatuses
    }
  }
  ${MutationStatusesFragmentDoc}
`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      updateCommentInput: // value for 'updateCommentInput'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useUpdateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >(UpdateCommentDocument, options);
}
export type UpdateCommentMutationHookResult = ReturnType<
  typeof useUpdateCommentMutation
>;
export type UpdateCommentMutationResult =
  Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>;
export const UpdateUserInfoDocument = gql`
  mutation UpdateUserInfo($updateInput: UpdateUserInfoInput!) {
    updateInfo(updateInput: $updateInput) {
      ...mutationStatuses
    }
  }
  ${MutationStatusesFragmentDoc}
`;
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<
  UpdateUserInfoMutation,
  UpdateUserInfoMutationVariables
>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserInfoMutation,
    UpdateUserInfoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUserInfoMutation,
    UpdateUserInfoMutationVariables
  >(UpdateUserInfoDocument, options);
}
export type UpdateUserInfoMutationHookResult = ReturnType<
  typeof useUpdateUserInfoMutation
>;
export type UpdateUserInfoMutationResult =
  Apollo.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserInfoMutation,
  UpdateUserInfoMutationVariables
>;
export const UpdateVideoDocument = gql`
  mutation UpdateVideo($updateVideoInput: UpdateVideoInput!, $videoId: ID!) {
    updateVideo(updateVideoInput: $updateVideoInput, videoId: $videoId) {
      ...mutationStatuses
    }
  }
  ${MutationStatusesFragmentDoc}
`;
export type UpdateVideoMutationFn = Apollo.MutationFunction<
  UpdateVideoMutation,
  UpdateVideoMutationVariables
>;

/**
 * __useUpdateVideoMutation__
 *
 * To run a mutation, you first call `useUpdateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoMutation, { data, loading, error }] = useUpdateVideoMutation({
 *   variables: {
 *      updateVideoInput: // value for 'updateVideoInput'
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useUpdateVideoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateVideoMutation,
    UpdateVideoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateVideoMutation, UpdateVideoMutationVariables>(
    UpdateVideoDocument,
    options
  );
}
export type UpdateVideoMutationHookResult = ReturnType<
  typeof useUpdateVideoMutation
>;
export type UpdateVideoMutationResult =
  Apollo.MutationResult<UpdateVideoMutation>;
export type UpdateVideoMutationOptions = Apollo.BaseMutationOptions<
  UpdateVideoMutation,
  UpdateVideoMutationVariables
>;
export const VoteCommentDocument = gql`
  mutation VoteComment(
    $action: Action!
    $type: VoteType!
    $voteCommentCommentId2: ID!
  ) {
    voteComment(
      action: $action
      type: $type
      commentId: $voteCommentCommentId2
    ) {
      ...mutationStatuses
      errors {
        ...fieldError
      }
    }
  }
  ${MutationStatusesFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export type VoteCommentMutationFn = Apollo.MutationFunction<
  VoteCommentMutation,
  VoteCommentMutationVariables
>;

/**
 * __useVoteCommentMutation__
 *
 * To run a mutation, you first call `useVoteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteCommentMutation, { data, loading, error }] = useVoteCommentMutation({
 *   variables: {
 *      action: // value for 'action'
 *      type: // value for 'type'
 *      voteCommentCommentId2: // value for 'voteCommentCommentId2'
 *   },
 * });
 */
export function useVoteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VoteCommentMutation,
    VoteCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VoteCommentMutation, VoteCommentMutationVariables>(
    VoteCommentDocument,
    options
  );
}
export type VoteCommentMutationHookResult = ReturnType<
  typeof useVoteCommentMutation
>;
export type VoteCommentMutationResult =
  Apollo.MutationResult<VoteCommentMutation>;
export type VoteCommentMutationOptions = Apollo.BaseMutationOptions<
  VoteCommentMutation,
  VoteCommentMutationVariables
>;
export const VoteVideoDocument = gql`
  mutation VoteVideo($action: Action!, $type: VoteType!, $videoId: ID!) {
    voteVideo(action: $action, type: $type, videoId: $videoId) {
      ...mutationStatuses
      errors {
        ...fieldError
      }
    }
  }
  ${MutationStatusesFragmentDoc}
  ${FieldErrorFragmentDoc}
`;
export type VoteVideoMutationFn = Apollo.MutationFunction<
  VoteVideoMutation,
  VoteVideoMutationVariables
>;

/**
 * __useVoteVideoMutation__
 *
 * To run a mutation, you first call `useVoteVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteVideoMutation, { data, loading, error }] = useVoteVideoMutation({
 *   variables: {
 *      action: // value for 'action'
 *      type: // value for 'type'
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useVoteVideoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VoteVideoMutation,
    VoteVideoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VoteVideoMutation, VoteVideoMutationVariables>(
    VoteVideoDocument,
    options
  );
}
export type VoteVideoMutationHookResult = ReturnType<
  typeof useVoteVideoMutation
>;
export type VoteVideoMutationResult = Apollo.MutationResult<VoteVideoMutation>;
export type VoteVideoMutationOptions = Apollo.BaseMutationOptions<
  VoteVideoMutation,
  VoteVideoMutationVariables
>;
export const CommentDocument = gql`
  query Comment($id: String!) {
    comment(id: $id) {
      ...commentInfo
      numUsersLiked
      voteStatus
      user {
        id
        firstName
        lastName
        image_url
      }
    }
  }
  ${CommentInfoFragmentDoc}
`;

/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommentQuery(
  baseOptions: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CommentQuery, CommentQueryVariables>(
    CommentDocument,
    options
  );
}
export function useCommentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(
    CommentDocument,
    options
  );
}
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = Apollo.QueryResult<
  CommentQuery,
  CommentQueryVariables
>;
export const CommentsDocument = gql`
  query Comments($getCmtInput: GetCommentInput!) {
    comments(getCmtInput: $getCmtInput) {
      totalCount
      cursor
      hasMore
      paginatedComments {
        id
      }
    }
  }
`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      getCmtInput: // value for 'getCmtInput'
 *   },
 * });
 */
export function useCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    options
  );
}
export function useCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommentsQuery,
    CommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    options
  );
}
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<
  typeof useCommentsLazyQuery
>;
export type CommentsQueryResult = Apollo.QueryResult<
  CommentsQuery,
  CommentsQueryVariables
>;
export const FindDocument = gql`
  query Find($query: String!, $limit: Int!, $cursor: String) {
    find(query: $query, limit: $limit, cursor: $cursor) {
      totalCount
      cursor
      hasMore
      paginatedVideos {
        ...videoInfo
        user {
          id
          firstName
          lastName
          fullName
          image_url
          role
        }
      }
    }
  }
  ${VideoInfoFragmentDoc}
`;

/**
 * __useFindQuery__
 *
 * To run a query within a React component, call `useFindQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFindQuery(
  baseOptions: Apollo.QueryHookOptions<FindQuery, FindQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindQuery, FindQueryVariables>(FindDocument, options);
}
export function useFindLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindQuery, FindQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindQuery, FindQueryVariables>(
    FindDocument,
    options
  );
}
export type FindQueryHookResult = ReturnType<typeof useFindQuery>;
export type FindLazyQueryHookResult = ReturnType<typeof useFindLazyQuery>;
export type FindQueryResult = Apollo.QueryResult<FindQuery, FindQueryVariables>;
export const MeDocument = gql`
  query Me {
    me {
      ...userInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NotificationDocument = gql`
  query Notification($id: ID!) {
    notification(id: $id) {
      ...notificationInfo
    }
  }
  ${NotificationInfoFragmentDoc}
`;

/**
 * __useNotificationQuery__
 *
 * To run a query within a React component, call `useNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNotificationQuery(
  baseOptions: Apollo.QueryHookOptions<
    NotificationQuery,
    NotificationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NotificationQuery, NotificationQueryVariables>(
    NotificationDocument,
    options
  );
}
export function useNotificationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NotificationQuery,
    NotificationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NotificationQuery, NotificationQueryVariables>(
    NotificationDocument,
    options
  );
}
export type NotificationQueryHookResult = ReturnType<
  typeof useNotificationQuery
>;
export type NotificationLazyQueryHookResult = ReturnType<
  typeof useNotificationLazyQuery
>;
export type NotificationQueryResult = Apollo.QueryResult<
  NotificationQuery,
  NotificationQueryVariables
>;
export const NotificationsDocument = gql`
  query Notifications($limit: Int!, $cursor: Int) {
    notifications(limit: $limit, cursor: $cursor) {
      totalCount
      cursor
      hasMore
      paginatedNotification {
        ...notificationInfo
      }
    }
  }
  ${NotificationInfoFragmentDoc}
`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useNotificationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    NotificationsQuery,
    NotificationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(
    NotificationsDocument,
    options
  );
}
export function useNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NotificationsQuery,
    NotificationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(
    NotificationsDocument,
    options
  );
}
export type NotificationsQueryHookResult = ReturnType<
  typeof useNotificationsQuery
>;
export type NotificationsLazyQueryHookResult = ReturnType<
  typeof useNotificationsLazyQuery
>;
export type NotificationsQueryResult = Apollo.QueryResult<
  NotificationsQuery,
  NotificationsQueryVariables
>;
export const UserDocument = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      ...userInfo
      numVideo
      subscribeStatus {
        status
        notification
      }
    }
  }
  ${UserInfoFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserVideosDocument = gql`
  query UserVideos($limit: Int!, $userId: ID!, $cursor: String) {
    videoUser(limit: $limit, userId: $userId, cursor: $cursor) {
      totalCount
      cursor
      hasMore
      paginatedVideos {
        ...videoInfo
        user {
          fullName
        }
      }
    }
  }
  ${VideoInfoFragmentDoc}
`;

/**
 * __useUserVideosQuery__
 *
 * To run a query within a React component, call `useUserVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserVideosQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      userId: // value for 'userId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUserVideosQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserVideosQuery,
    UserVideosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserVideosQuery, UserVideosQueryVariables>(
    UserVideosDocument,
    options
  );
}
export function useUserVideosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserVideosQuery,
    UserVideosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserVideosQuery, UserVideosQueryVariables>(
    UserVideosDocument,
    options
  );
}
export type UserVideosQueryHookResult = ReturnType<typeof useUserVideosQuery>;
export type UserVideosLazyQueryHookResult = ReturnType<
  typeof useUserVideosLazyQuery
>;
export type UserVideosQueryResult = Apollo.QueryResult<
  UserVideosQuery,
  UserVideosQueryVariables
>;
export const VideoDocument = gql`
  query Video($id: ID!) {
    video(id: $id) {
      ...videoInfo
      commentable
      numUsersLiked
      voteStatus
      user {
        id
        firstName
        lastName
        fullName
        image_url
        numSubscribers
        subscribeStatus {
          status
          notification
        }
        role
      }
    }
  }
  ${VideoInfoFragmentDoc}
`;

/**
 * __useVideoQuery__
 *
 * To run a query within a React component, call `useVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVideoQuery(
  baseOptions: Apollo.QueryHookOptions<VideoQuery, VideoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VideoQuery, VideoQueryVariables>(
    VideoDocument,
    options
  );
}
export function useVideoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VideoQuery, VideoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VideoQuery, VideoQueryVariables>(
    VideoDocument,
    options
  );
}
export type VideoQueryHookResult = ReturnType<typeof useVideoQuery>;
export type VideoLazyQueryHookResult = ReturnType<typeof useVideoLazyQuery>;
export type VideoQueryResult = Apollo.QueryResult<
  VideoQuery,
  VideoQueryVariables
>;
export const VideoConcernDocument = gql`
  query VideoConcern($videoId: ID!, $limit: Int!, $cursor: String) {
    videoConcern(videoId: $videoId, limit: $limit, cursor: $cursor) {
      totalCount
      hasMore
      cursor
      paginatedVideos {
        ...videoInfo
        user {
          id
          firstName
          lastName
          fullName
          image_url
          role
        }
      }
    }
  }
  ${VideoInfoFragmentDoc}
`;

/**
 * __useVideoConcernQuery__
 *
 * To run a query within a React component, call `useVideoConcernQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoConcernQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoConcernQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useVideoConcernQuery(
  baseOptions: Apollo.QueryHookOptions<
    VideoConcernQuery,
    VideoConcernQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VideoConcernQuery, VideoConcernQueryVariables>(
    VideoConcernDocument,
    options
  );
}
export function useVideoConcernLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VideoConcernQuery,
    VideoConcernQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VideoConcernQuery, VideoConcernQueryVariables>(
    VideoConcernDocument,
    options
  );
}
export type VideoConcernQueryHookResult = ReturnType<
  typeof useVideoConcernQuery
>;
export type VideoConcernLazyQueryHookResult = ReturnType<
  typeof useVideoConcernLazyQuery
>;
export type VideoConcernQueryResult = Apollo.QueryResult<
  VideoConcernQuery,
  VideoConcernQueryVariables
>;
export const VideosDocument = gql`
  query Videos($limit: Int!, $cursor: String) {
    videos(limit: $limit, cursor: $cursor) {
      totalCount
      cursor
      hasMore
      paginatedVideos {
        ...videoInfo
        user {
          id
          firstName
          lastName
          fullName
          image_url
          role
        }
      }
    }
  }
  ${VideoInfoFragmentDoc}
`;

/**
 * __useVideosQuery__
 *
 * To run a query within a React component, call `useVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideosQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useVideosQuery(
  baseOptions: Apollo.QueryHookOptions<VideosQuery, VideosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VideosQuery, VideosQueryVariables>(
    VideosDocument,
    options
  );
}
export function useVideosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VideosQuery, VideosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VideosQuery, VideosQueryVariables>(
    VideosDocument,
    options
  );
}
export type VideosQueryHookResult = ReturnType<typeof useVideosQuery>;
export type VideosLazyQueryHookResult = ReturnType<typeof useVideosLazyQuery>;
export type VideosQueryResult = Apollo.QueryResult<
  VideosQuery,
  VideosQueryVariables
>;
